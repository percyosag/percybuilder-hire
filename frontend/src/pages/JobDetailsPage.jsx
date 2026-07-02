import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetJobByIdQuery } from "../api/jobsApi";
import { useApplyToJobMutation } from "../api/jobApplicationApi";
import { useSaveJobMutation } from "../api/savedJobApi";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";

function JobDetailsPage() {
  const { id } = useParams();
  const [coverLetter, setCoverLetter] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const roles = user?.roles || [];
  const isCandidate = roles.includes("ROLE_CANDIDATE");

  const {
    data: job,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetJobByIdQuery(id);

  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();
  const [saveJob, { isLoading: isSavingJob }] = useSaveJobMutation();

  const handleSaveJob = async () => {
    setSuccessMessage("");
    setActionError("");

    try {
      await saveJob(id).unwrap();
      setSuccessMessage("Job saved successfully.");
    } catch (apiError) {
      setActionError(apiError?.data?.message || "Could not save this job.");
    }
  };

  const handleApplyToJob = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setActionError("");

    try {
      await applyToJob({
        jobId: Number(id),
        coverLetter: coverLetter.trim(),
      }).unwrap();

      setCoverLetter("");
      setSuccessMessage("Application submitted successfully.");
      refetch();
    } catch (apiError) {
      setActionError(
        apiError?.data?.message || "Could not submit your application.",
      );
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12">
        <LoadingState message="Loading job details..." />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link
          to="/jobs"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to jobs
        </Link>

        <div className="mt-6">
          <ErrorState
            title="Job not found"
            message="We could not load this job. It may not exist anymore."
            error={error}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Link
        to="/jobs"
        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to jobs
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              {job.companyName}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {job.title}
            </h1>

            <p className="mt-3 text-slate-600">
              {job.location} • {job.workType} • {job.jobType}
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {job.status}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {job.category && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              {job.category}
            </span>
          )}

          {job.experienceLevel && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              {job.experienceLevel}
            </span>
          )}

          {job.remote && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              Remote
            </span>
          )}

          {job.featured && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              Featured
            </span>
          )}

          {job.urgent && (
            <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
              Urgent
            </span>
          )}
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Salary
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              {job.salaryMin && job.salaryMax
                ? `${job.salaryCurrency || ""} ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} / ${job.salaryPeriod || ""}`
                : "Salary not listed"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Application deadline
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              {job.applicationDeadline || "Not specified"}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-950">
              Job description
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {job.description || "No description provided."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-950">Requirements</h2>
            <p className="mt-3 leading-7 text-slate-600">
              {job.requirements || "No requirements provided."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-950">Benefits</h2>
            <p className="mt-3 leading-7 text-slate-600">
              {job.benefits || "No benefits provided."}
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6">
          {!isAuthenticated && (
            <div className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-950">
                Interested in this job?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Login as a candidate to save this job or submit an application.
              </p>
              <Link
                to="/login"
                className="mt-4 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Login to apply
              </Link>
            </div>
          )}

          {isAuthenticated && !isCandidate && (
            <div className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">
              Job applications and saved jobs are available for candidate
              accounts only.
            </div>
          )}

          {isAuthenticated && isCandidate && (
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSaveJob}
                  disabled={isSavingJob}
                  className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingJob ? "Saving..." : "Save job"}
                </button>
              </div>
              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-700">
                Complete your candidate profile and upload your resume before
                applying.
              </div>

              <form onSubmit={handleApplyToJob} className="mt-6">
                <label
                  htmlFor="coverLetter"
                  className="text-sm font-semibold text-slate-700"
                >
                  Cover letter
                </label>

                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(event) => setCoverLetter(event.target.value)}
                  rows={5}
                  maxLength={2000}
                  placeholder="Write a short message explaining why you are interested in this role."
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  disabled={isApplying || job.status !== "OPEN"}
                  className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isApplying ? "Submitting..." : "Apply now"}
                </button>

                {job.status !== "OPEN" && (
                  <p className="mt-3 text-sm font-medium text-red-600">
                    This job is not open for applications.
                  </p>
                )}
              </form>

              {successMessage && (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
                  {successMessage}
                </div>
              )}

              {actionError && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                  {actionError}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default JobDetailsPage;

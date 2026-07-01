import { Link } from "react-router-dom";
import {
  useGetMySavedJobsQuery,
  useRemoveSavedJobMutation,
} from "../api/savedJobApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function CandidateSavedJobsPage() {
  const {
    data: savedJobs = [],
    isLoading,
    isError,
    error,
  } = useGetMySavedJobsQuery();

  const [removeSavedJob, { isLoading: isRemoving }] =
    useRemoveSavedJobMutation();

  const handleRemove = async (jobId) => {
    try {
      await removeSavedJob(jobId).unwrap();
    } catch (apiError) {
      console.error("Could not remove saved job", apiError);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading saved jobs..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load saved jobs"
        message={error?.data?.message || "Please try again later."}
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Candidate dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">Saved Jobs</h1>

        <p className="mt-2 text-slate-600">
          Keep track of jobs you are interested in and return to them later.
        </p>

        {savedJobs.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-600">
            You have not saved any jobs yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {savedJobs.map((job) => (
              <article
                key={job.jobId}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">
                      {job.title}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {job.companyName} • {job.location}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {job.workType}
                      </span>

                      <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                        {job.jobType}
                      </span>

                      {job.remote && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                          Remote
                        </span>
                      )}

                      {job.featured && (
                        <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                          Featured
                        </span>
                      )}

                      {job.urgent && (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                          Urgent
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                      {job.salaryMin && job.salaryMax
                        ? `${job.salaryCurrency || ""} ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`
                        : "Salary not listed"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/jobs/${job.jobId}`}
                      className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      View job
                    </Link>

                    <button
                      type="button"
                      disabled={isRemoving}
                      onClick={() => handleRemove(job.jobId)}
                      className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isRemoving ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CandidateSavedJobsPage;

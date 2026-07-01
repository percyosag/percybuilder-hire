import { Link } from "react-router-dom";
import {
  useGetMyCompanyJobsQuery,
  useUpdateEmployerJobStatusMutation,
} from "../api/employerJobApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function EmployerDashboardPage() {
  const {
    data: jobs = [],
    isLoading,
    isError,
    error,
  } = useGetMyCompanyJobsQuery();

  const [updateEmployerJobStatus, { isLoading: isUpdatingStatus }] =
    useUpdateEmployerJobStatusMutation();

  const handleStatusChange = async (jobId, status) => {
    try {
      await updateEmployerJobStatus({ jobId, status }).unwrap();
    } catch (apiError) {
      console.error("Could not update job status", apiError);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading employer dashboard..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load employer jobs"
        message={error?.data?.message || "Please try again later."}
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Employer dashboard
            </p>

            <h1 className="mt-3 text-3xl font-bold text-slate-950">
              Manage Company Jobs
            </h1>

            <p className="mt-2 text-slate-600">
              View jobs posted by your company and update their status.
            </p>
          </div>

          <Link
            to="/employer/jobs/new"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Post a job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-600">
            Your company has not posted any jobs yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">
                      {job.title}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {job.location} • {job.workType} • {job.jobType}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {job.status}
                      </span>

                      <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                        Applications: {job.applicationsCount || 0}
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

                    <p className="mt-4 text-sm text-slate-600">
                      Posted: {job.postedDate || "Not listed"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                    >
                      View public page
                    </Link>

                    {job.status !== "OPEN" && (
                      <button
                        type="button"
                        disabled={isUpdatingStatus}
                        onClick={() => handleStatusChange(job.id, "OPEN")}
                        className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Open
                      </button>
                    )}

                    {job.status !== "CLOSED" && (
                      <button
                        type="button"
                        disabled={isUpdatingStatus}
                        onClick={() => handleStatusChange(job.id, "CLOSED")}
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Close
                      </button>
                    )}
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

export default EmployerDashboardPage;

import { Link } from "react-router-dom";
import {
  useGetEmployerApplicationsQuery,
  useUpdateEmployerApplicationStatusMutation,
} from "../api/employerApplicationApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

const employerStatuses = ["REVIEWED", "SHORTLISTED", "REJECTED"];

function EmployerApplicationsPage() {
  const {
    data: applications = [],
    isLoading,
    isError,
    error,
  } = useGetEmployerApplicationsQuery();

  const [updateEmployerApplicationStatus, { isLoading: isUpdating }] =
    useUpdateEmployerApplicationStatusMutation();

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateEmployerApplicationStatus({
        applicationId,
        status,
      }).unwrap();
    } catch (apiError) {
      console.error("Could not update application status", apiError);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading candidate applications..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load applications"
        message={error?.data?.message || "Please try again later."}
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/employer/dashboard"
        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to employer dashboard
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Employer dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Candidate Applications
        </h1>

        <p className="mt-2 text-slate-600">
          Review applications submitted for jobs posted by your assigned
          company.
        </p>

        {applications.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-600">
            No applications have been submitted for your company jobs yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {applications.map((application) => (
              <article
                key={application.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-950">
                        {application.candidateName}
                      </h2>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {application.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium text-slate-600">
                      {application.candidateEmail}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-slate-800">
                      Applied for: {application.jobTitle}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {application.companyName} • {application.jobLocation}
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      Applied date: {application.appliedDate}
                    </p>

                    {application.coverLetter && (
                      <div className="mt-5 rounded-2xl bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Cover letter
                        </p>

                        <p className="mt-3 leading-7 text-slate-700">
                          {application.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 md:justify-end">
                    {employerStatuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={isUpdating || application.status === status}
                        onClick={() =>
                          handleStatusUpdate(application.id, status)
                        }
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {status}
                      </button>
                    ))}
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

export default EmployerApplicationsPage;

import {
  useGetMyApplicationsQuery,
  useWithdrawApplicationMutation,
} from "../api/jobApplicationApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import DashboardSubnav from "../components/ui/DashboardSubnav";

const candidateDashboardLinks = [
  { label: "Candidate Profile", path: "/candidate/profile" },
  { label: "Applications", path: "/candidate/applications" },
  { label: "Saved Jobs", path: "/candidate/saved-jobs" },
];

function CandidateApplicationsPage() {
  const {
    data: applications = [],
    isLoading,
    isError,
    error,
  } = useGetMyApplicationsQuery();

  const [withdrawApplication, { isLoading: isWithdrawing }] =
    useWithdrawApplicationMutation();

  const handleWithdraw = async (jobId) => {
    try {
      await withdrawApplication(jobId).unwrap();
    } catch (apiError) {
      console.error("Could not withdraw application", apiError);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading your applications..." />;
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
      <DashboardSubnav links={candidateDashboardLinks} />
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Candidate dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          My Applications
        </h1>

        <p className="mt-2 text-slate-600">
          Track the jobs you have applied to and withdraw applications when
          needed.
        </p>

        {applications.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-600">
            You have not applied to any jobs yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {applications.map((application) => (
              <article
                key={application.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">
                      {application.jobTitle}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {application.companyName} • {application.jobLocation}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {application.status}
                      </span>

                      <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                        Applied: {application.appliedDate}
                      </span>
                    </div>

                    {application.coverLetter && (
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {application.coverLetter}
                      </p>
                    )}
                  </div>

                  {application.status !== "WITHDRAWN" && (
                    <button
                      type="button"
                      disabled={isWithdrawing}
                      onClick={() => handleWithdraw(application.jobId)}
                      className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CandidateApplicationsPage;

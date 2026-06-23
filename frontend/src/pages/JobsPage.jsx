import { useGetJobsQuery } from "../api/jobsApi";
import JobCard from "../components/jobs/JobCard";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";

function JobsPage() {
  const { data: jobs = [], isLoading, isError, error } = useGetJobsQuery();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <LoadingState message="Loading jobs..." />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <ErrorState
          title="Could not load jobs"
          message="Make sure the Spring Boot backend is running."
          error={error}
        />
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Open roles
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">Jobs</h1>

        <p className="mt-2 text-slate-600">
          Browse open roles from growing companies.
        </p>
      </div>
      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs available"
          message="Check back later for new opportunities."
        />
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}

export default JobsPage;

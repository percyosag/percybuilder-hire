import { useGetJobsQuery } from "../api/jobsApi";
import JobCard from "../components/jobs/JobCard";

function JobsPage() {
  const { data: jobs = [], isLoading, isError, error } = useGetJobsQuery();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-slate-600">Loading jobs...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-950">Jobs</h1>

        <p className="mt-3 text-red-600">
          Could not load jobs. Make sure the Spring Boot backend is running.
        </p>

        <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-white">
          {JSON.stringify(error, null, 2)}
        </pre>
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
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-950">
            No jobs available
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Check back later for new opportunities.
          </p>
        </div>
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

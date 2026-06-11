import { useGetJobsQuery } from "../api/jobsApi";

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

      <div className="grid gap-4">
        {jobs.map((job) => (
          <article
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  {job.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {job.companyName} • {job.location}
                </p>
              </div>

              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {job.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                {job.workType}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                {job.jobType}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                {job.experienceLevel}
              </span>
            </div>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
              {job.description}
            </p>

            <p className="mt-4 text-sm font-semibold text-slate-950">
              {job.salaryCurrency} {job.salaryMin?.toLocaleString()} -{" "}
              {job.salaryMax?.toLocaleString()} / {job.salaryPeriod}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default JobsPage;

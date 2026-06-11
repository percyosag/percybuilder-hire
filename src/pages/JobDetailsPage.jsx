import { Link, useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../api/jobsApi";

function JobDetailsPage() {
  const { id } = useParams();
  const { data: job, isLoading, isError, error } = useGetJobByIdQuery(id);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-slate-600">Loading job details...</p>
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

        <h1 className="mt-6 text-3xl font-bold text-slate-950">
          Job not found
        </h1>

        <p className="mt-3 text-red-600">
          We could not load this job. It may not exist anymore.
        </p>

        <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-white">
          {JSON.stringify(error, null, 2)}
        </pre>
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
              {job.salaryCurrency} {job.salaryMin?.toLocaleString()} -{" "}
              {job.salaryMax?.toLocaleString()} / {job.salaryPeriod}
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
          <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Apply later
          </button>

          <p className="mt-3 text-sm text-slate-500">
            Application flow will be added after authentication is implemented.
          </p>
        </div>
      </div>
    </section>
  );
}

export default JobDetailsPage;

function JobCard({ job }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{job.title}</h2>

          <p className="mt-1 text-sm text-slate-600">
            {job.companyName} • {job.location}
          </p>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {job.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {job.workType && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {job.workType}
          </span>
        )}

        {job.jobType && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {job.jobType}
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

      {job.description && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
          {job.description}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-950">
          {job.salaryCurrency} {job.salaryMin?.toLocaleString()} -{" "}
          {job.salaryMax?.toLocaleString()} / {job.salaryPeriod}
        </p>

        <button className="w-fit rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          View Details
        </button>
      </div>
    </article>
  );
}

export default JobCard;

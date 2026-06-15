import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">
            {company.name}
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            {company.industry} • {company.location}
          </p>
        </div>

        {company.rating && (
          <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            ★ {company.rating}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {company.companySize && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {company.companySize}
          </span>
        )}

        {company.foundedYear && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            Founded {company.foundedYear}
          </span>
        )}

        {company.jobs && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
            {company.jobs.length} open role
            {company.jobs.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {company.description && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
          {company.description}
        </p>
      )}

      <div className="mt-5 border-t border-slate-100 pt-4">
        <Link
          to={`/companies/${company.id}`}
          className="inline-flex rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          View Company
        </Link>
      </div>
    </article>
  );
}

export default CompanyCard;

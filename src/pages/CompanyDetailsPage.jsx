import { Link, useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../api/companiesApi";
import JobCard from "../components/jobs/JobCard";

function CompanyDetailsPage() {
  const { id } = useParams();
  const {
    data: company,
    isLoading,
    isError,
    error,
  } = useGetCompanyByIdQuery(id);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-slate-600">Loading company details...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to="/companies"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to companies
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-slate-950">
          Company not found
        </h1>

        <p className="mt-3 text-red-600">
          We could not load this company. It may not exist anymore.
        </p>

        <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-white">
          {JSON.stringify(error, null, 2)}
        </pre>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/companies"
        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to companies
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              {company.industry}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {company.name}
            </h1>

            <p className="mt-3 text-slate-600">
              {company.location} • {company.companySize}
            </p>
          </div>

          {company.rating && (
            <span className="w-fit rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              ★ {company.rating}
            </span>
          )}
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Founded
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              {company.foundedYear || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Open roles
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              {company.jobs?.length || 0}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Website
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              {company.website || "N/A"}
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-950">About company</h2>
          <p className="mt-3 leading-7 text-slate-600">
            {company.description || "No description provided."}
          </p>
        </section>
      </div>

      <div className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-950">
            Open roles at {company.name}
          </h2>
          <p className="mt-2 text-slate-600">
            Jobs currently connected to this company.
          </p>
        </div>

        {company.jobs?.length > 0 ? (
          <div className="grid gap-4">
            {company.jobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  ...job,
                  companyName: company.name,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-950">
              No open roles yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              This company does not have open roles right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CompanyDetailsPage;

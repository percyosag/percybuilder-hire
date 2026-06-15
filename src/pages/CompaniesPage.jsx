import { useGetCompaniesQuery } from "../api/companiesApi";
import CompanyCard from "../components/companies/CompanyCard";

function CompaniesPage() {
  const {
    data: companies = [],
    isLoading,
    isError,
    error,
  } = useGetCompaniesQuery();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-slate-600">Loading companies...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-950">Companies</h1>

        <p className="mt-3 text-red-600">
          Could not load companies. Make sure the Spring Boot backend is
          running.
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
          Hiring companies
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">Companies</h1>

        <p className="mt-2 text-slate-600">
          Explore companies hiring on PercyBuilder Hire.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-950">
            No companies available
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Check back later for hiring companies.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CompaniesPage;

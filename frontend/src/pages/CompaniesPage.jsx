import { useGetCompaniesQuery } from "../api/companiesApi";
import CompanyCard from "../components/companies/CompanyCard";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";

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
        <LoadingState message="Loading companies..." />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <ErrorState
          title="Could not load companies"
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
          Hiring companies
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">Companies</h1>

        <p className="mt-2 text-slate-600">
          Explore companies hiring on PercyBuilder Hire.
        </p>
      </div>

      {companies.length === 0 ? (
        <EmptyState
          title="No companies available"
          message="Check back later for hiring companies."
        />
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

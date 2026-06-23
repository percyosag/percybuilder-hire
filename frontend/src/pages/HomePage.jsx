import { Link } from "react-router-dom";
import { useGetJobsQuery } from "../api/jobsApi";
import { useGetCompaniesQuery } from "../api/companiesApi";
import JobCard from "../components/jobs/JobCard";
import CompanyCard from "../components/companies/CompanyCard";

function HomePage() {
  const { data: jobs = [], isLoading: jobsLoading } = useGetJobsQuery();
  const { data: companies = [], isLoading: companiesLoading } =
    useGetCompaniesQuery();

  const featuredJobs = jobs.slice(0, 3);
  const featuredCompanies = companies.slice(0, 2);

  return (
    <div>
      <section className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            PercyBuilder Hire
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Discover jobs and companies built for your next career move.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            PercyBuilder Hire connects candidates with real opportunities,
            hiring companies, and clear job information in one modern platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/jobs"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Browse Jobs
            </Link>

            <Link
              to="/companies"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              View Companies
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Platform snapshot
          </p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-3xl font-bold text-blue-700">
                {jobsLoading ? "..." : jobs.length}
              </p>
              <p className="mt-1 text-sm font-medium text-blue-900">
                Open roles
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-3xl font-bold text-slate-950">
                {companiesLoading ? "..." : companies.length}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Hiring companies
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-3xl font-bold text-emerald-700">Full-stack</p>
              <p className="mt-1 text-sm font-medium text-emerald-900">
                React, RTK Query, Spring Boot, PostgreSQL
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Featured roles
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Start with these opportunities
            </h2>
          </div>

          <Link
            to="/jobs"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all jobs →
          </Link>
        </div>

        {jobsLoading ? (
          <p className="text-slate-600">Loading jobs...</p>
        ) : featuredJobs.length > 0 ? (
          <div className="grid gap-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-950">
              No jobs available yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Check back later for new opportunities.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Hiring companies
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Explore companies on the platform
            </h2>
          </div>

          <Link
            to="/companies"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all companies →
          </Link>
        </div>

        {companiesLoading ? (
          <p className="text-slate-600">Loading companies...</p>
        ) : featuredCompanies.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {featuredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-950">
              No companies available yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Check back later for hiring companies.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl bg-slate-950 px-6 py-10 text-center text-white shadow-sm">
          <h2 className="text-3xl font-bold">Need help or employer support?</h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Send a message about job applications, company postings, or platform
            feedback.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
          >
            Contact PercyBuilder Hire
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

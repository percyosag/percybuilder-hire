import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
          Access denied
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          You do not have permission to access this page.
        </h1>

        <p className="mt-4 text-slate-600">
          This page is restricted to a specific account role. Please return to
          your account page or continue browsing public job listings.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/account"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go to account
          </Link>

          <Link
            to="/jobs"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UnauthorizedPage;

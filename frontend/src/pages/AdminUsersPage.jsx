import { useState } from "react";
import {
  useAssignCompanyToUserMutation,
  useLazySearchUserByEmailQuery,
  usePromoteUserToEmployerMutation,
} from "../api/adminUserApi";
import { useGetAdminCompaniesQuery } from "../api/adminCompanyApi";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";

function AdminUsersPage() {
  const [foundUser, setFoundUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [searchUserByEmail, { isFetching: isSearching }] =
    useLazySearchUserByEmailQuery();

  const {
    data: companies = [],
    isLoading: isLoadingCompanies,
    isError: isCompaniesError,
    error: companiesError,
  } = useGetAdminCompaniesQuery();

  const [promoteUserToEmployer, { isLoading: isPromoting }] =
    usePromoteUserToEmployerMutation();

  const [assignCompanyToUser, { isLoading: isAssigning }] =
    useAssignCompanyToUserMutation();

  const handleSearch = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setFoundUser(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.trim();

    if (!email) {
      setErrorMessage("Please enter a user email.");
      return;
    }

    try {
      const result = await searchUserByEmail(email).unwrap();
      setFoundUser(result);
    } catch (apiError) {
      setErrorMessage(apiError?.data?.message || "Could not find user.");
    }
  };

  const handlePromote = async () => {
    if (!foundUser) return;

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await promoteUserToEmployer(foundUser.id).unwrap();
      setFoundUser(result);
      setSuccessMessage("User promoted to employer successfully.");
    } catch (apiError) {
      setErrorMessage(
        apiError?.data?.message || "Could not promote user to employer.",
      );
    }
  };

  const handleAssignCompany = async (event) => {
    event.preventDefault();

    if (!foundUser) return;

    setErrorMessage("");
    setSuccessMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const companyId = formData.get("companyId");

    if (!companyId) {
      setErrorMessage("Please select a company.");
      return;
    }

    try {
      const result = await assignCompanyToUser({
        userId: foundUser.id,
        companyId,
      }).unwrap();

      setFoundUser(result);
      setSuccessMessage("Company assigned successfully.");
    } catch (apiError) {
      setErrorMessage(apiError?.data?.message || "Could not assign company.");
    }
  };

  if (isLoadingCompanies) {
    return <LoadingState message="Loading admin user tools..." />;
  }

  if (isCompaniesError) {
    return (
      <ErrorState
        title="Could not load companies"
        message={companiesError?.data?.message || "Please try again later."}
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Admin dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          User & Employer Management
        </h1>

        <p className="mt-2 text-slate-600">
          Search users, promote users to employer accounts, and assign employers
          to companies.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-8 rounded-2xl bg-slate-50 p-6"
        >
          <label className="text-sm font-semibold text-slate-700">
            Search user by email
          </label>

          <div className="mt-2 flex flex-col gap-3 md:flex-row">
            <input
              name="email"
              type="email"
              required
              placeholder="olivia.bennett@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="submit"
              disabled={isSearching}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            {successMessage}
          </div>
        )}

        {foundUser && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  {foundUser.fullName}
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-600">
                  {foundUser.email}
                </p>

                {foundUser.mobileNumber && (
                  <p className="mt-1 text-sm text-slate-500">
                    Phone: {foundUser.mobileNumber}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    {foundUser.role}
                  </span>

                  <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                    {foundUser.enabled ? "Enabled" : "Disabled"}
                  </span>

                  {foundUser.companyName && (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                      Company: {foundUser.companyName}
                    </span>
                  )}
                </div>
              </div>

              {foundUser.role !== "ROLE_EMPLOYER" && (
                <button
                  type="button"
                  disabled={isPromoting}
                  onClick={handlePromote}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isPromoting ? "Promoting..." : "Promote to Employer"}
                </button>
              )}
            </div>

            <form
              onSubmit={handleAssignCompany}
              className="mt-6 rounded-2xl bg-white p-5"
            >
              <label className="text-sm font-semibold text-slate-700">
                Assign company
              </label>

              <div className="mt-2 flex flex-col gap-3 md:flex-row">
                <select
                  name="companyId"
                  defaultValue={foundUser.companyId || ""}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={isAssigning}
                  className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
                >
                  {isAssigning ? "Assigning..." : "Assign"}
                </button>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Usually, assign a company after the user has been promoted to
                employer.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminUsersPage;

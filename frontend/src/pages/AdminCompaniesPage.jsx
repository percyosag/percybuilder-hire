import { useState } from "react";
import {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useGetAdminCompaniesQuery,
  useUpdateCompanyMutation,
} from "../api/adminCompanyApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function AdminCompaniesPage() {
  const {
    data: companies = [],
    isLoading,
    isError,
    error,
  } = useGetAdminCompaniesQuery();

  const [editingCompany, setEditingCompany] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const isSaving = isCreating || isUpdating;

  const buildCompanyData = (formData) => ({
    name: formData.get("name")?.trim(),
    logo: formData.get("logo")?.trim() || null,
    industry: formData.get("industry")?.trim(),
    companySize: formData.get("companySize")?.trim() || null,
    rating: formData.get("rating") ? Number(formData.get("rating")) : null,
    location: formData.get("location")?.trim() || null,
    foundedYear: formData.get("foundedYear")
      ? Number(formData.get("foundedYear"))
      : null,
    description: formData.get("description")?.trim() || null,
    website: formData.get("website")?.trim() || null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const companyData = buildCompanyData(formData);

    try {
      if (editingCompany) {
        await updateCompany({
          companyId: editingCompany.id,
          companyData,
        }).unwrap();
      } else {
        await createCompany(companyData).unwrap();
      }

      form.reset();
      setEditingCompany(null);
    } catch (apiError) {
      setErrorMessage(apiError?.data?.message || "Could not save company.");
    }
  };

  const handleEdit = (company) => {
    setErrorMessage("");
    setEditingCompany(company);
  };

  const handleCancelEdit = () => {
    setErrorMessage("");
    setEditingCompany(null);
  };

  const handleDelete = async (companyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmed) return;

    setErrorMessage("");

    try {
      await deleteCompany(companyId).unwrap();
    } catch (apiError) {
      setErrorMessage(apiError?.data?.message || "Could not delete company.");
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading companies..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load companies"
        message={error?.data?.message || "Please try again later."}
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
          Company Management
        </h1>

        <p className="mt-2 text-slate-600">
          Create, update, and delete companies available on the public company
          directory.
        </p>

        <form
          key={editingCompany?.id || "new-company"}
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-slate-50 p-6"
        >
          <h2 className="text-xl font-bold text-slate-950">
            {editingCompany ? "Edit Company" : "Create Company"}
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Company name
              </label>
              <input
                name="name"
                required
                defaultValue={editingCompany?.name || ""}
                placeholder="TechNova Solutions"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Industry
              </label>
              <input
                name="industry"
                required
                defaultValue={editingCompany?.industry || ""}
                placeholder="Software Development"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Logo URL
              </label>
              <input
                name="logo"
                defaultValue={editingCompany?.logo || ""}
                placeholder="https://example.com/logo.png"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Company size
              </label>
              <input
                name="companySize"
                defaultValue={editingCompany?.companySize || ""}
                placeholder="51-200 employees"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Rating
              </label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={editingCompany?.rating || ""}
                placeholder="4.5"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                name="location"
                defaultValue={editingCompany?.location || ""}
                placeholder="Toronto, ON"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Founded year
              </label>
              <input
                name="foundedYear"
                type="number"
                min="1800"
                defaultValue={editingCompany?.foundedYear || ""}
                placeholder="2018"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Website
              </label>
              <input
                name="website"
                defaultValue={editingCompany?.website || ""}
                placeholder="https://company.com"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              maxLength={1000}
              defaultValue={editingCompany?.description || ""}
              placeholder="Describe the company, its mission, and the type of work it does."
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {errorMessage && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSaving
                ? "Saving..."
                : editingCompany
                  ? "Update company"
                  : "Create company"}
            </button>

            {editingCompany && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-950">All Companies</h2>

          {companies.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-slate-600">
              No companies found.
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {companies.map((company) => (
                <article
                  key={company.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {company.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {company.industry} • {company.location || "No location"}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {company.companySize && (
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                            {company.companySize}
                          </span>
                        )}

                        {company.rating !== null && (
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                            Rating: {company.rating}
                          </span>
                        )}

                        {company.foundedYear && (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                            Founded: {company.foundedYear}
                          </span>
                        )}

                        <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                          Jobs: {company.jobs?.length || 0}
                        </span>
                      </div>

                      {company.description && (
                        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                          {company.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(company)}
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => handleDelete(company.id)}
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminCompaniesPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateEmployerJobMutation } from "../api/employerJobApi";

function EmployerCreateJobPage() {
  const navigate = useNavigate();
  const [createEmployerJob, { isLoading }] = useCreateEmployerJobMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const jobData = {
      title: formData.get("title")?.trim(),
      location: formData.get("location")?.trim(),
      workType: formData.get("workType")?.trim(),
      jobType: formData.get("jobType")?.trim(),
      category: formData.get("category")?.trim() || null,
      experienceLevel: formData.get("experienceLevel")?.trim() || null,
      salaryMin: formData.get("salaryMin")
        ? Number(formData.get("salaryMin"))
        : null,
      salaryMax: formData.get("salaryMax")
        ? Number(formData.get("salaryMax"))
        : null,
      salaryCurrency: formData.get("salaryCurrency")?.trim() || null,
      salaryPeriod: formData.get("salaryPeriod")?.trim() || null,
      description: formData.get("description")?.trim() || null,
      requirements: formData.get("requirements")?.trim() || null,
      benefits: formData.get("benefits")?.trim() || null,
      applicationDeadline: formData.get("applicationDeadline") || null,
      featured: formData.get("featured") === "on",
      urgent: formData.get("urgent") === "on",
      remote: formData.get("remote") === "on",
    };

    try {
      await createEmployerJob(jobData).unwrap();
      navigate("/employer/dashboard");
    } catch (apiError) {
      setErrorMessage(apiError?.data?.message || "Could not create job.");
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Link
        to="/employer/dashboard"
        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to employer dashboard
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Employer dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Post a New Job
        </h1>

        <p className="mt-2 text-slate-600">
          Create a new job posting for your assigned company.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Job title
              </label>
              <input
                name="title"
                required
                placeholder="Backend Developer"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                name="location"
                required
                placeholder="Toronto, ON"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Work type
              </label>
              <select
                name="workType"
                required
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select work type
                </option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Job type
              </label>
              <select
                name="jobType"
                required
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select job type
                </option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Category
              </label>
              <input
                name="category"
                placeholder="Software Development"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Experience level
              </label>
              <select
                name="experienceLevel"
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Not specified</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Junior">Junior</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Salary minimum
              </label>
              <input
                name="salaryMin"
                type="number"
                min="0"
                placeholder="60000"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Salary maximum
              </label>
              <input
                name="salaryMax"
                type="number"
                min="0"
                placeholder="90000"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Salary currency
              </label>
              <input
                name="salaryCurrency"
                placeholder="CAD"
                defaultValue="CAD"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Salary period
              </label>
              <select
                name="salaryPeriod"
                defaultValue="Yearly"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Application deadline
              </label>
              <input
                name="applicationDeadline"
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              maxLength={3000}
              placeholder="Describe the role, responsibilities, and team."
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Requirements
            </label>
            <textarea
              name="requirements"
              rows={5}
              maxLength={3000}
              placeholder="List required skills, experience, and qualifications."
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Benefits
            </label>
            <textarea
              name="benefits"
              rows={4}
              maxLength={2000}
              placeholder="List benefits, perks, growth opportunities, etc."
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-5 rounded-2xl bg-slate-50 p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input name="remote" type="checkbox" />
              Remote
            </label>

            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input name="featured" type="checkbox" />
              Featured
            </label>

            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input name="urgent" type="checkbox" />
              Urgent
            </label>
          </div>

          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isLoading ? "Creating..." : "Create job"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EmployerCreateJobPage;

import { useState } from "react";
import { useCreateContactMutation } from "../api/contactsApi";

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  userType: "CANDIDATE",
};

function ContactPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setValidationErrors({});

    try {
      await createContact(formData).unwrap();

      setFormData(initialFormState);
      setSuccessMessage("Your message was sent successfully.");
    } catch (error) {
      const backendValidationErrors = error?.data?.validationErrors;

      if (backendValidationErrors) {
        setValidationErrors(backendValidationErrors);
        return;
      }

      setValidationErrors({
        general: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Contact us
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Send PercyBuilder Hire a message
        </h1>

        <p className="mt-2 text-slate-600">
          Ask about jobs, companies, applications, or employer support.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {successMessage && (
            <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {successMessage}
            </div>
          )}

          {validationErrors.general && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {validationErrors.general}
            </div>
          )}

          <div className="grid gap-5">
            <div>
              <label
                className="text-sm font-semibold text-slate-800"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Enter your full name"
              />
              {validationErrors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-800"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="you@example.com"
              />
              {validationErrors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-800"
                htmlFor="userType"
              >
                I am a
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="CANDIDATE">Candidate</option>
                <option value="EMPLOYER">Employer</option>
              </select>
              {validationErrors.userType && (
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.userType}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-800"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="What is your message about?"
              />
              {validationErrors.subject && (
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-800"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Write your message..."
              />
              {validationErrors.message && (
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isLoading ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>

        <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <h2 className="text-xl font-bold">Why contact us?</h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            PercyBuilder Hire is designed to help candidates discover roles and
            help employers connect with talent.
          </p>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <p>• Ask about candidate support</p>
            <p>• Request employer posting information</p>
            <p>• Report issues with job or company data</p>
            <p>• Share feedback about the platform</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ContactPage;

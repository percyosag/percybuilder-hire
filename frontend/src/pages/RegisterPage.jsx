import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../api/authApi";

const initialFormState = {
  fullName: "",
  email: "",
  password: "",
  mobileNumber: "",
  role: "ROLE_CANDIDATE",
};

const validateRegisterForm = (formData) => {
  const fullName = formData.fullName.trim();
  const email = formData.email.trim();
  const password = formData.password;
  const mobileNumber = formData.mobileNumber.trim();
  const phoneDigits = mobileNumber.replace(/\D/g, "");

  if (!fullName) {
    return "Full name is required.";
  }

  if (fullName.length < 2) {
    return "Full name must be at least 2 characters.";
  }

  if (!email) {
    return "Email is required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!mobileNumber) {
    return "Mobile number is required.";
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return "Mobile number must contain 10 to 15 digits.";
  }

  if (!["ROLE_CANDIDATE", "ROLE_EMPLOYER"].includes(formData.role)) {
    return "Please select a valid account type.";
  }

  return "";
};

function RegisterPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setFormError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    const validationError = validateRegisterForm(formData);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    const registerPayload = {
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      mobileNumber: formData.mobileNumber.trim(),
    };

    try {
      await register(registerPayload).unwrap();

      setSuccessMessage(
        "Account created successfully. Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setFormError(
        error?.data?.message ||
          "Registration failed. Please check your information.",
      );
    }
  };

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Create account
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Join PercyBuilder Hire
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Register as a candidate or employer to start using the platform.
          </p>
        </div>

        {formError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formError}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="fullName"
            >
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              minLength={2}
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Sarah Candidate"
            />
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
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="sarah@example.com"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="password"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="mobileNumber"
            >
              Mobile number
            </label>

            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="+14375551234"
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="role"
            >
              Account type
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="ROLE_CANDIDATE">Candidate</option>
              <option value="ROLE_EMPLOYER">Employer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;

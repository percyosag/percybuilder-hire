import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApi";
import { setCredentials } from "../features/auth/authSlice";

const initialFormState = {
  username: "",
  password: "",
};

function LoginPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    try {
      const response = await login(formData).unwrap();

      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        }),
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFormError(
        error?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    }
  };

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-6xl items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Welcome back
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Login to PercyBuilder Hire
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Use your registered email and password.
          </p>
        </div>

        {formError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="username"
            >
              Email
            </label>

            <input
              id="username"
              name="username"
              type="email"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="candidate@percybuilderhire.com"
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
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          New to PercyBuilder Hire?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;

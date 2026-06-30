import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetCurrentProfileQuery } from "../api/profileApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function ProfilePage() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetCurrentProfileQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <LoadingState message="Loading your profile..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load profile"
        message={
          error?.data?.message || "Please login again and try one more time."
        }
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          My account
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">Account</h1>

        <p className="mt-2 text-slate-600">
          View your account identity, login email, and assigned role.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-6">
          <div>
            <p className="text-sm font-semibold text-slate-500">Logged in as</p>
            <p className="mt-1 text-lg font-bold text-slate-950">
              {profile?.username || user?.username}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">Roles</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile?.roles || user?.roles || []).map((role) => (
                <span
                  key={role}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;

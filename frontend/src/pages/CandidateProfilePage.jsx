import { useState } from "react";
import {
  useGetCandidateProfileQuery,
  useSaveCandidateProfileMutation,
  useUploadProfilePictureMutation,
  useUploadResumeMutation,
} from "../api/candidateProfileApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function CandidateProfilePage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  const {
    data: candidateProfile,
    isLoading,
    isError,
    error,
  } = useGetCandidateProfileQuery();

  const [saveCandidateProfile, { isLoading: isSaving }] =
    useSaveCandidateProfileMutation();

  const [uploadProfilePicture, { isLoading: isUploadingPicture }] =
    useUploadProfilePictureMutation();

  const [uploadResume, { isLoading: isUploadingResume }] =
    useUploadResumeMutation();

  const isProfileMissing = error?.status === 404;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setFormError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const profileData = {
      jobTitle: formData.get("jobTitle")?.trim(),
      location: formData.get("location")?.trim(),
      experienceLevel: formData.get("experienceLevel")?.trim(),
      professionalBio: formData.get("professionalBio")?.trim(),
      portfolioWebsite: formData.get("portfolioWebsite")?.trim(),
    };

    try {
      await saveCandidateProfile(profileData).unwrap();
      setSuccessMessage("Candidate profile saved successfully.");
    } catch (apiError) {
      setFormError(
        apiError?.data?.message || "Could not save candidate profile.",
      );
    }
  };

  const handlePictureUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSuccessMessage("");
    setFormError("");

    try {
      await uploadProfilePicture(file).unwrap();
      setSuccessMessage("Profile picture uploaded successfully.");
    } catch (apiError) {
      setFormError(
        apiError?.data?.message || "Could not upload profile picture.",
      );
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSuccessMessage("");
    setFormError("");

    try {
      await uploadResume(file).unwrap();
      setSuccessMessage("Resume uploaded successfully.");
    } catch (apiError) {
      setFormError(apiError?.data?.message || "Could not upload resume.");
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading candidate profile..." />;
  }

  if (isError && !isProfileMissing) {
    return (
      <ErrorState
        title="Could not load candidate profile"
        message={error?.data?.message || "Please try again later."}
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Candidate profile
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Build your job seeker profile
          </h1>

          <p className="mt-2 text-slate-600">
            Employers can use this profile to understand your skills,
            experience, and portfolio.
          </p>

          {isProfileMissing && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
              You do not have a candidate profile yet. Fill the form below to
              create one.
            </div>
          )}

          {successMessage && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
              {successMessage}
            </div>
          )}

          {formError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <div>
              <label
                htmlFor="jobTitle"
                className="text-sm font-semibold text-slate-700"
              >
                Job title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                defaultValue={candidateProfile?.jobTitle || ""}
                placeholder="Junior Full-Stack Developer"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="text-sm font-semibold text-slate-700"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={candidateProfile?.location || ""}
                placeholder="Toronto, Ontario"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="text-sm font-semibold text-slate-700"
              >
                Experience level
              </label>
              <input
                id="experienceLevel"
                name="experienceLevel"
                type="text"
                defaultValue={candidateProfile?.experienceLevel || ""}
                placeholder="Entry Level"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="portfolioWebsite"
                className="text-sm font-semibold text-slate-700"
              >
                Portfolio website
              </label>
              <input
                id="portfolioWebsite"
                name="portfolioWebsite"
                type="url"
                defaultValue={candidateProfile?.portfolioWebsite || ""}
                placeholder="https://percybuilder.dev"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="professionalBio"
                className="text-sm font-semibold text-slate-700"
              >
                Professional bio
              </label>
              <textarea
                id="professionalBio"
                name="professionalBio"
                defaultValue={candidateProfile?.professionalBio || ""}
                rows={6}
                placeholder="Write a short summary about your skills, experience, and career goals."
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSaving ? "Saving..." : "Save candidate profile"}
            </button>
          </form>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Profile documents
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Upload a profile picture and resume after saving your candidate
            profile.
          </p>

          <div className="mt-6 grid gap-5">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Profile picture
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {candidateProfile?.hasProfilePicture
                  ? candidateProfile.profilePictureName
                  : "No profile picture uploaded"}
              </p>

              <label className="mt-4 inline-flex cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600">
                {isUploadingPicture ? "Uploading..." : "Upload picture"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureUpload}
                  disabled={isUploadingPicture}
                  className="hidden"
                />
              </label>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">Resume</p>
              <p className="mt-1 text-sm text-slate-700">
                {candidateProfile?.hasResume
                  ? candidateProfile.resumeName
                  : "No resume uploaded"}
              </p>

              <label className="mt-4 inline-flex cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600">
                {isUploadingResume ? "Uploading..." : "Upload resume"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={isUploadingResume}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CandidateProfilePage;

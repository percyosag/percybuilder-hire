import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import HomePage from "../pages/HomePage";
import JobsPage from "../pages/JobsPage";
import CompaniesPage from "../pages/CompaniesPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import CompanyDetailsPage from "../pages/CompanyDetailsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import CandidateRoute from "../components/routes/CandidateRoute";
import CandidateProfilePage from "../pages/CandidateProfilePage";
import CandidateApplicationsPage from "../pages/CandidateApplicationsPage";
import CandidateSavedJobsPage from "../pages/CandidateSavedJobsPage";
import EmployerRoute from "../components/routes/EmployerRoute";
import EmployerDashboardPage from "../pages/EmployerDashboardPage";
import EmployerCreateJobPage from "../pages/EmployerCreateJobPage";
import AdminRoute from "../components/routes/AdminRoute";
import AdminContactsPage from "../pages/AdminContactsPage";
import AdminCompaniesPage from "../pages/AdminCompaniesPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import DashboardRedirectPage from "../pages/DashboardRedirectPage";
import AuthenticatedRoute from "../components/routes/AuthenticatedRoute";
import EmployerApplicationsPage from "../pages/EmployerApplicationsPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/dashboard" element={<DashboardRedirectPage />} />
        <Route element={<AuthenticatedRoute />}>
          <Route path="/account" element={<ProfilePage />} />
        </Route>
        <Route element={<CandidateRoute />}>
          <Route path="/candidate/profile" element={<CandidateProfilePage />} />
          <Route
            path="/candidate/applications"
            element={<CandidateApplicationsPage />}
          />
          <Route
            path="/candidate/saved-jobs"
            element={<CandidateSavedJobsPage />}
          />
        </Route>
        <Route element={<EmployerRoute />}>
          <Route
            path="/employer/dashboard"
            element={<EmployerDashboardPage />}
          />
          <Route
            path="/employer/jobs/new"
            element={<EmployerCreateJobPage />}
          />
          <Route
            path="/employer/applications"
            element={<EmployerApplicationsPage />}
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/contacts" element={<AdminContactsPage />} />
          <Route path="/admin/companies" element={<AdminCompaniesPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

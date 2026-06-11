import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import HomePage from "../pages/HomePage";
import JobsPage from "../pages/JobsPage";
import CompaniesPage from "../pages/CompaniesPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

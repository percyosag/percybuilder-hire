// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import { profileApi } from "../../api/profileApi";
// import { candidateProfileApi } from "../../api/candidateProfileApi";
// import { jobApplicationApi } from "../../api/jobApplicationApi";
// import { savedJobApi } from "../../api/savedJobApi";
// import { employerJobApi } from "../../api/employerJobApi";
// import { adminContactApi } from "../../api/adminContactApi";
// import { adminCompanyApi } from "../../api/adminCompanyApi";
// import { adminUserApi } from "../../api/adminUserApi";

// const navLinks = [
//   { label: "Home", path: "/" },
//   { label: "Jobs", path: "/jobs" },
//   { label: "Companies", path: "/companies" },
//   { label: "Contact", path: "/contact" },
// ];

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const dispatch = useDispatch();

//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   const roles = user?.roles || [];
//   const isCandidate = roles.includes("ROLE_CANDIDATE");
//   const isEmployer = roles.includes("ROLE_EMPLOYER");
//   const isAdmin = roles.includes("ROLE_ADMIN");

//   const handleLogout = () => {
//     dispatch(logout());

//     dispatch(profileApi.util.resetApiState());
//     dispatch(candidateProfileApi.util.resetApiState());
//     dispatch(jobApplicationApi.util.resetApiState());
//     dispatch(savedJobApi.util.resetApiState());
//     dispatch(employerJobApi.util.resetApiState());
//     dispatch(adminContactApi.util.resetApiState());
//     dispatch(adminCompanyApi.util.resetApiState());
//     dispatch(adminUserApi.util.resetApiState());
//     closeMenu();
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
//       <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
//         <NavLink
//           to="/"
//           onClick={closeMenu}
//           className="text-xl font-bold tracking-tight text-slate-950"
//         >
//           PercyBuilder <span className="text-blue-600">Hire</span>
//         </NavLink>

//         <div className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-sm font-semibold text-blue-600"
//                   : "text-sm font-semibold text-slate-700 hover:text-blue-600"
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}

//           {isAuthenticated ? (
//             <div className="flex items-center gap-3">
//               <span className="max-w-[220px] truncate text-sm font-medium text-slate-600">
//                 {user?.username}
//               </span>

//               <NavLink
//                 to="/account"
//                 className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//               >
//                 Account
//               </NavLink>

//               {isCandidate && (
//                 <NavLink
//                   to="/candidate/profile"
//                   className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                 >
//                   Candidate Profile
//                 </NavLink>
//               )}
//               {isCandidate && (
//                 <NavLink
//                   to="/candidate/applications"
//                   className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                 >
//                   Applications
//                 </NavLink>
//               )}
//               {isCandidate && (
//                 <NavLink
//                   to="/candidate/saved-jobs"
//                   className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                 >
//                   Saved Jobs
//                 </NavLink>
//               )}

//               {isEmployer && (
//                 <NavLink
//                   to="/employer/dashboard"
//                   className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                 >
//                   Employer Dashboard
//                 </NavLink>
//               )}
//               {isAdmin && (
//                 <NavLink
//                   to="/admin/contacts"
//                   onClick={closeMenu}
//                   className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                 >
//                   Admin Contacts
//                 </NavLink>
//               )}
//               {isAdmin && (
//                 <NavLink
//                   to="/admin/companies"
//                   className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                 >
//                   Admin Companies
//                 </NavLink>
//               )}
//               {isAdmin && (
//                 <NavLink
//                   to="/admin/users"
//                   className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                 >
//                   Admin Users
//                 </NavLink>
//               )}
//               <button
//                 type="button"
//                 onClick={handleLogout}
//                 className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               <NavLink
//                 to="/login"
//                 className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//               >
//                 Login
//               </NavLink>

//               <NavLink
//                 to="/register"
//                 className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
//               >
//                 Register
//               </NavLink>
//             </div>
//           )}
//         </div>

//         <button
//           type="button"
//           onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
//           className="inline-flex rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 md:hidden"
//           aria-label="Toggle navigation menu"
//           aria-expanded={isMenuOpen}
//         >
//           {isMenuOpen ? "Close" : "Menu"}
//         </button>
//       </nav>

//       {isMenuOpen && (
//         <div className="border-t border-slate-200 bg-white md:hidden">
//           <div className="mx-auto grid max-w-6xl gap-1 px-6 py-4">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 onClick={closeMenu}
//                 className={({ isActive }) =>
//                   `rounded-xl px-4 py-3 text-sm font-semibold transition ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}

//             <div className="mt-4 border-t border-slate-200 pt-4">
//               {isAuthenticated ? (
//                 <div className="grid gap-3">
//                   <p className="truncate px-4 text-sm font-medium text-slate-600">
//                     {user?.username}
//                   </p>

//                   <NavLink
//                     to="/account"
//                     onClick={closeMenu}
//                     className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                   >
//                     Account
//                   </NavLink>

//                   {isCandidate && (
//                     <NavLink
//                       to="/candidate/profile"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                     >
//                       Candidate Profile
//                     </NavLink>
//                   )}
//                   {isCandidate && (
//                     <NavLink
//                       to="/candidate/applications"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                     >
//                       Applications
//                     </NavLink>
//                   )}
//                   {isCandidate && (
//                     <NavLink
//                       to="/candidate/saved-jobs"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                     >
//                       Saved Jobs
//                     </NavLink>
//                   )}
//                   {isEmployer && (
//                     <NavLink
//                       to="/employer/dashboard"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                     >
//                       Employer Dashboard
//                     </NavLink>
//                   )}
//                   {isAdmin && (
//                     <NavLink
//                       to="/admin/contacts"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                     >
//                       Admin Contacts
//                     </NavLink>
//                   )}
//                   {isAdmin && (
//                     <NavLink
//                       to="/admin/companies"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                     >
//                       Admin Companies
//                     </NavLink>
//                   )}
//                   {isAdmin && (
//                     <NavLink
//                       to="/admin/users"
//                       onClick={closeMenu}
//                       className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                     >
//                       Admin Users
//                     </NavLink>
//                   )}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       handleLogout();
//                       closeMenu();
//                     }}
//                     className="rounded-xl border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid gap-3">
//                   <NavLink
//                     to="/login"
//                     onClick={closeMenu}
//                     className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
//                   >
//                     Login
//                   </NavLink>

//                   <NavLink
//                     to="/register"
//                     onClick={closeMenu}
//                     className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
//                   >
//                     Register
//                   </NavLink>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { profileApi } from "../../api/profileApi";
import { candidateProfileApi } from "../../api/candidateProfileApi";
import { jobApplicationApi } from "../../api/jobApplicationApi";
import { savedJobApi } from "../../api/savedJobApi";
import { employerJobApi } from "../../api/employerJobApi";
import { adminContactApi } from "../../api/adminContactApi";
import { adminCompanyApi } from "../../api/adminCompanyApi";
import { adminUserApi } from "../../api/adminUserApi";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Jobs", path: "/jobs" },
  { label: "Companies", path: "/companies" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());

    dispatch(profileApi.util.resetApiState());
    dispatch(candidateProfileApi.util.resetApiState());
    dispatch(jobApplicationApi.util.resetApiState());
    dispatch(savedJobApi.util.resetApiState());
    dispatch(employerJobApi.util.resetApiState());
    dispatch(adminContactApi.util.resetApiState());
    dispatch(adminCompanyApi.util.resetApiState());
    dispatch(adminUserApi.util.resetApiState());

    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-slate-950"
        >
          PercyBuilder <span className="text-blue-600">Hire</span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-semibold text-blue-600"
                  : "text-sm font-semibold text-slate-700 hover:text-blue-600"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="max-w-[220px] truncate text-sm font-medium text-slate-600">
                {user?.username}
              </span>

              <NavLink
                to="/dashboard"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/account"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
              >
                Account
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          className="inline-flex rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto grid max-w-6xl gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-4 border-t border-slate-200 pt-4">
              {isAuthenticated ? (
                <div className="grid gap-3">
                  <p className="truncate px-4 text-sm font-medium text-slate-600">
                    {user?.username}
                  </p>

                  <NavLink
                    to="/dashboard"
                    onClick={closeMenu}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/account"
                    onClick={closeMenu}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                  >
                    Account
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

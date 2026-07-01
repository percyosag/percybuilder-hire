import { NavLink } from "react-router-dom";

function DashboardSubnav({ links }) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                : "rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default DashboardSubnav;

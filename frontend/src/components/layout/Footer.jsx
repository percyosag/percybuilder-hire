function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} PercyBuilder Hire. All rights reserved.
        </p>
        <p>Built with React, Spring Boot, PostgreSQL, and Docker.</p>
      </div>
    </footer>
  );
}

export default Footer;

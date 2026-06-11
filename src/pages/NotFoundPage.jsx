function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-slate-950">Page not found</h1>
      <p className="mt-3 text-slate-600">
        The page you are looking for does not exist.
      </p>
    </section>
  );
}

export default NotFoundPage;

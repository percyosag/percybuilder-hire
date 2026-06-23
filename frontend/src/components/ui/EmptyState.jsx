function EmptyState({
  title = "Nothing here yet",
  message = "Check back later for updates.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>

      <p className="mt-2 text-sm text-slate-600">{message}</p>
    </div>
  );
}

export default EmptyState;

function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
  error,
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-red-800">{title}</h2>

      <p className="mt-2 text-sm text-red-700">{message}</p>

      {error && (
        <pre className="mt-4 max-h-72 overflow-auto rounded-xl bg-slate-950 p-4 text-left text-xs text-white">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default ErrorState;

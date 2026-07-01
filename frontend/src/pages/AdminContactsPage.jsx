import {
  useGetAdminContactsQuery,
  useUpdateContactStatusMutation,
} from "../api/adminContactApi";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function AdminContactsPage() {
  const {
    data: contacts = [],
    isLoading,
    isError,
    error,
  } = useGetAdminContactsQuery();

  const [updateContactStatus, { isLoading: isUpdating }] =
    useUpdateContactStatusMutation();

  const handleStatusChange = async (contactId, status) => {
    try {
      await updateContactStatus({ contactId, status }).unwrap();
    } catch (apiError) {
      console.error("Could not update contact status", apiError);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading contact messages..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load contact messages"
        message={error?.data?.message || "Please try again later."}
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Admin dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Contact Messages
        </h1>

        <p className="mt-2 text-slate-600">
          Review messages submitted from the public contact form and update
          their status.
        </p>

        {contacts.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-600">
            No contact messages found.
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {contacts.map((contact) => (
              <article
                key={contact.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-950">
                        {contact.subject || "No subject"}
                      </h2>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {contact.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium text-slate-600">
                      {contact.fullName} • {contact.email}
                    </p>

                    {contact.phoneNumber && (
                      <p className="mt-1 text-sm text-slate-500">
                        Phone: {contact.phoneNumber}
                      </p>
                    )}

                    <p className="mt-4 leading-7 text-slate-700">
                      {contact.message}
                    </p>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Submitted: {contact.createdAt || "Not listed"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {contact.status !== "NEW" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(contact.id, "NEW")}
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Mark New
                      </button>
                    )}

                    {contact.status !== "CLOSED" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(contact.id, "CLOSED")}
                        className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminContactsPage;

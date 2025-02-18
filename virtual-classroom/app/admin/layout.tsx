export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-6">
        <h1 className="text-4xl font-semibold">Admin Panel</h1>
      </header>
      <main className="p-8">{children}</main> {/* This will render the content for /admin */}
    </div>
  );
}

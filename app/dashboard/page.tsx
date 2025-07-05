import RequireAuth from '@/components/RequireAuth';

export default function DashboardPage() {
  return (
    <RequireAuth>
      {/* Your existing dashboard content */}
      <h1>Dashboard</h1>
    </RequireAuth>
  );
}
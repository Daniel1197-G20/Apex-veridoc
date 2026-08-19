import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAuth() {
  const { firebaseUser, loading } = useAuth();

  if (loading) return <FullScreenLoader />;
  if (!firebaseUser) return <Navigate to="/login" replace />;

  return <Outlet />;
}

/** Guards /admin/* — requires the resolved profile to carry a platformRole. */
export function RequirePlatformAdmin() {
  const { profile, loading } = useAuth();

  if (loading) return <FullScreenLoader />;
  if (!profile?.platformRole) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
    </div>
  );
}

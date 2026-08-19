import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RequireAuth } from "./components/RouteGuards";
import AppLayout from "./components/AppLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import AttendancePage from "./pages/AttendancePage";
import CredentialsPage from "./pages/CredentialsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import VerifyCredentialPage from "./pages/VerifyCredentialPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Portals */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyCredentialPage />} />

          {/* Authenticated Organization Portal with AppLayout Shell */}
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/programmes" element={<ProgrammesPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/credentials" element={<CredentialsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

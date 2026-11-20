import { NavLink, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { Icons } from "@/lib/icons";
import { AuthProvider, RequireAuth, useAuth } from "@/lib/auth";
import Login from "@/screens/Login";
import FindDoctors from "@/screens/FindDoctors";
import MyAppointments from "@/screens/MyAppointments";
import DoctorSchedule from "@/screens/DoctorSchedule";
import DoctorAvailability from "@/screens/DoctorAvailability";
import Admin from "@/screens/Admin";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The app's menu, drawn around every screen except the ones routed outside it below.
function AppShellLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="border-b"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <div className="flex flex-wrap items-center gap-6 px-6 py-2">
          <p
            className="shrink-0 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"MediBook"}
          </p>
          <nav aria-label="App menu" className="flex flex-wrap items-center gap-1">
            <NavLink to="/find-doctors" className={navLinkClass}>
              <Icons.Search size={16} />
              {"Find a doctor"}
            </NavLink>
            <NavLink to="/my-appointments" className={navLinkClass}>
              {"My appointments"}
            </NavLink>
            <NavLink to="/doctor-schedule" className={navLinkClass}>
              <Icons.Check size={16} />
              {"My schedule"}
            </NavLink>
            <NavLink to="/doctor-availability" className={navLinkClass}>
              <Icons.Settings size={16} />
              {"My availability"}
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              <Icons.User size={16} />
              {"Admin console"}
            </NavLink>
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                void handleSignOut();
              }}
              className={navLinkClass({ isActive: false })}
            >
              <Icons.X size={16} />
              {"Sign out"}
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppShellLayout />}>
          <Route
            path="/find-doctors"
            element={
              <RequireAuth roles={["patient"]}>
                <FindDoctors />
              </RequireAuth>
            }
          />
          <Route
            path="/my-appointments"
            element={
              <RequireAuth roles={["patient"]}>
                <MyAppointments />
              </RequireAuth>
            }
          />
          <Route
            path="/doctor-schedule"
            element={
              <RequireAuth roles={["doctor"]}>
                <DoctorSchedule />
              </RequireAuth>
            }
          />
          <Route
            path="/doctor-availability"
            element={
              <RequireAuth roles={["doctor"]}>
                <DoctorAvailability />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth roles={["admin"]}>
                <Admin />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

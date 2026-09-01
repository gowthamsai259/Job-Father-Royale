import { useEffect, useRef, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { createRoutes } from "./routes";
import { API_PATHS } from "./config/apiPaths";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const syncedToken = useRef<string | null>(null);
  const syncingToken = useRef<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  async function syncUser(session: Session) {
    const response = await fetch(API_PATHS.auth.syncUser, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("User sync failed");
    }

    console.log("User synced successfully");
  }

  async function syncOnce(session: Session) {
    const token = session.access_token;

    if (
      syncedToken.current === token ||
      syncingToken.current === token
    ) {
      return;
    }

    syncingToken.current = token;

    try {
      await syncUser(session);
      syncedToken.current = token;
    } catch (error) {
      console.error("User sync error:", error);
    } finally {
      syncingToken.current = null;
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;

      setUser(session?.user ?? null);
      setLoading(false);

      if (session) {
        void syncOnce(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);

        if (session) {
          void syncOnce(session);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }

    if (user && location.pathname === "/login") {
      navigate("/home", { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  async function login() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    setUser(null);
    syncedToken.current = null;
    navigate("/login", { replace: true });
  }

  const routes = createRoutes({
    userEmail: user?.email,
    onLogin: login,
    onLogout: logout,
  });

  const page = useRoutes(routes);

  if (loading) {
    return <p>Loading session...</p>;
  }

  return page;
}

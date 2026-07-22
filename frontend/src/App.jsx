import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./hooks/useAuth";
import Chat from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFoundPage";
import Loader from "./components/Loader";

export default function App() {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader className="size-20" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={auth ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/login" element={<AuthPage key="login" type="login" />} />
      <Route path="/signup" element={<AuthPage key="signup" type="signup" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

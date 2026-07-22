import { Route, Routes } from "react-router";
import Chat from "./pages/ChatPage";
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFoundPage";
import Signup from "./pages/SignupPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

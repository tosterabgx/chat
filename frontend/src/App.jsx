import { Route, Routes } from "react-router";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFoundPage";
import Signup from "./pages/SignupPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

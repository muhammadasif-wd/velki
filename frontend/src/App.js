import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import privateRoutes from "./Routes/privateRoutes";
import Login from "./Authentication/Login";
import First from "./Pages/First";
import Signup from "./Authentication/Signup";
import AuthUser from "./Hooks/AuthUser";
import { adminRoutes } from "./Admin/Routes/adminRoutes";
import MainAdmin from "./Admin/Pages/MainAdmin";
import AdminDashboard from "./Admin/Pages/AdminDashboard";

function App() {
  const { userInfo } = AuthUser();

  return (
    <div>
      <Routes>
        <Route path="/" element={<First />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        {userInfo?.role === "user" && privateRoutes.map(({ Component, path }, index) => (
          <Route key={index + 1154} path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path={path} element={<Component />}></Route>
          </Route>
        ))}
        {userInfo?.role === "admin" && adminRoutes.map(({ Component, path }, index) => (
          <Route key={index + 341154} path="/" element={<MainAdmin />}>
            <Route index element={<AdminDashboard />} />
            <Route path={path} element={<Component />}></Route>
          </Route>
        ))}
      </Routes>
    </div>
  );
}

export default App;

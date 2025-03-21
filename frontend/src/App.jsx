import React from "react";
import{ BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
  <Route path="/login" element={<Login />}></Route>
  <Route path="/admin-dashboard" element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["admin"]}>

    <AdminDashboard />
     </RoleBaseRoutes>
    </PrivateRoutes>

    }>
<Route index element={<AdminSummary />}></Route>

<Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
<Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>

<Route path="/admin-dashboard/employees" element={<List />}></Route>
<Route path="/admin-dashboard/add-employee" element={<Add />}></Route>


</Route>
  <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
 </Routes>
 </BrowserRouter>
  );
}


export default App;

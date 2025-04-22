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
import EditDepartment from "./components/departments/EditDepartment";
import View from "./components/employee/View";
import AddSalary from "./components/salary/Add";
import Edit from "./components/employee/Edit";
import ViewSalary from "./components/salary/View";
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leaves/List';
import AddLeave from './components/leaves/Add';
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leaves/Table';
import Detail from './components/leaves/Detail';
import AdminChangePassword from "./components/AdminChangePassword/AdminChangePassword";
import Attendance from "./components/attendance/Attendance";
import AttendanceReport from "./components/attendance/AttendanceReport";
import AssignProject from './components/project/AssignProject';
import Projects from './components/project/EmployeeProjects';
import ProjectList from "./components/project/ProjectList";





function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
  <Route path="/login" element={<Login />}></Route>


  <Route path="/admin-dashboard" element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["admin", "employee"]}>

    <AdminDashboard />
     </RoleBaseRoutes>
    </PrivateRoutes>

    }>
<Route index element={<AdminSummary />}></Route>

<Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
<Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
<Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>


<Route path="/admin-dashboard/employees" element={<List />}></Route>
<Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
<Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
<Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>
<Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>



<Route path="/admin-dashboard/salary/add" element={<AddSalary />}>
</Route>

<Route path="/admin-dashboard/leaves" element={<Table />}> </Route>
<Route path="/admin-dashboard/leaves/:id" element={<Detail />}> </Route>
<Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}> </Route>
<Route path="/admin-dashboard/settings" element={<AdminChangePassword />} />
<Route path="/admin-dashboard/attendance" element={<Attendance />}></Route>
<Route path="/admin-dashboard/attendance-report" element={<AttendanceReport />}></Route>
<Route path="/admin-dashboard/projects" element={<AssignProject />} />
<Route path="/admin-dashboard/project-list" element={<ProjectList />} />



  </Route>
  <Route path="/employee-dashboard"
  element={
  <PrivateRoutes>
    <RoleBaseRoutes requiredRole={["admin", "employee"]}>
    <EmployeeDashboard />
    </RoleBaseRoutes>
  </PrivateRoutes>
  }
  >

<Route index element={<Summary />}></Route>

<Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
<Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
<Route path="/employee-dashboard/add-leaves" element={<AddLeave />}></Route>
<Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
<Route path="/employee-dashboard/projects/:id" element={<Projects />} />
<Route path="/employee-dashboard/setting" element={<Setting />} />



 </Route>
 </Routes>
  
 </BrowserRouter>
  );
}


export default App;

import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './components/common/Home'
import { Error } from './components/common/Error'
import { Navbar } from './components/layout/Navbar'
import { Signin } from './components/common/Signin'
import { Forgot } from './components/common/Forgot'
import { Signup } from './components/common/Signup'
import { Footer } from './components/layout/Footer'
import { Contact } from './components/common/Contact'
import { HomeDetails } from './components/common/HomeDetails'
import { Dashboard } from './components/owner/Dashboard'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { Profile } from './components/common/Profile'
import { Wishlist } from './components/user/Wishlist'
import { AdminLogin } from './components/admin/adminlogin'
import { HelpCenter } from './components/common/Support/HelpCenter'
import { Loading } from './components/layout/Loading'



function App() {

  axios.defaults.baseURL = "http://localhost:3000"

  const location = useLocation();
  const adminRoutes = ['/admin', '/adminpanel'];
  const msgRoutes = ['/message'];
  const isAdminRoute = adminRoutes.includes(location.pathname);
  const isMessageRoute = msgRoutes.includes(location.pathname);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>


        <Route path="/home" element={<Home />}></Route>
        <Route index element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/HomeDetails/:id" element={<HomeDetails />}></Route>

        <Route path="/login" element={<Signin />}></Route>
        <Route path="/reset" element={<Forgot />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/*" element={<Error />}></Route>

        <Route path="/helpcenter" element={<HelpCenter />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>

        <Route element={<Loading  allowedRoles={["Admin"]} />}>
          <Route path="/adminpanel" element={<AdminDashboard />}></Route>
        </Route>

        <Route element={<Loading  allowedRoles={["Owner"]} />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Route>

        <Route element={<Loading  allowedRoles={["User"]} />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Route>

      </Routes>

      {!isAdminRoute && !isMessageRoute && <Footer />}

    </>
  )
}

export default App

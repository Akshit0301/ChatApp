import { useEffect } from "react"
import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast";

import { Routes,Route, Navigate } from "react-router-dom"
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const { theme } = useThemeStore();
  console.log({onlineUsers});
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  // ensure DaisyUI theme variables apply to the whole document
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [theme]);
  // checkAuth may call the backend and return 401 when no session/token is present.
  // That's expected when the user is not signed in; we set authUser to null in that case.
  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        {/* ensure the icon has explicit size and is an inline-block so animations apply */}
        <Loader className="inline-block w-10 h-10 animate-spin text-slate-700" aria-label="Loading" />
      </div>
    )
  // if(isCheckingAuth && !authUser)return(
  //   <div className="flex items-center justify-center h-screen">
  //     <Loader className="size-10 animate spin"/>
  //   </div>  
  // )

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}
export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import Loader from "./components/loader/loader";
import { useSelector } from "react-redux";

function App() {
//   1. To read data from Redux state.
// 2.When the component depends on Redux state to display UI.
// 3.When you want automatic re-renders whenever the selected state changes.
  const {loader}=useSelector(state=>state.loaderReducer);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}
      {/* Add routing functionality */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>  {/*  Protect the home component, means only logged in user navigate to home page.*/ }
          <Home />
          </ProtectedRoute>}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/signup" element={<Signup />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    

  )
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Add routing functionality */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
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

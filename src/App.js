import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
// import Ragister from "./Component/Ragister";
import Signupp from "./Component/Signupp";
import Home from "./Component/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Loginn from "./Component/Loginn";
import { useStateValue } from "./Component/store";
import RequireAuth from "./RequireAuth";
import User from "./Component/User";

function App() {
  const [{ token }] = useStateValue();
  console.log("this is app token", token);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signupp" element={<Signupp />} />

        <Route path="/loginn" element={<Loginn />} />

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

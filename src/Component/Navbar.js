import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useStateValue } from "./store";
import { useNavigate } from "react-router-dom";

const Header = styled(AppBar)`
  background: #f8f9fa;
  // margin-left: 10px;
`;
const Tab = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: black;
  text-decoration: none;
`;

const Navbar = () => {
  const [{ token }] = useStateValue();

  const navigate = useNavigate();

  function logOut() {
    navigate("/loginn");
    localStorage.removeItem("token");
  }
  return (
    <Header position="static">
      <Toolbar>
        {/* <Tab to="/home">Home</Tab> */}

        {token !== null ? (
          <>
            <Tab to="/home">Home</Tab>
            <button
              onClick={logOut}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Tab to="/signupp">Signup</Tab>
            <Tab to="/loginn">login</Tab>
          </>
        )}
      </Toolbar>
    </Header>
  );
};
export default Navbar;

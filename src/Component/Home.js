import React from "react";
import { useStateValue } from "./store";

const Home = () => {
  const [{ token }] = useStateValue();

  console.log("This is home page token", token);
  return (
    <div
    // className="container mt-5"
    // style={{
    //   backgroundColor: " #f8f9fa",
    //   height: "80vh",
    //   border: "5px solid black",
    // }}
    >
      This is home
    </div>
  );
};

export default Home;

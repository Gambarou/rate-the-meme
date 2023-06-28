import React from "react";
import Navbar from "./Navbar";
import Images from "./Images";

function Home({ setIsLoggedIn }) {
    return (
      <>
        <Navbar setIsLoggedIn={setIsLoggedIn}/>
        <Images />
      </>
    )
  }

  export default Home;
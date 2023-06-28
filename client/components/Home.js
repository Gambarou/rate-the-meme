import React from "react";
import Navbar from "./Navbar";
import Center from "./Center";

function Home({ setIsLoggedIn }) {
    return (
      <>
      {/* <Navbar setIsLoggedIn={setIsLoggedIn}/> */}
      <div className="flex h-screen max-w-screen-xl ml-auto mr-auto px-10">
        <div className="flex-0.3 mt-20 pl-20 pr-20"></div>
        <Center />
        <div className="flex-0.3"></div>
      </div>
      </>
    )
  }

  export default Home;
import React, { useState } from "react";
import Center from "./Center";

function Home({ setIsLoggedIn }) {

  return ( 
    <div className="flex justify-center h-screen m-auto px-10 w-1/2">
      <div className="">
        <Center setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  )
  }

  export default Home;
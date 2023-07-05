import React from "react";
import Center from "./Center";

function Home({ setIsLoggedIn }) {

  return ( 
    <div className="flex justify-center h-screen m-auto px-10 lg:w-2/5 md:w-3/5"> 
        <Center setIsLoggedIn={setIsLoggedIn} />
    </div>
  )
  }

  export default Home;
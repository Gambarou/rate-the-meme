import React from "react";
import Center from "./Center";

function Home({ setIsLoggedIn }) {
    return ( 
      <div className="flex justify-center h-screen m-auto px-10">
        <div className="w-2/5">
          <Center setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    )
  }

  export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Center from "./Center";

function Home({ isLoggedIn, setIsLoggedIn }) {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
      if (isLoggedIn) {
        axios.get('/api/memes')
          .then(res => {
            setMemes([ ...res.data ]);
          })
          .catch(err => console.log(err))
      }
    }, [isLoggedIn])

    return ( 
      <div className="flex justify-center h-screen m-auto px-10">
        <div className="w-2/5">
          <Center setIsLoggedIn={setIsLoggedIn} memes={memes}/>
        </div>
      </div>
    )
  }

  export default Home;
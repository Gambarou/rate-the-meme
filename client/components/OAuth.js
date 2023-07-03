import React from 'react'

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

function OAuth() {
  return (
    <div className="flex flex-row items-center gap-4 mt-8 justify-center"> 
      <div className="
        w-10
        h-10
        bg-white
        rounded-full
        flex
        items-center
        justify-center
        cursor-pointer
        hover:opacity-80
        transition
      ">
        <FcGoogle size={30} />
      </div>
      <div className="
        w-10
        h-10
        bg-white
        rounded-full
        flex
        items-center
        justify-center
        cursor-pointer
        hover:opacity-80
        transition
      ">
        <FaGithub size={30} />
      </div>
    </div>
  )
}

export default OAuth

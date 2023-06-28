import React from 'react'
import FlipMove from "react-flip-move";
import Post from './Post';

function Center() {
  return (
    <div className="flex-0.4 border border-zinc-700 overflow-y-scroll no-scrollbar">
      <div className="sticky top-0 p-5 bg-opacity-50">
        <h2 className="text-2xl text-zinc-200 font-bold">ℝ𝕒𝕥𝕖 𝕥𝕙𝕖 𝕄𝕖𝕞𝕖</h2>
      </div>

        <FlipMove>
            <Post />
        </FlipMove>
    </div>
  )
}

export default Center

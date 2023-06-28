import React from 'react'
import Meme from '../../server/models/memeModel';
import axios from 'axios';

function Images() {
  const itemData = [
      {
        img: "https://i.imgur.com/JEu4eZS.mp4",
        title: 'nepotism',
        author: 'unknown'
      },
      {
        img: 'https://i.redd.it/gqsb2cwtwnn41.gif',
        title: '2020',
        author: 'unknown'
      }
  ]

  return (
    <div className="flex items-center justify-center">
      {itemData.map((item) => (
        <div key={item.img} className="max-w-sm rounded overflow-hidden shadow-lg m-8 bg-neutral-300">
          {item.img.endsWith('.mp4') ? (
            <video
              src={item.img}
              autoPlay
              loop
              muted
              className="w-full"
              loading="lazy"
            />
          ) : (
            <img
              src={item.img}
              alt={item.title}
              className="w-full"
              loading="lazy"
            />
          )}
          <div className="px-6 py-6">
            <div className="font-bold text-blue-500 text-xl mb-2 hover:underline cursor-pointer">
                {`${item.author}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Images

import React from 'react'

const Card = ({ image, title, description }) => {
  return (
    <div className="rounded overflow-hidden shadow-sm min-height-full">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  )
}

export default Card;
import React from "react"

function Icon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill={color || "#708670"}></circle>
      <path
        fill="#fff"
        d="M19.778 21.192l-6.364 6.365L12 26.142l6.364-6.364L12 13.414 13.414 12l6.364 6.364L26.142 12l1.415 1.414-6.365 6.364 6.364 6.364-1.415 1.415z"
      ></path>
    </svg>
  )
}

export default Icon

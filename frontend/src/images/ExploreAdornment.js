import React from "react"

function ExploreIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.6 37">
      <g
        fill="none"
        stroke={color || "#708670"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      >
        <path d="M15.5 10V5.75a4.25 4.25 0 014.25-4.25h22.1a4.25 4.25 0 014.25 4.25v25.5a4.25 4.25 0 01-4.25 4.25h-22.1a4.25 4.25 0 01-4.25-4.25V27"></path>
        <path d="M25.7 27l8.5-8.5-8.5-8.5M1.5 18.5h31"></path>
      </g>
    </svg>
  )
}

export default ExploreIcon

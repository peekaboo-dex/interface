import React from 'react'

function CoolGridOfDots() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="120"
      fill="none"
      viewBox="0 0 48 120"
    >
      <mask
        id="mask0_841:235"
        style={{ maskType: 'alpha' }}
        width="48"
        height="120"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="url(#paint0_linear_841:235)" d="M0 0H48V120H0z"></path>
      </mask>
      <g fill="#644B37" mask="url(#mask0_841:235)">
        <ellipse cx="6.261" cy="6.25" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="6.261" cy="28.125" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="6.261" cy="50" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="6.261" cy="71.875" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="6.261" cy="93.75" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="24" cy="6.25" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="24" cy="28.125" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="24" cy="50" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="24" cy="71.875" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="24" cy="93.75" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="41.739" cy="6.25" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="41.739" cy="28.125" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="41.739" cy="50" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="41.739" cy="71.875" rx="6.261" ry="6.25"></ellipse>
        <ellipse cx="41.739" cy="93.75" rx="6.261" ry="6.25"></ellipse>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_841:235"
          x1="24"
          x2="24"
          y1="0"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C4C4C4"></stop>
          <stop offset="1" stopColor="#C4C4C4" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export { CoolGridOfDots }

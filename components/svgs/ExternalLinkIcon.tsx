import React from 'react'

interface ExternalLinkIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string
}

function ExternalLinkIcon(props: ExternalLinkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill={props.color ?? '#fff'}
        d="M15 0H8v2h4.6L6.3 8.3l1.4 1.4L14 3.4V8h2V1c0-.6-.4-1-1-1z"
      ></path>
      <path
        fill={props.color ?? '#fff'}
        d="M14 16H1c-.6 0-1-.4-1-1V2c0-.6.4-1 1-1h4v2H2v11h11v-3h2v4c0 .6-.4 1-1 1z"
      ></path>
    </svg>
  )
}

function ExternalLinkIconBlack(props: ExternalLinkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#000"
        d="M8 0v2h4.586L7.293 7.293l1.414 1.414L14 3.414V8h2V1a1 1 0 00-1-1H8z"
      ></path>
      <path fill="#000" d="M16 16H1a1 1 0 01-1-1V0h2v14h14v2z"></path>
    </svg>
  )
}

export { ExternalLinkIcon, ExternalLinkIconBlack }

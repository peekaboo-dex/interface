import React from 'react'

function EthIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="20"
      fill="none"
      viewBox="0 0 12 20"
      {...props}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M5.955 14.53L0 11.013l5.955 8.393 5.959-8.393-5.96 3.517h.001zM6.045 0L.09 9.882l5.955 3.521L12 9.886 6.045 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

function UsdcIcon(props: React.SVGProps<SVGSVGElement>) {
  const color = props.color ?? '#fff'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
      {...props}
    >
      <path
        fill={color}
        d="M17.071 14.428c0-2.428-1.454-3.26-4.363-3.607-2.078-.278-2.493-.832-2.493-1.804 0-.97.693-1.595 2.078-1.595 1.246 0 1.939.416 2.285 1.457.07.208.277.346.485.346h1.108a.474.474 0 00.485-.485v-.07a3.462 3.462 0 00-3.117-2.843V4.162c0-.278-.207-.486-.554-.555h-1.039c-.277 0-.484.208-.554.555v1.595C9.315 6.035 8 7.422 8 9.157c0 2.288 1.385 3.19 4.294 3.537 1.939.347 2.562.763 2.562 1.873 0 1.11-.97 1.872-2.285 1.872-1.801 0-2.424-.763-2.632-1.803-.07-.277-.277-.416-.485-.416H8.276a.474.474 0 00-.485.485v.07c.277 1.734 1.385 2.982 3.67 3.33v1.664c0 .277.208.485.555.555h1.038c.277 0 .485-.208.555-.555v-1.665c2.077-.347 3.462-1.803 3.462-3.676z"
      ></path>
      <path
        fill={color}
        d="M8.968 21.711C3.566 19.769.796 13.734 2.804 8.393 3.843 5.48 6.128 3.26 8.968 2.22c.277-.14.415-.347.415-.694V.555c0-.278-.138-.486-.415-.555-.07 0-.208 0-.277.07C2.11 2.15-1.49 9.155.588 15.745A12.469 12.469 0 008.69 23.86c.277.139.554 0 .623-.277.07-.07.07-.139.07-.277v-.972c0-.208-.208-.485-.416-.624zM16.309.069c-.277-.138-.554 0-.623.278-.07.07-.07.138-.07.277v.971c0 .278.208.555.416.694 5.402 1.942 8.172 7.977 6.164 13.318-1.039 2.913-3.325 5.133-6.164 6.173-.277.14-.415.347-.415.694v.971c0 .278.138.486.415.555.07 0 .208 0 .277-.07 6.58-2.08 10.18-9.086 8.103-15.676A12.57 12.57 0 0016.31.07z"
      ></path>
    </svg>
  )
}

export { EthIcon, UsdcIcon }
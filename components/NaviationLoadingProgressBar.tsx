import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
// import { figmaColors } from '../styles/theme'
// import { HEADER_BANNER_HEIGHT, HEADER_HEIGHT_DESKTOP } from './Header';

export interface MyProps {
  color?: string
  startPosition: number
  stopDelayMs: number
  height: number
  options?: any
}

const NavigationLoadingProgressBar: React.FC<MyProps> = (props) => {
  const color = props.color //?? figmaColors.coralText
  const height = props.height

  useEffect(() => {
    // testing
    // NProgress.set(40);
    // NProgress.start();

    const routeChangeStart = () => {
      NProgress.set(props.startPosition)
      NProgress.start()
    }

    let timer: number | undefined
    const routeChangeEnd = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        NProgress.done(true)
      }, props.stopDelayMs) as any as number
    }

    if (props.options) {
      NProgress.configure(props.options)
    }

    Router.events.on('routeChangeStart', routeChangeStart)
    Router.events.on('routeChangeComplete', routeChangeEnd)
    Router.events.on('routeChangeError', routeChangeEnd)
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart)
      Router.events.off('routeChangeComplete', routeChangeEnd)
      Router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [props.options, props.startPosition, props.stopDelayMs])

  const HEADER_HEIGHT_DESKTOP = 0
  const isAppBannerVisible = false
  const HEADER_BANNER_HEIGHT = 0

  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 100;
        top: calc(
          ${HEADER_HEIGHT_DESKTOP}px + ${isAppBannerVisible ? HEADER_BANNER_HEIGHT : '0px'}
        );
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: none;
        position: fixed;
        z-index: 1031;
        top: ${isAppBannerVisible ? `calc(15px + ${HEADER_BANNER_HEIGHT})` : '15px'};
        right: 15px;
      }
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: ${color};
        border-left-color: ${color};
        border-radius: 50%;
        -webkit-animation: nprogresss-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  )
}

export { NavigationLoadingProgressBar }

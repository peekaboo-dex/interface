import styled, { keyframes } from 'styled-components'

const pulsing = keyframes`
  to {
    box-shadow: 0 0 0 8px rgba(232, 76, 61, 0);
  }
`

const StatusIcon = styled.div`
  background-color: #a1e780;
  color: #fff;
  width: 16px;
  height: 16px;
  font-size: 30px;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translatey(0px);
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 0 0 #42db87;
  animation: ${pulsing} 1.8s infinite cubic-bezier(0.66, 0, 0, 1);
  font-weight: normal;
  font-family: sans-serif;
  text-decoration: none !important;
  transition: all 300ms ease-in-out;
`

export { StatusIcon }

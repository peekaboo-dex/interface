import styled, { CSSProperties } from 'styled-components'
import React, { useRef } from 'react'
import { useButton } from 'react-aria'
import type { AriaButtonProps } from '@react-types/button'

interface ButtonProps {
  elementType?: 'button' | 'div'
  isDisabled?: boolean
  key?: string
  style?: CSSProperties
}

// https://stackoverflow.com/questions/6542212/use-css3-transitions-with-gradient-backgrounds#answer-63848864

const StyledButton = styled.button<{ isPressed: boolean; isDisabled?: boolean }>`
  font-family: 'extended-regular';

  width: 100%;
  background: #000000;
  border: 1px solid #ffffff;
  padding: 20px;
  box-shadow: inset 0px 1px 2px rgba(255, 255, 255, 0.24), inset 0px 0px 12px #F8D6EB;
  border-radius: 26px;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  /* or 31px */

  text-align: center;

  /* White */

  color: #ffffff;
  /* font-family: 'favorit-regular'; */
  /* font-style: normal; */
  /* font-weight: bold; */
  /* font-size: 16px; */
  /* line-height: 150%; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */

  /* color: #000000; */

  /* text-align: center; */
  /* transition: all 0.2s ease; */
  /* will-change: transform, background-color, box-shadow; */

  transform: ${(props) => (props.isPressed ? `scale(0.985)` : `translate3d(0,0,0)`)};
  /* background: linear-gradient(180deg, #f5deca -120.59%, #c7bade 121.08%); */
  /* background: linear-gradient(93.4deg, #e8a343 11.73%, #e58440 97.2%); */
  /* background: linear-gradient(
    180deg,
    var(--buttonGradient1) -120.59%,
    var(--buttonGradient2) 121.08%
  ); */
  transition: transform 0.15s ease, color 0.25s ease, --buttonGradient1 0.25s ease,
    --buttonGradient2 0.25s ease;

  /* border-radius: 12px; */

  /* height: 60px; */
  /* width: 100%; */

  /* border: none; */

  ${(props) =>
    props.disabled &&
    `
    color: #888F96;
    cursor: not-allowed;
    background: #131417;
    --buttonGradient1: #131417;
    --buttonGradient2: #131417;
  `}
`

const StyledSecondaryButton = styled.button<{ isPressed: boolean; isDisabled?: boolean }>`
  font-family: 'favorit-regular';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;

  text-align: center;
  /* transition: all 0.2s ease; */
  /* will-change: transform, background-color, box-shadow; */

  background: transparent;

  transform: ${(props) => (props.isPressed ? `scale(0.985)` : `translate3d(0,0,0)`)};
  transition: transform 0.15s ease, color 0.25s ease, border 0.25s ease;

  border-radius: 12px;

  height: 60px;
  width: 100%;

  border: 1px solid #888f96;
  :hover,
  :active {
    border: 1px solid #ffffff;
  }

  ${(props) =>
    props.disabled &&
    `
    color: #888F96;
    cursor: not-allowed;
    background: #131417;
    --buttonGradient1: #131417;
    --buttonGradient2: #131417;
  `}
`

const PrimaryButton: React.FC<ButtonProps & AriaButtonProps<'button'>> = (props) => {
  let ref = useRef<HTMLButtonElement | null>(null)
  let { buttonProps, isPressed } = useButton(props, ref)
  return (
    <StyledButton
      key={props.key}
      isDisabled={props.isDisabled}
      {...buttonProps}
      isPressed={isPressed}
      ref={ref}
      style={props.style}
    >
      {props.children}
    </StyledButton>
  )
}

const SecondaryButton: React.FC<ButtonProps & AriaButtonProps<'button'>> = (props) => {
  let ref = useRef<HTMLButtonElement | null>(null)
  let { buttonProps, isPressed } = useButton(props, ref)
  return (
    <StyledSecondaryButton
      key={props.key}
      isDisabled={props.isDisabled}
      {...buttonProps}
      isPressed={isPressed}
      ref={ref}
      style={props.style}
    >
      {props.children}
    </StyledSecondaryButton>
  )
}

export { PrimaryButton, SecondaryButton }

import styled, { CSSProperties } from 'styled-components'
import React, { useRef } from 'react'
import { useButton } from 'react-aria'
import { AriaButtonProps } from '@react-types/button'

interface PillButtonProps {
  elementType?: 'button' | 'div' | 'a'
  as?: 'button' | 'div' | 'a'
  isDisabled?: boolean
  key?: string
  style?: CSSProperties
  mode: 'dark' | 'light'
}

const StyledPillButton = styled.button<{
  isPressed: boolean
  isDisabled?: boolean
  mode: 'dark' | 'light'
}>`
  font-family: 'favorit-regular';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.mode === 'dark' ? '#000000' : '#ffffff')};
  border-radius: 60px;
  color: ${(props) => (props.mode === 'dark' ? '#ffffff' : '#000000')};
  transform: ${(props) => (props.isPressed ? `scale(0.985)` : `translate3d(0,0,0)`)};
  transition: transform 0.15s ease;
  text-align: center;
  border: none;
  text-decoration: none;
  outline: none;
`

const PillButton: React.FC<PillButtonProps & AriaButtonProps<'button' | 'a'>> = (props) => {
  let ref = useRef<HTMLButtonElement | HTMLLinkElement | null>(null)
  let { buttonProps, isPressed } = useButton(props, ref)
  return (
    <StyledPillButton
      mode={props.mode}
      key={props.key}
      isDisabled={props.isDisabled}
      {...buttonProps}
      isPressed={isPressed}
      ref={ref as any}
      as={props.elementType}
      style={props.style}
    >
      {props.children}
    </StyledPillButton>
  )
}

export { PillButton }

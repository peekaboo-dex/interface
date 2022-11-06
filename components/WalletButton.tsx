import styled, { CSSProperties } from 'styled-components'
import React, { useRef } from 'react'
import { useButton } from 'react-aria'
import { AriaButtonProps } from '@react-types/button'
import { BaseButton } from './BaseButton'

interface ButtonProps {
  elementType: 'button' | 'div'
  style?: CSSProperties
}

const StyledButton = styled(BaseButton)<{ isPressed?: boolean }>`
  font-family: 'favorit-regular';

  /* identical to box height */

  text-align: right;

  flex-direction: row;
  color: #ffffff;

  /* padding: 11px 20px 8px 20px; */
  background: #16161a;
  height: 100%;
  border-radius: 60px;
  border: none;
  padding: 16px;
  height: 60px;

  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 110%;
  /* identical to box height, or 18px */

  display: flex;
  align-items: center;

  color: #ffffff;

  transform: ${(props) => (props.isPressed ? `scale(0.985)` : `translate3d(0,0,0)`)};
  transition: transform 0.15s ease, color 0.25s ease, border 0.25s ease;
`

const WalletSelectButton: React.FC<ButtonProps & AriaButtonProps<'button'>> = (props) => {
  let ref = useRef<HTMLButtonElement | null>(null)
  let { buttonProps, isPressed } = useButton(props, ref)

  return (
    <StyledButton isPressed={isPressed} {...buttonProps} {...props} ref={ref}>
      {props.children}
    </StyledButton>
  )
}

export { WalletSelectButton }

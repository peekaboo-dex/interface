import styled from 'styled-components'
import React, { forwardRef, ReactNode } from 'react'
import { useButton } from 'react-aria'
import { AriaButtonProps } from '@react-types/button'

const StyledButton = styled.button`
  font-family: 'extended-regular';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  text-align: right;

  color: #ffffff;

  padding: 14px 24px;
  background: #16161a;
  height: 100%;
  border-radius: 60px;
  border: none;

  background: #000000;
  /* border: 1px solid #FFFFFF; */
  box-shadow: inset 0px 1px 2px rgba(255, 255, 255, 0.24), inset 0px 0px 12px #F8D6EB;
  border-radius: 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;

  text-decoration: none;
  /* or 23px */

  text-align: center;

  /* White */

  color: #ffffff;
`

export type Ref = HTMLButtonElement

interface Props extends AriaButtonProps<'button'> {
  children?: ReactNode
}

const ConnectWalletButton = forwardRef<Ref, Props>((props, ref) => {
  let { buttonProps, isPressed } = useButton(props, ref as any)

  return (
    <StyledButton {...buttonProps} {...props} ref={ref}>
      {props.children}
    </StyledButton>
  )
})

ConnectWalletButton.displayName = 'ConnectWalletButton'

export { ConnectWalletButton, StyledButton as StyledNewButton }

import * as React from 'react'
import styled from 'styled-components'
import { useOverlay, DismissButton, FocusScope } from 'react-aria'

interface PopoverProps {
  popoverRef?: React.RefObject<HTMLDivElement>
  children: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1;
  width: 100%;
  /* border: 1px solid lightgray; */

  border-radius: 4px;
  margin-top: 6px;
  padding: 8px 8px;
  /* box-shadow: 0 4px 8px #eee; */
  background: #131417;
  border-radius: 12px;

  box-shadow: 0.3px 0.3px 2.2px rgba(0, 0, 0, 0.02), 0.7px 0.8px 5.3px rgba(0, 0, 0, 0.028),
    1.3px 1.5px 10px rgba(0, 0, 0, 0.035), 2.2px 2.7px 17.9px rgba(0, 0, 0, 0.042),
    4.2px 5px 33.4px rgba(0, 0, 0, 0.05), 10px 12px 80px rgba(0, 0, 0, 0.07);

  /* custom */
  width: 110%;
  /* right: -2px; */
`

export function Popover(props: PopoverProps) {
  let ref = React.useRef<HTMLDivElement>(null)
  let { popoverRef = ref, isOpen, onClose, children } = props

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: false,
    },
    popoverRef,
  )

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <Wrapper {...overlayProps} ref={popoverRef}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Wrapper>
    </FocusScope>
  )
}

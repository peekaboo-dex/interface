import { useOverlayTriggerState } from '@react-stately/overlays'
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
  AriaOverlayProps,
} from '@react-aria/overlays'
import { animated } from '@react-spring/web'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useButton } from '@react-aria/button'
import React from 'react'
import { AriaDialogProps } from '@react-types/dialog'
import styled, { CSSProperties } from 'styled-components'
import { H4Responsive } from './Typography'
import { Spacer } from './Spacer'

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        fill="#fff"
        d="M15.7.3c-.4-.4-1-.4-1.4 0L8 6.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L6.6 8 .3 14.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l6.3 6.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l6.3-6.3c.4-.4.4-1 0-1.4z"
      ></path>
    </svg>
  )
}


export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FlexRowIndented = styled(FlexRow)`
  margin-left: 16px;
  margin-right: 16px;
`


type ModalProps = AriaOverlayProps &
  AriaDialogProps & {
    // Dialog title
    title: string
    // Container style overrides
    containerStyles: CSSProperties
  }

const ModalDialog: React.FC<ModalProps> = (props) => {
  let { title, children, containerStyles } = props

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  let ref = React.useRef<HTMLDivElement | null>(null)
  let { overlayProps, underlayProps } = useOverlay(props, ref)

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll({
    isDisabled: true,
  })
  let { modalProps } = useModal()

  // Get props for the dialog and its title
  let { dialogProps, titleProps } = useDialog(props, ref)

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...underlayProps}
    >
      <FocusScope contain restoreFocus autoFocus>
        <animated.div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            background: '#000000',
            color: '#ffffff',
            margin: 8,
            padding: '20px 20px 8px 20px',
            marginBottom: 8,
            overflow: 'hidden',
            borderRadius: 24,
            border: `1px solid rgba(255, 255, 255, 0.12)`,
            boxShadow: `0px 100px 80px rgba(0, 0, 0, 0.14), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.083455), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.056545)`,
            ...containerStyles,
          }}
        >
          <FlexRow
            style={{
              height: 56,
              paddingLeft: 12,
              paddingRight: 16,
              alignItems: 'center',
            }}
          >
            <H4Responsive {...titleProps} style={{ marginTop: 0, fontFamily: 'extended-regular' }}>
              {title}
            </H4Responsive>
            <div style={{ cursor: 'pointer', padding: 2 }} onClick={() => props.onClose?.()}>
              <CloseIcon />
            </div>
          </FlexRow>
          <Spacer size={16} />

          {children}
        </animated.div>
      </FocusScope>
    </div>
  )
}

const ExampleModal: React.FC<{}> = () => {
  const state = useOverlayTriggerState({})
  const openButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null)

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef,
  )

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => state.close(),
    },
    closeButtonRef,
  )

  return (
    <>
      <button {...openButtonProps} ref={openButtonRef}>
        Open Dialog
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            containerStyles={{}}
            title="Enter your name"
            isOpen
            onClose={state.close}
            isDismissable
          >
            {/* <form style={{ display: 'flex', flexDirection: 'column' }}> */}
            <label>
              First Name: <input placeholder="John" />
            </label>
            <label>
              Last Name: <input placeholder="Smith" />
            </label>
            {/* <button {...closeButtonProps} ref={closeButtonRef} style={{ marginTop: 10 }}>
                Submit
              </button> */}
            {/* </form> */}
          </ModalDialog>
        </OverlayContainer>
      )}
    </>
  )
}

export { ModalDialog }

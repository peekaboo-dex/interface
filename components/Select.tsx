import * as React from 'react'
import styled, { CSSProperties } from 'styled-components'
import type { AriaSelectProps } from '@react-types/select'
import { useSelectState } from 'react-stately'
import { useSelect, HiddenSelect, useButton, mergeProps, useFocusRing } from 'react-aria'
import { SelectorIcon } from '@heroicons/react/solid'

import { ListBox } from './Listbox'
import { Popover } from './Popover'

export { Item } from 'react-stately'

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

export const Label = styled.label`
  display: block;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
`

interface ButtonProps {
  isOpen?: boolean
  isFocusVisible?: boolean
}

const Button = styled.button<ButtonProps>`
  font-family: 'favorit-regular';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 149%;

  display: flex;
  align-items: center;
  appearance: none;
  height: 72px;
  background: #131417;
  /* background: ${(props) => (props.isOpen ? '#eee' : 'white')}; */
  border: 1px solid transparent;
  padding: 6px 2px 6px 16px;
  /* margin-top: 6px; */
  outline: none;
  /* border-color: ${(props) => (props.isFocusVisible ? 'seagreen' : 'lightgray')}; */
  /* box-shadow: ${(props) =>
    props.isFocusVisible ? '0 0 0 3px rgba(143, 188, 143, 0.5)' : ''}; */
  border-radius: 4px;
  display: inline-flex;

  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #ffffff;

  background: #131417;
  /* box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06); */
  border-radius: 12px;
`

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
      <g clipPath="url(#clip0_834:4674)">
        <path
          fill="#fff"
          d="M10.354 2.146a.5.5 0 00-.708 0L6 5.793 2.354 2.146a.5.5 0 00-.708 0l-1.5 1.5a.5.5 0 000 .708l5.5 5.5a.5.5 0 00.708 0l5.5-5.5a.5.5 0 000-.708l-1.5-1.5z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_834:4674">
          <path fill="#fff" d="M0 0H12V12H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

const Value = styled.span`
  display: inline-flex;
  align-items: center;
`

const StyledIcon = styled(SelectorIcon)`
  width: 18px;
  height: 18px;
  padding: 6px 2px;
  margin: 0 4px;
  background: seagreen;
  border-radius: 4px;
  color: white;
`

export function Select<T extends object>(
  props: AriaSelectProps<T> & { containerStyle?: CSSProperties; disabled?: boolean },
) {
  // Create state based on the incoming props
  let state = useSelectState(props)

  // Get props for child elements from useSelect
  let ref = React.useRef(null)
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref)

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref)

  let { focusProps, isFocusVisible } = useFocusRing()

  return (
    <Wrapper style={props.containerStyle ?? {}}>
      <Label {...labelProps}>{props.label}</Label>
      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />
      <Button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        disabled={props.disabled}
        isOpen={state.isOpen}
        isFocusVisible={isFocusVisible}
      >
        <Value {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : 'Select'}

          {!props.disabled && (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <ChevronDown />
            </span>
          )}
        </Value>
        {/* <ChevronDown /> */}
        {/* <StyledIcon /> */}
      </Button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </Wrapper>
  )
}

/**
 * Useage:
 * 
 * https://codesandbox.io/s/sharp-sun-e3fgd?file=/src/App.tsx:2970-3313
 * 
 *       
 * <Select label="Reviewer" items={people}>
        {(item) => (
          <Item textValue={item.name}>
            <Avatar src={item.avatar} alt={item.name} />
            <div>
              <Label>{item.name}</Label>
              <Description>{item.username}</Description>
            </div>
          </Item>
        )}
      </Select>
 */

import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
// import AutosizeInput from 'react-input-autosize';
// import DynamicFont from 'react-dynamic-font';

const InputWrapper = styled.div`
  position: relative;
  height: 100%;
`

const Input = styled.input`
  /* background: #fff; */
  /* border: 2px solid #131417; */
  box-sizing: border-box;
  /* border-radius: 12px; */
  height: 100%;
  border: none;
  outline: none;
  padding-left: 8px;
  /* padding-right: 12px; */
  /* color: ${({ theme }) => theme.white}; */
  /* padding: 20px 20px; */
  /* font-size: 24px;
  line-height: 28px;
  border-radius: 10px; */
  min-width: 0;
  width: 100%;
  text-align: right;

  font-family: 'mono-regular';

  font-weight: 700;
  font-size: 32px;
  line-height: 120%;
  /* identical to box height */
  text-align: right;
  /* Black */

  color: #000000;
`

const LogoWrapper = styled.img`
  width: 24px;
  height: 24px;
`

interface IProps {
  value: string | number
  disabled?: boolean
  hasSelect?: boolean
  selectedItem?: number
  // TODO(johnrjj) - onChange returns value: number | ''
  onChange?: (value: number | string) => void
  onChangeToken?: (token: 'ETH' | 'USDL') => void
}

const NumberInput: React.FC<IProps> = ({
  value,
  disabled,
  hasSelect,
  selectedItem,
  onChange,
  onChangeToken,
}) => {
  const [inputVal, setInputVal] = useState('0')
  const [showList, setShowList] = useState(false)

  const formatNumber = (str: string) => {
    let parts = str.split(',').join('').split('.')
    if (str.startsWith('.')) {
      parts = ['0', ...parts]
    }
    const hasFixed = parts.length > 1
    const endDot = str && str.length > 0 && str[str.length - 1] === '.'
    return hasFixed
      ? `${Number(parts[0]).toLocaleString('en-US')}.${parts[1].slice(0, 8)}`
      : `${Number(parts[0]).toLocaleString('en-US')}${endDot ? '.' : ''}`
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !onChange) {
      return
    }
    const str = event.target.value.split(',').join('')
    if (!str) {
      setInputVal('')

      // TODO(johnrjj) - onChange should fire empty string here...
      onChange('' as any)
    } else if (str === '.') {
      // HACK(johnrjj) - if user enters decimal (only) lets just append 0 to it.
      onChange('0.')
      setInputVal('0.')
    } else if (!isNaN(Number(str))) {
      onChange(str)
      // onChange(Number(str))
      setInputVal(formatNumber(str))
    }
  }

  useEffect(() => {
    setInputVal(value.toString())
    // if (value !== Number(inputVal.split(',').join(''))) {
    // }
  }, [value])

  return (
    <InputWrapper>
      <Input
        placeholder="0.00"
        value={inputVal}
        disabled={disabled}
        onChange={(e) => handleChange(e)}
        min={0}
      />

      {/* <AutosizeInput
        placeholder="0.00"
        value={inputVal}
        disabled={disabled}
        onChange={(e) => handleChange(e)}
        min={0}
/> */}
    </InputWrapper>
  )
}

export { NumberInput }

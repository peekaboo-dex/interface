import styled from 'styled-components'

export interface SpacerProps {
  size: number | undefined
  mobileSmAndBelowSize?: number | undefined
  mobileMdAndBelowSize?: number | undefined
}

const SpacerDiv = styled.div<SpacerProps>`
  height: ${(props) => props.size ?? 16}px;
  min-height: ${(props) => props.size ?? 16}px;
  ${(props) =>
    props.mobileMdAndBelowSize &&
    props.theme.mediaWidth.upToMedium`
        height: ${props.mobileMdAndBelowSize}px;
    `}
  ${(props) =>
    props.mobileSmAndBelowSize &&
    props.theme.mediaWidth.upToSmall`
      height: ${props.mobileSmAndBelowSize}px;
    `}
`

const Spacer: React.FC<{
  size: number | undefined
  mobileSmAndBelowSize?: number | undefined
  mobileMdAndBelowSize?: number | undefined
}> = (props) => {
  return <SpacerDiv {...props} />
}

const VerticalSpacer: React.FC<{ size: number | undefined }> = ({ size }) => {
  return <div style={{ width: size ?? 16 }} />
}

export { Spacer, VerticalSpacer }

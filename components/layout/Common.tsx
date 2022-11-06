import styled from 'styled-components'

export const HeaderSpace = styled.div`
  height: 140px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    height: 100px;
  `}
`

export const PageWrapper = styled.div<{ blur?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  /* to blur bg */
  transition: 0.33s filter ease-in-out;
  ${(props) =>
    props.blur &&
    `
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: inherit;
  filter: blur(6px);
  content: "";
  `}
`

export const HeroWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 1080px;
  padding: 0 32px;
  margin: 0 auto;
  margin-bottom: 120px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
    align-items: center;
    padding: 0 8px;
  `}
`

import { useCallback } from 'react'
import styled from 'styled-components'

const StyledLink = styled.a<{ showUnderline?: boolean }>`
  font-family: 'favorit-regular';
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 14px;
    line-height: 16px;
  `}
  color: ${({ theme }) => theme.lightGray};
  cursor: pointer;
  transition: color 0.15s ease;

  :hover {
    text-decoration: ${(props) => (props.showUnderline ? 'underline' : 'none')};
    color: #ffffff;
  }
`

export const ExternalLink = ({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  showUnderline = false,
  ...rest
}: Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'href'> & {
  href: string | null
  showUnderline?: boolean
}) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === '_blank' || event.ctrlKey || event.metaKey) {
      } else {
        event.preventDefault()
      }
    },
    [target],
  )
  return (
    <StyledLink
      showUnderline={showUnderline}
      target={target}
      rel={rel}
      href={href ?? undefined}
      onClick={handleClick}
      {...rest}
    />
  )
}

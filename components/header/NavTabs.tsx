import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { ROUTES } from '../../utils/route'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #16161a;

  border-radius: 40px;

  padding: 4px;

  background: rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(0, 0, 0, 0.23);
  box-shadow: inset 0px 1px 2px rgba(255, 255, 255, 0.24);
`

const ItemWrapper = styled.a<{ active?: boolean }>`
  display: block;
  font-family: 'extended-regular';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px 12px 20px;
  color: #ffffff;
  text-decoration: inherit;
  transition: color 0.15s ease-in-out;

  ${({ theme }) => theme.mediaWidth.upToMedium`
  min-width: 60px;
  `}

  :hover {
    color: #a7a7a7;
  }
  ${(props) =>
    props.active &&
    `
background: #0E0F13;
box-shadow: inset 0px 1px 2px rgba(255, 255, 255, 0.15);

color: black;

background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.32);
border-radius: 40px;

`}
`

interface NavTabsProps {
  compact?: boolean
}

const NavTabs: React.FC<NavTabsProps> = ({ compact }) => {
  const router = useRouter()

  return (
    <Wrapper>
      {/* {compact ? null : (
        <Link passHref href={ROUTES.home}>
          <ItemWrapper active={isHomePageActive}>Lemma</ItemWrapper>
        </Link>
      )} */}
    </Wrapper>
  )
}

export { NavTabs }

import styled from 'styled-components'

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: top;
  background: #092432;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  width: 12%;
  text-align: left;
  padding: 0rem 2rem 0rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  border-right: 4px solid #dc5f70;
  z-index: 4;
  @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }

  a {
    font-weight: bold;
    letter-spacing: 0.1rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`

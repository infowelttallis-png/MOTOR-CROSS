// components/layout/Footer.js
import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

const FooterWrapper = styled.footer`
  background: ${theme.colors.background};
  color: #ffffff;
  padding: 80px 0 40px;
  border-top: 1px solid ${theme.colors.border};
`;

const FooterMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLogo = styled.h2`
  font-family: ${theme.fonts.main};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin-bottom: 5px;
  line-height: 1;

  span {
    color: ${theme.colors.primary};
  }
`;

const Tagline = styled.p`
  color: ${theme.colors.gray};
  font-size: 0.7rem;
  letter-spacing: 8px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 40px;
  padding-left: 8px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none !important;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.5;
  transition: ${theme.racing.transition};

  &:hover {
    opacity: 1;
    color: ${theme.colors.primary};
  }
`;

const BottomBar = styled.div`
  width: 100%;
  padding-top: 40px;
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  p {
    color: rgba(255, 255, 255, 0.2);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
  }
`;

const DevCredit = styled.a`
  color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  span {
    font-weight: 900;
    color: rgba(255, 255, 255, 0.4);
    transition: 0.3s;
  }

  &:hover span {
    color: ${theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterMain>
          <FooterLogo>
            MX<span> KENYA</span>
          </FooterLogo>
          <Tagline>Fearless • Fast • Kenyan</Tagline>

          <BottomBar>
            <p>
              &copy; {new Date().getFullYear()} MXKENYA. ALL RIGHTS RESERVED.
            </p>
            <DevCredit
              href="https://weltallis.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Developed by <span>WELT TALLIS</span>
            </DevCredit>
          </BottomBar>
        </FooterMain>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

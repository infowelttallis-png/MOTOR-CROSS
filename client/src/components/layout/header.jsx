// components/layout/Header.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

const SpeedBadge = () => (
  <svg
    width="42"
    height="32"
    viewBox="0 0 42 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: "12px" }}
  >
    {/* Clean Racing Slants */}
    <rect
      x="0"
      y="22"
      width="12"
      height="10"
      fill={theme.colors.primary}
      transform="skewX(-25)"
    />
    <rect
      x="14"
      y="12"
      width="12"
      height="20"
      fill="white"
      transform="skewX(-25)"
    />
    <rect
      x="28"
      y="0"
      width="12"
      height="32"
      fill={theme.colors.primary}
      transform="skewX(-25)"
    />
  </svg>
);

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  background: transparent;
  padding: ${({ $scrolled }) => ($scrolled ? "12px 0" : "40px 0")};
  transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
  pointer-events: none;

  /* Only shows background/blur when the user actually scrolls */
  ${({ $scrolled }) =>
    $scrolled &&
    `
    background: rgba(2, 6, 23, 0.9);
    backdrop-filter: blur(10px);
    pointer-events: auto;
  `}
`;

const NavContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  pointer-events: auto;
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none !important;

  &:hover {
    .badge {
      transform: scale(1.05);
    }
  }
`;

const BadgeWrapper = styled.div`
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 2.4rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: -2px;
  line-height: 1;

  span {
    color: ${theme.colors.primary};
  }

  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledHeader $scrolled={scrolled}>
      <Container>
        <NavContent>
          <Brand href="/">
            <BadgeWrapper className="badge">
              <SpeedBadge />
            </BadgeWrapper>
            <LogoText>
              MX<span> KENYA</span>
            </LogoText>
          </Brand>
        </NavContent>
      </Container>
    </StyledHeader>
  );
};

export default Header;

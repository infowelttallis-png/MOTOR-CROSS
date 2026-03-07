import React from "react";
import styled, { keyframes } from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";
import SponsorSection from "../sections/sponsorSection";

const CTAWrapper = styled.section`
  padding: 100px 0 80px;
  position: relative;
  overflow: hidden;
  background: #000;

  &::before {
    content: "MOTOCROSS KENYA";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12vw;
    font-weight: 900;
    color: rgba(255, 102, 0, 0.02);
    pointer-events: none;
    letter-spacing: -2px;
    z-index: 1;
    white-space: nowrap;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1200px !important;
  position: relative;
  z-index: 2;
`;

const TitleBox = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h2 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 950;
    text-transform: uppercase;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 20px;
    letter-spacing: -1px;

    span {
      color: ${theme.colors.primary};
      display: block;
      font-style: italic;
      transform: skewX(-5deg);
    }
  }

  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 6px;
    font-weight: 700;
  }
`;

const CTASection = () => {
  return (
    <>
      <CTAWrapper>
        <StyledContainer>
          <TitleBox>
            <h2>
              PREMIUM <span>PARTNERS</span>
            </h2>
            <p>2026 SEASON • KENYA MOTOCROSS CHAMPIONSHIP</p>
          </TitleBox>
        </StyledContainer>
      </CTAWrapper>
      <SponsorSection />
    </>
  );
};

export default CTASection;

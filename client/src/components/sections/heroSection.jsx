import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
  100% { opacity: 1; transform: scale(1); }
`;

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  min-height: 650px;
  display: flex;
  align-items: center;
  background: ${theme.colors.background};
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/hero.jpg");
    background-size: cover;
    background-position: center;
    z-index: 0;
    opacity: 0.45;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${theme.gradients.overlay};
    z-index: 1;
  }
`;

const Content = styled(Container)`
  position: relative;
  z-index: 2;
  padding-left: ${theme.padding.md};
`;

const Title = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 950;
  color: #fff;
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin-bottom: 18px;

  span {
    display: block;
    color: ${theme.colors.primary};
    font-style: italic;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 440px;
  line-height: 1.6;
  margin-bottom: 30px;
  border-left: 2px solid ${theme.colors.primary};
  padding-left: 18px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.$primary ? theme.colors.primary : "transparent"};
  color: ${(props) => (props.$primary ? theme.colors.secondary : "#fff")};
  border: ${(props) =>
    props.$primary ? "none" : "1px solid rgba(255,255,255,0.2)"};

  /* Lean & Precision Sizing */
  padding: 10px 22px;
  font-weight: 800;
  font-size: 0.75rem;

  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0% 100%);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;

  .dot {
    width: 6px;
    height: 6px;
    background: #ff0000;
    border-radius: 50%;
    animation: ${pulse} 1.5s infinite;
  }

  &:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
    transform: translateY(-2px);
    clip-path: polygon(
      0% 0,
      92% 0,
      100% 100%,
      8% 100%
    ); /* Inverts slant on hover */
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 45px;
  margin-top: 45px;
`;

const StatItem = styled.div`
  .number {
    font-family: ${theme.fonts.display};
    font-size: 1.8rem;
    font-weight: 900;
    color: #fff;
    line-height: 1;
  }
  .label {
    font-size: 0.6rem;
    color: ${theme.colors.primary};
    font-weight: 800;
    letter-spacing: 1.5px;
    margin-top: 4px;
    text-transform: uppercase;
    opacity: 0.9;
  }
`;

const HeroSection = memo(() => {
  const navigate = useNavigate();

  return (
    <HeroWrapper id="home">
      <Content>
        <Title>
          EXPERIENCE <span>THE THRILL</span>
        </Title>

        <Description>
          The heart of Kenyan Motocross. High-octane racing, elite athletes, and
          an unmatched racing community.
        </Description>

        <ButtonRow>
          <ActionButton $primary onClick={() => navigate("/tickets")}>
            Get Tickets
          </ActionButton>
          <ActionButton onClick={() => navigate("/results")}>
            <div className="dot" />
            Live Results
          </ActionButton>
        </ButtonRow>

        <StatsRow>
          <StatItem>
            <div className="number">50+</div>
            <div className="label">Pro Riders</div>
          </StatItem>
          <StatItem>
            <div className="number">12</div>
            <div className="label">Annual Events</div>
          </StatItem>
        </StatsRow>
      </Content>
    </HeroWrapper>
  );
});

export default HeroSection;

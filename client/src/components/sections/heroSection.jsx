// components/sections/heroSection.js
import React, { memo } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import styled, { keyframes } from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.3); }
  100% { opacity: 1; transform: scale(1); }
`;

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  min-height: 750px;
  display: flex;
  align-items: center;
  background: #020617 url("/hero.jpg") center/cover no-repeat;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      75deg,
      #020617 0%,
      rgba(2, 6, 23, 0.85) 45%,
      transparent 100%
    );
    z-index: 1;
  }
`;

const Content = styled(Container)`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding-top: 80px;
`;

const Badge = styled.div`
  display: inline-block;
  background: ${theme.colors.primary};
  color: #000;
  padding: 6px 20px;
  font-weight: 950;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-bottom: 20px;
  clip-path: ${theme.racing.slantSmall};
`;

const Title = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: clamp(2.5rem, 7vw, 4.8rem);
  font-weight: 900;
  color: #fff;
  line-height: 0.9;
  margin-bottom: 20px;
  text-transform: uppercase;

  span {
    display: block;
    color: ${theme.colors.primary};
    font-style: italic;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 480px;
  border-left: 3px solid ${theme.colors.primary};
  padding-left: 20px;
  margin-bottom: 35px;
  line-height: 1.5;
`;

const ActionButton = styled.button`
  background: ${(props) => (props.$primary ? theme.colors.primary : "#fff")};
  color: #000;
  border: none;
  padding: 12px 28px;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  clip-path: ${theme.racing.slantSmall};
  transition: 0.3s all ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;

  .dot {
    width: 8px;
    height: 8px;
    background: #ff0000;
    border-radius: 50%;
    animation: ${pulse} 1.5s infinite;
    box-shadow: 0 0 8px #ff0000;
    display: ${(props) => (props.$live ? "block" : "none")};
  }

  &:hover {
    transform: translateY(-3px);
    background: ${(props) => (props.$primary ? "#fff" : theme.colors.primary)};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Memoized component with navigation
const HeroSection = memo(() => {
  const navigate = useNavigate();

  const handleResultsClick = () => {
    navigate("/results");
  };

  return (
    <HeroWrapper id="home">
      <Content>
        <Badge>Jamhuri Showgrounds</Badge>
        <Title>
          EXPERIENCE <span>THE THRILL</span>
        </Title>
        <Description>
          Bringing together riders, fans, and the motocross community across
          Kenya. Feel the speed, the dust, and the passion of the sport.
        </Description>

        <ButtonRow>
          <ActionButton $primary onClick={handleResultsClick} $live>
            <div className="dot" />
            Live Results
          </ActionButton>
          <ActionButton>8Am - 4pm </ActionButton>
        </ButtonRow>
      </Content>
    </HeroWrapper>
  );
});

export default HeroSection;

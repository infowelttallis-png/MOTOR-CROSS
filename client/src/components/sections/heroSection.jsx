// components/sections/heroSection.js
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

// Define all keyframes at the top
const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.3); }
  100% { opacity: 1; transform: scale(1); }
`;

const dustExplosion = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0);
  }
  25% {
    opacity: 0.8;
    transform: translate(var(--x), var(--y)) scale(1);
  }
  50% {
    opacity: 0.4;
    transform: translate(calc(var(--x) * 2), calc(var(--y) * 2)) scale(1.5);
  }
  100% {
    opacity: 0;
    transform: translate(calc(var(--x) * 3), calc(var(--y) * 3)) scale(0);
  }
`;

const engineRev = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.02); }
  50% { transform: scale(0.98); }
  75% { transform: scale(1.01); }
  100% { transform: scale(1); }
`;

const throttleBlip = keyframes`
  0%, 100% { opacity: 0.3; filter: blur(2px); }
  50% { opacity: 1; filter: blur(4px); }
`;

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  min-height: 750px;
  display: flex;
  align-items: center;
  background: #020617 url("/hero.jpg") center/cover no-repeat;
  overflow: hidden;
  animation: ${engineRev} 3s infinite ease-in-out;

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

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      transparent 0%,
      rgba(255, 100, 0, 0.1) 100%
    );
    z-index: 1;
    pointer-events: none;
    animation: ${throttleBlip} 2s infinite;
  }
`;

const DustParticle = styled.div`
  position: absolute;
  width: ${(props) => props.size || "4px"};
  height: ${(props) => props.size || "4px"};
  background: ${(props) => props.color || "#8B7355"};
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  filter: blur(1px);
  animation: ${dustExplosion} ${(props) => props.duration || "2s"} infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  left: ${(props) => props.left || "50%"};
  top: ${(props) => props.top || "50%"};
  --x: ${(props) => props.x || "100px"};
  --y: ${(props) => props.y || "-50px"};
  box-shadow: 0 0 10px rgba(255, 140, 0, 0.5);
`;

const Content = styled(Container)`
  position: relative;
  z-index: 3;
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
  position: relative;
  overflow: hidden;

  .dot {
    width: 8px;
    height: 8px;
    background: #ff0000;
    border-radius: 50%;
    animation: ${pulse} 1.5s infinite;
    box-shadow: 0 0 8px #ff0000;
    display: ${(props) => (props.$live ? "block" : "none")};
  }

  .flame {
    display: ${(props) => (props.$primary ? "inline-block" : "none")};
    margin-left: 5px;
    font-size: 1rem;
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

// Generate random dust particles
const generateDustParticles = (count) => {
  const particles = [];
  const colors = [
    "#8B7355",
    "#A0522D",
    "#CD853F",
    "#8B4513",
    "#D2691E",
    "#FF8C00",
  ];

  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: `${Math.random() * 8 + 2}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: `${Math.random() * 3 + 1.5}s`,
      delay: `${Math.random() * 2}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: `${Math.random() * 200 - 100}px`,
      y: `${Math.random() * 200 - 100}px`,
    });
  }
  return particles;
};

// Memoized component with navigation
const HeroSection = memo(() => {
  const navigate = useNavigate();
  const particles = generateDustParticles(25);

  const handleResultsClick = () => {
    navigate("/results");
  };

  const handleTicketClick = () => {
    navigate("/tickets");
  };

  return (
    <HeroWrapper id="home">
      {/* Dust Particle Explosion Effect - Keep the moving background animations */}
      {particles.map((particle) => (
        <DustParticle
          key={particle.id}
          size={particle.size}
          color={particle.color}
          duration={particle.duration}
          delay={particle.delay}
          left={particle.left}
          top={particle.top}
          x={particle.x}
          y={particle.y}
        />
      ))}

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
            <span className="flame">🔥</span>
          </ActionButton>
          <ActionButton onClick={handleTicketClick}>8AM - 4PM</ActionButton>
        </ButtonRow>
      </Content>
    </HeroWrapper>
  );
});

export default HeroSection;

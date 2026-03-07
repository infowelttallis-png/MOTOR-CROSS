// components/sections/heroSection.js
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

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

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  min-height: 750px;
  display: flex;
  align-items: center;
  background: #020617;
  overflow: hidden;

  /* Background image */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/hero.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;

    @media (max-width: 768px) {
      background-position: 65% center;
      opacity: 0.9;
    }
  }

  /* Gradient overlay */
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
`;

const Content = styled(Container)`
  position: relative;
  z-index: 3;
  max-width: 800px;
  padding-top: 80px;

  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
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

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
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
  margin-bottom: 40px;

  @media (max-width: 480px) {
    gap: 8px;
    width: 100%;
  }
`;

// ===== UPGRADED STATS SECTION (only this changed) =====
const StatsRow = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  margin-top: 30px;
  position: relative;

  @media (max-width: 768px) {
    gap: 30px;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    padding: 20px 25px;
    border-radius: 8px;
    width: 100%;
  }
`;

const StatItem = styled.div`
  text-align: left;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 3px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }

  .number {
    font-size: 2.2rem;
    font-weight: 900;
    color: #fff;
    line-height: 1;
    margin-bottom: 5px;
    font-family: "Orbitron", sans-serif;
  }

  .number span {
    color: ${theme.colors.primary};
    font-size: 1.3rem;
    margin-left: 3px;
  }

  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1.5px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    text-align: center;

    &::after {
      left: 50%;
      transform: translateX(-50%);
      width: 25px;
    }

    .number {
      font-size: 1.8rem;
    }

    .label {
      font-size: 0.7rem;
    }
  }
`;
// ===== END OF UPGRADED STATS =====

// Generate dust particles
const generateDustParticles = (count) => {
  const particles = [];
  const colors = ["#8B7355", "#A0522D", "#CD853F", "#8B4513", "#D2691E"];

  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: `${Math.random() * 8 + 2}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 2}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: `${Math.random() * 200 - 100}px`,
      y: `${Math.random() * 200 - 100}px`,
    });
  }
  return particles;
};

const HeroSection = memo(() => {
  const navigate = useNavigate();
  const particles = generateDustParticles(20);

  const handleResultsClick = () => {
    navigate("/results");
  };

  const handleTicketsClick = () => {
    navigate("/tickets");
  };

  return (
    <HeroWrapper id="home">
      {/* Soil splash particles only */}
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
        <Badge>Jamhuri Showgrounds • Nairobi</Badge>

        <Title>
          EXPERIENCE <span>THE THRILL</span>
        </Title>

        <Description>
          Bringing together riders, fans, and the motocross community across
          Kenya. Feel the speed, the dust, and the passion of the sport.
        </Description>

        <ButtonRow>
          <ActionButton $primary onClick={handleTicketsClick}>
            GET TICKETS
          </ActionButton>
          <ActionButton onClick={handleResultsClick} $live>
            <div className="dot" />
            LIVE RESULTS
          </ActionButton>
        </ButtonRow>

        <StatsRow>
          <StatItem>
            <div className="number">
              50<span>+</span>
            </div>
            <div className="label">RIDERS</div>
          </StatItem>
          <StatItem>
            <div className="number">8</div>
            <div className="label">RACES</div>
          </StatItem>
          <StatItem>
            <div className="number">
              10K<span>+</span>
            </div>
            <div className="label">FANS</div>
          </StatItem>
        </StatsRow>
      </Content>
    </HeroWrapper>
  );
});

export default HeroSection;

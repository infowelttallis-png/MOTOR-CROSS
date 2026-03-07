// components/pages/NotFound.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const dustPuff = keyframes`
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 0.5; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(0); }
`;

const NotFoundWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #020617;
  position: relative;
  overflow: hidden;
  padding: 100px 0;

  &::before {
    content: "MOTOCROSS KENYA";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10vw;
    font-weight: 900;
    color: rgba(255, 102, 0, 0.02);
    pointer-events: none;
    letter-spacing: -2px;
    z-index: 1;
    white-space: nowrap;
  }
`;

const Content = styled(Container)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
`;

const BikeIcon = styled.div`
  font-size: 8rem;
  line-height: 1;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
  display: inline-block;
  filter: drop-shadow(0 0 20px ${theme.colors.primary}40);
`;

const DustParticles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`;

const Dust = styled.div`
  position: absolute;
  width: ${(props) => props.size || "10px"};
  height: ${(props) => props.size || "10px"};
  background: ${theme.colors.primary}20;
  border-radius: 50%;
  left: ${(props) => props.left || "50%"};
  top: ${(props) => props.top || "50%"};
  animation: ${dustPuff} ${(props) => props.duration || "3s"} infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const ErrorCode = styled.h1`
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 950;
  color: #fff;
  line-height: 1;
  margin: 0;
  text-shadow: 4px 4px 0 ${theme.colors.primary};
  letter-spacing: -5px;

  span {
    color: ${theme.colors.primary};
    text-shadow: 4px 4px 0 #fff;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  margin: 20px 0 15px;

  span {
    color: ${theme.colors.primary};
    font-style: italic;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 500px;
  margin: 0 auto 35px;
  line-height: 1.7;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  padding: 16px 40px;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
  transition: 0.3s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 0.9rem;
  letter-spacing: 2px;
  display: inline-block;

  &:hover {
    background: #fff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 30px -5px ${theme.colors.primary};
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 14px 35px;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
  transition: 0.3s all ease;
  font-size: 0.9rem;
  letter-spacing: 2px;
  display: inline-block;

  &:hover {
    border-color: ${theme.colors.primary};
    background: rgba(255, 102, 0, 0.1);
    transform: translateY(-3px);
  }
`;

const generateDust = () => {
  const particles = [];
  for (let i = 0; i < 15; i++) {
    particles.push({
      id: i,
      size: `${Math.random() * 30 + 10}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 2}s`,
    });
  }
  return particles;
};

const NotFound = () => {
  const dustParticles = generateDust();

  return (
    <NotFoundWrapper>
      <DustParticles>
        {dustParticles.map((dust) => (
          <Dust
            key={dust.id}
            size={dust.size}
            left={dust.left}
            top={dust.top}
            duration={dust.duration}
            delay={dust.delay}
          />
        ))}
      </DustParticles>

      <Content>
        <BikeIcon>🏍️</BikeIcon>
        <ErrorCode>
          4<span>0</span>4
        </ErrorCode>
        <Title>
          TRACK <span>NOT FOUND</span>
        </Title>
        <Description>
          Looks like you've taken a wrong turn. This path doesn't exist on our
          track. Let's get you back to the main line.
        </Description>
        <ButtonGroup>
          <PrimaryButton to="/">BACK TO HOME</PrimaryButton>
          <SecondaryButton to="/events">VIEW RACES</SecondaryButton>
        </ButtonGroup>
      </Content>
    </NotFoundWrapper>
  );
};

export default NotFound;

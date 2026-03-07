import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { theme } from "../../styles/theme";
import { stats } from "../../components/dummydata";

const CTAWrapper = styled.section`
  background: #050505;
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "VELOCITY";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 15vw;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.02);
    pointer-events: none;
    letter-spacing: -5px;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 20% 50%,
      rgba(255, 102, 0, 0.03) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1100px !important;
  position: relative;
  z-index: 2;
`;

const ContentBox = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 950;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
  margin-bottom: 15px;
  letter-spacing: -2px;

  span {
    color: ${theme.colors.primary};
    display: inline-block;
    transform: skewX(-10deg);
    text-shadow: 0 0 30px rgba(255, 102, 0, 0.3);
  }
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;
`;

const StatCard = styled.div`
  background: #0a0a0a;
  border-left: 4px solid ${theme.colors.primary};
  padding: 30px 20px;
  transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 30px 30px 0;
    border-color: transparent ${theme.colors.primary} transparent transparent;
    opacity: 0.3;
    transition: 0.3s;
  }

  &:hover {
    transform: translateY(-8px) skewX(-2deg);
    background: #111;
    border-left: 4px solid #fff;

    &::before {
      border-color: transparent #fff transparent transparent;
      opacity: 0.5;
    }

    h3 {
      color: #fff;
    }
  }

  h3 {
    font-size: 3rem;
    font-weight: 900;
    color: ${theme.colors.primary};
    margin: 0;
    line-height: 1;
    font-family: "Orbitron", sans-serif;
    transition: 0.3s;
  }

  p {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 8px;
    font-weight: 800;
  }

  @media (max-width: 768px) {
    padding: 20px;
    h3 {
      font-size: 2.5rem;
    }
  }
`;

const RaceTrack = styled.div`
  margin-top: 60px;
  padding: 30px;
  background: rgba(255, 102, 0, 0.03);
  border: 1px solid rgba(255, 102, 0, 0.1);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

const TrackLine = styled.div`
  height: 4px;
  background: linear-gradient(
    90deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.primary} 20%,
    #fff 20%,
    #fff 40%,
    ${theme.colors.primary} 40%,
    ${theme.colors.primary} 60%,
    #fff 60%,
    #fff 80%,
    ${theme.colors.primary} 80%,
    ${theme.colors.primary} 100%
  );
  background-size: 200% 100%;
  animation: raceTrack 20s linear infinite;
  margin-bottom: 20px;

  @keyframes raceTrack {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const RaceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;

  .date {
    font-size: 1.2rem;
    font-weight: 900;
    color: ${theme.colors.primary};
    span {
      color: #fff;
      font-size: 0.8rem;
      margin-left: 10px;
      font-weight: 400;
      opacity: 0.5;
    }
  }

  .location {
    font-size: 1rem;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: "📍";
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const NextRaceBadge = styled.div`
  display: inline-block;
  background: ${theme.colors.primary};
  color: #000;
  padding: 8px 25px;
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
`;

const RiderQuotes = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuoteCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 20px;
  border-left: 2px solid ${theme.colors.primary};
  flex: 1;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 102, 0, 0.05);
    transform: translateX(5px);
  }

  .quote {
    color: #fff;
    font-style: italic;
    font-size: 0.9rem;
    margin-bottom: 10px;
    opacity: 0.9;
  }

  .rider {
    color: ${theme.colors.primary};
    font-weight: 900;
    font-size: 0.8rem;
    text-transform: uppercase;
  }
`;

const CTASection = () => {
  return (
    <CTAWrapper>
      <StyledContainer>
        <ContentBox>
          <Title>
            Ready to <span>Race?</span>
          </Title>
          <Subtitle>The Grid is waiting</Subtitle>
        </ContentBox>

        <Row className="g-3 justify-content-center">
          {stats.map((stat, index) => (
            <Col key={index} xs={6} md={6} lg={3}>
              <StatCard>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </StatCard>
            </Col>
          ))}
        </Row>

        {/* Next Race Info - Replaces Register Button */}
        <RaceTrack>
          <NextRaceBadge>NEXT RACE</NextRaceBadge>
          <TrackLine />
          <RaceInfo>
            <div className="date">
              28 <span>MARCH 2026</span>
            </div>
            <div className="location">Jamhuri Showgrounds, Nairobi</div>
          </RaceInfo>
        </RaceTrack>

        {/* Rider Quotes Section */}
        <RiderQuotes>
          <QuoteCard>
            <div className="quote">"The track's looking fast this season"</div>
            <div className="rider">— E. KIMANI • #1</div>
          </QuoteCard>
          <QuoteCard>
            <div className="quote">"Ready to defend the title"</div>
            <div className="rider">— L. KWAMBAI • #7</div>
          </QuoteCard>
        </RiderQuotes>
      </StyledContainer>
    </CTAWrapper>
  );
};

export default CTASection;

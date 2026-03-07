import React from "react";
import styled, { keyframes } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { theme } from "../../styles/theme";

const pulse = keyframes`
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.5; transform: scale(1); }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const CTAWrapper = styled.section`
  padding: 80px 0;
  position: relative;
  overflow: hidden;

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
  max-width: 1100px !important;
  position: relative;
  z-index: 2;
`;

const ContentBox = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 950;
  text-transform: uppercase;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 15px;
  letter-spacing: -1px;

  span {
    color: ${theme.colors.primary};
    display: inline-block;
    transform: skewX(-5deg);
    text-shadow: 0 0 20px rgba(255, 102, 0, 0.3);
  }
`;

const Subtitle = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 4px;
`;

// SVG Icons
const FreeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      fill={theme.colors.primary}
    />
  </svg>
);

const MentorIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-1 .05 1.16.84 2 1.87 2 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
      fill={theme.colors.primary}
    />
  </svg>
);

const GearIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94 0 .31.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
      fill={theme.colors.primary}
    />
  </svg>
);

const AllAgesIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 2c-1.66 0-5 1.34-5 4v2h10v-2c0-2.66-3.34-4-5-4z"
      fill={theme.colors.primary}
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={theme.colors.primary}
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const VolunteerIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={theme.colors.primary}
      fillOpacity="0.9"
    />
  </svg>
);

const SponsorIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      fill={theme.colors.primary}
    />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      fill={theme.colors.primary}
      fillOpacity="0.3"
    />
  </svg>
);

const AcademySection = styled.div`
  padding: 30px;
  margin-bottom: 40px;
  border-radius: 8px;
`;

const AcademyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  .badge {
    background: ${theme.colors.primary};
    color: #000;
    padding: 4px 15px;
    font-weight: 900;
    font-size: 0.7rem;
    text-transform: uppercase;
    clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
  }

  h3 {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 900;
    margin: 0;

    span {
      color: ${theme.colors.primary};
      margin-left: 5px;
    }
  }
`;

const AcademyGrid = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeaturesRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  flex: 2;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 102, 0, 0.05);
  padding: 8px 15px;
  border-radius: 30px;
  border: 1px solid rgba(255, 102, 0, 0.2);

  span {
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const CommunityStat = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  border-left: 3px solid ${theme.colors.primary};

  .stat-number {
    font-size: 1.8rem;
    font-weight: 900;
    color: ${theme.colors.primary};
    line-height: 1;
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.7rem;
    text-transform: uppercase;
  }
`;

const InfoCardsRow = styled(Row)`
  margin-bottom: 40px;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 25px 20px;
  border: 1px solid rgba(255, 102, 0, 0.1);
  transition: 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    background: rgba(255, 102, 0, 0.05);
    border-color: ${theme.colors.primary};
    transform: translateY(-3px);
  }

  h4 {
    color: #fff;
    font-size: 1rem;
    font-weight: 900;
    margin: 15px 0 8px;
    text-transform: uppercase;
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const TestimonialsWrapper = styled.div`
  margin-top: 50px;
  overflow: hidden;
  padding: 20px 0;
`;

const TestimonialsTrack = styled.div`
  display: flex;
  gap: 20px;
  animation: ${scroll} 45s linear infinite;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }
`;

const TestimonialCard = styled.div`
  background: #0a0a0a;
  padding: 25px;
  width: 320px;
  border-left: 3px solid ${theme.colors.primary};
  flex-shrink: 0;

  .quote {
    color: #fff;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 15px;
    font-style: italic;
  }

  .client-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 35px;
    height: 35px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    color: #000;
    font-size: 0.9rem;
  }

  .name {
    color: #fff;
    font-weight: 900;
    font-size: 0.9rem;
  }

  .title {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.65rem;
    text-transform: uppercase;
  }
`;

const TestimonialsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h3 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;

    span {
      color: ${theme.colors.primary};
    }
  }

  .rating-badge {
    background: rgba(255, 102, 0, 0.1);
    padding: 5px 12px;
    border-left: 2px solid ${theme.colors.primary};
    font-size: 0.8rem;

    .stars {
      color: #ffd700;
      margin-right: 5px;
    }
    .score {
      color: #fff;
      font-weight: 900;
    }
  }
`;

const JoinLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: 900;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    gap: 10px;
    color: #fff;
  }
`;

const testimonials = [
  {
    id: 1,
    quote:
      "The most electrifying event in East Africa! Been attending since 2019.",
    name: "Sarah Mwangi",
    title: "Racing Fan",
    initial: "SM",
  },
  {
    id: 2,
    quote: "Best track conditions I've ever ridden on. The crowd is insane!",
    name: "David Omondi",
    title: "MX2 Rider",
    initial: "DO",
  },
  {
    id: 3,
    quote:
      "Brought my whole family last year. The kids are still talking about it!",
    name: "James Kariuki",
    title: "Season Ticket Holder",
    initial: "JK",
  },
  {
    id: 4,
    quote: "Production quality rivals international championships.",
    name: "Wanjiku Ngugi",
    title: "Red Bull Kenya",
    initial: "WN",
  },
  {
    id: 5,
    quote: "This is where Kenya's next motocross stars are born.",
    name: "Michael Otieno",
    title: "Former Champion",
    initial: "MO",
  },
  {
    id: 6,
    quote:
      "VIP experience was worth every shilling. Already booking for next year!",
    name: "Lucy Wambui",
    title: "Corporate Client",
    initial: "LW",
  },
];

const CTASection = () => {
  return (
    <CTAWrapper>
      <StyledContainer>
        <ContentBox>
          <Title>
            RIDE WITH <span>THE FAMILY</span>
          </Title>
          <Subtitle>Kenya's Motocross Community</Subtitle>
        </ContentBox>

        {/* Compact Moto Academy */}
        <AcademySection>
          <AcademyHeader>
            <div className="badge">FREE • ALWAYS OPEN</div>
            <h3>
              MOTO ACADEMY <span>🏍️</span>
            </h3>
          </AcademyHeader>

          <AcademyGrid>
            <FeaturesRow>
              <FeatureItem>
                <FreeIcon />
                <span>Free for all</span>
              </FeatureItem>
              <FeatureItem>
                <MentorIcon />
                <span>Pro mentors</span>
              </FeatureItem>
              <FeatureItem>
                <GearIcon />
                <span>Borrow gear</span>
              </FeatureItem>
              <FeatureItem>
                <AllAgesIcon />
                <span>All ages</span>
              </FeatureItem>
            </FeaturesRow>

            <CommunityStat>
              <div className="stat-number">47</div>
              <div className="stat-label">RIDERS THIS WEEK</div>
              <JoinLink>→ Join the ride</JoinLink>
            </CommunityStat>
          </AcademyGrid>
        </AcademySection>

        {/* Info Cards - 2 columns */}
        <InfoCardsRow>
          <Col xs={12} md={6}>
            <InfoCard>
              <VolunteerIcon />
              <h4>RACE DAY VOLUNTEERS</h4>
              <p>Free merch • Behind the scenes • Track crew • Events team</p>
            </InfoCard>
          </Col>
          <Col xs={12} md={6}>
            <InfoCard>
              <SponsorIcon />
              <h4>SPONSOR A YOUNG RIDER</h4>
              <p>Help the next generation • Gear donations • Mentorship</p>
            </InfoCard>
          </Col>
        </InfoCardsRow>

        {/* Testimonials */}
        <TestimonialsWrapper>
          <TestimonialsHeader>
            <h3>
              WHAT <span>FANS SAY</span>
            </h3>
            <div className="rating-badge">
              <span className="stars">★★★★★</span>
              <span className="score">4.9</span>
            </div>
          </TestimonialsHeader>
          <TestimonialsTrack>
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`${t.id}-${i}`}>
                <div className="quote">"{t.quote}"</div>
                <div className="client-info">
                  <div className="avatar">{t.initial}</div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="title">{t.title}</div>
                  </div>
                </div>
              </TestimonialCard>
            ))}
          </TestimonialsTrack>
        </TestimonialsWrapper>
      </StyledContainer>
    </CTAWrapper>
  );
};

export default CTASection;

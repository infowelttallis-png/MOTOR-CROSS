import React from "react";
import styled, { keyframes } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { theme } from "../../styles/theme";
import SponsorSection from "../sections/sponsorSection";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const CTAWrapper = styled.section`
  padding: 80px 0 0;
  position: relative;
  overflow: hidden;
`;

const StyledContainer = styled(Container)`
  max-width: 1200px !important;
  position: relative;
  z-index: 2;
`;

const TitleBox = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 950;
    text-transform: uppercase;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 15px;

    span {
      color: ${theme.colors.primary};
      display: block;
      font-style: italic;
    }
  }

  p {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 4px;
  }
`;

const TestimonialsWrapper = styled.div`
  margin-bottom: 60px;
  overflow: hidden;
  padding: 20px 0;
`;

const TestimonialsTrack = styled.div`
  display: flex;
  gap: 25px;
  animation: ${scroll} 45s linear infinite;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }
`;

const TestimonialCard = styled.div`
  background: #0a0a0a;
  padding: 30px;
  width: 350px;
  border-left: 4px solid ${theme.colors.primary};
  flex-shrink: 0;
  transition: 0.3s;

  &:hover {
    background: #111;
    transform: translateY(-5px);
  }

  .quote {
    color: #fff;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 20px;
    font-style: italic;
  }

  .client-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 45px;
    height: 45px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    color: #000;
    font-size: 1.1rem;
  }

  .name {
    color: #fff;
    font-weight: 900;
    font-size: 1rem;
    margin-bottom: 3px;
  }

  .title {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  .rating {
    color: #ffd700;
    font-size: 0.8rem;
    margin-top: 5px;
  }
`;

const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 102, 0, 0.1);
  padding: 8px 20px;
  border-left: 3px solid ${theme.colors.primary};
  margin: 0 auto 40px;
  width: fit-content;

  .stars {
    color: #ffd700;
    font-size: 1rem;
    letter-spacing: 2px;
  }

  .score {
    color: #fff;
    font-weight: 900;
    font-size: 0.9rem;
  }

  .total {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
  }
`;

const testimonials = [
  {
    id: 1,
    quote:
      "The most electrifying event in East Africa! Been attending since 2019 and it gets better every year.",
    name: "Sarah Mwangi",
    title: "Racing Fan",
    rating: "★★★★★",
    initial: "SM",
  },
  {
    id: 2,
    quote:
      "Best track conditions I've ever ridden on. The Kenyan crowd is absolutely insane!",
    name: "David Omondi",
    title: "MX2 Rider",
    rating: "★★★★★",
    initial: "DO",
  },
  {
    id: 3,
    quote:
      "Brought my whole family last year. The kids are still talking about it! Great atmosphere.",
    name: "James Kariuki",
    title: "Season Ticket Holder",
    rating: "★★★★★",
    initial: "JK",
  },
  {
    id: 4,
    quote:
      "Production quality rivals international championships. Proud to be a sponsor.",
    name: "Wanjiku Ngugi",
    title: "Red Bull Kenya",
    rating: "★★★★★",
    initial: "WN",
  },
  {
    id: 5,
    quote:
      "This is where Kenya's next motocross stars are born. Can't wait for 2026!",
    name: "Michael Otieno",
    title: "Former Champion",
    rating: "★★★★★",
    initial: "MO",
  },
  {
    id: 6,
    quote:
      "VIP experience was worth every shilling. Already booking for next year!",
    name: "Lucy Wambui",
    title: "Corporate Client",
    rating: "★★★★★",
    initial: "LW",
  },
];

const CTASection = () => {
  return (
    <>
      <CTAWrapper>
        <StyledContainer>
          <TitleBox>
            <h2>
              WHAT <span>FANS SAY</span>
            </h2>
            <p>TRUSTED BY THOUSANDS</p>
          </TitleBox>

          <RatingBadge>
            <span className="stars">★★★★★</span>
            <span className="score">4.9</span>
            <span className="total">(500+ reviews)</span>
          </RatingBadge>

          <TestimonialsWrapper>
            <TestimonialsTrack>
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialCard key={`${t.id}-${i}`}>
                  <div className="quote">"{t.quote}"</div>
                  <div className="client-info">
                    <div className="avatar">{t.initial}</div>
                    <div>
                      <div className="name">{t.name}</div>
                      <div className="title">{t.title}</div>
                      <div className="rating">{t.rating}</div>
                    </div>
                  </div>
                </TestimonialCard>
              ))}
            </TestimonialsTrack>
          </TestimonialsWrapper>
        </StyledContainer>
      </CTAWrapper>
      <SponsorSection />
    </>
  );
};

export default CTASection;

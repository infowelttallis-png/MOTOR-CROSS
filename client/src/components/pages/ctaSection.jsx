import React from "react";
import styled, { keyframes } from "styled-components";
import { Container } from "react-bootstrap";
import SponsorSection from "../sections/sponsorSection";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const CTAWrapper = styled.section`
  padding: 80px 0 0;
  position: relative;
  overflow: hidden;
  /* Completely transparent - parent handles everything */
`;

const ContentHeader = styled.div`
  text-align: left; /* Aligned to start */
  margin-bottom: 50px;
  border-left: 4px solid ${(props) => props.theme?.colors?.primary || "#FF3E00"};
  padding-left: 25px;

  h2 {
    font-family: ${(props) => props.theme?.fonts?.display || "sans-serif"};
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 950;
    text-transform: uppercase;
    color: #fff;
    line-height: 0.85;
    margin: 0;

    span {
      color: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
      font-style: italic;
    }
  }

  p {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 6px;
    margin-top: 10px;
    font-weight: 900;
  }
`;

const TestimonialsTrack = styled.div`
  display: flex;
  gap: 60px; /* Increased gap for a cleaner, non-boxy look */
  animation: ${scroll} 50s linear infinite;
  width: fit-content;
  padding: 40px 0;

  &:hover {
    animation-play-state: paused;
  }
`;

const TestimonialItem = styled.div`
  background: none; /* Removed all card backgrounds */
  width: 380px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .quote {
    color: #fff;
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 25px;
    font-weight: 600;
    position: relative;

    /* Subtle quote mark for "Advanced" look */
    &::before {
      content: '"';
      position: absolute;
      top: -20px;
      left: -10px;
      font-size: 3rem;
      color: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
      opacity: 0.3;
      font-family: serif;
    }
  }

  .client-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .avatar-label {
    font-size: 0.75rem;
    font-weight: 950;
    color: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 2px solid
      ${(props) => props.theme?.colors?.primary || "#FF3E00"};
  }

  .name {
    color: #fff;
    font-weight: 900;
    font-size: 0.85rem;
    text-transform: uppercase;
    margin: 0;
  }

  .title {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.6rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const RatingSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
  color: #fff;
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;

  .stars {
    color: #ffd700;
  }
`;

const testimonials = [
  {
    id: 1,
    quote:
      "The most electrifying event in East Africa! It gets better every year.",
    name: "Sarah Mwangi",
    title: "Racing Fan",
  },
  {
    id: 2,
    quote: "Best track conditions I've ever ridden on. The crowd is insane!",
    name: "David Omondi",
    title: "MX2 Rider",
  },
  {
    id: 3,
    quote:
      "Family atmosphere was amazing. The kids are still talking about it!",
    name: "James Kariuki",
    title: "Fan",
  },
  {
    id: 4,
    quote:
      "Production quality rivals international championships. World class.",
    name: "Wanjiku Ngugi",
    title: "Red Bull Partner",
  },
];

const CTASection = () => {
  return (
    <>
      <CTAWrapper>
        <Container>
          <ContentHeader>
            <h2>
              THE <span>FEEDBACK</span>
            </h2>
            <p>Full Throttle Satisfaction</p>
          </ContentHeader>

          <RatingSummary>
            <span className="stars">★★★★★</span>
            <span>4.9 / 5.0 Avg Rating</span>
          </RatingSummary>

          <div style={{ overflow: "hidden" }}>
            <TestimonialsTrack>
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialItem key={`${t.id}-${i}`}>
                  <div className="quote">{t.quote}</div>
                  <div className="client-info">
                    <div className="avatar-label">MXK</div>
                    <div>
                      <p className="name">{t.name}</p>
                      <p className="title">{t.title}</p>
                    </div>
                  </div>
                </TestimonialItem>
              ))}
            </TestimonialsTrack>
          </div>
        </Container>
      </CTAWrapper>
      <SponsorSection />
    </>
  );
};

export default CTASection;

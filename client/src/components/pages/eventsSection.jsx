import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { theme } from "../../styles/theme";
import { events } from "../../components/dummydata";
import MpesaModal from "../modals/mpesaModal";

const SectionWrapper = styled.section`
  padding: 100px 0;

  position: relative;
`;

const HeaderBox = styled.div`
  margin-bottom: 60px;
  text-align: left;
`;

const Badge = styled.span`
  background: ${theme.colors.primary};
  color: #000;
  padding: 4px 15px;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
  display: inline-block;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  line-height: 0.9;
  span {
    display: block;
    color: ${theme.colors.primary};
    font-size: 0.5em;
    letter-spacing: 5px;
    margin-top: 5px;
  }
`;

const CardWrapper = styled.div`
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    border-color: ${theme.colors.primary};
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  background: #111;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.6s ease;
  }
  ${CardWrapper}:hover img {
    transform: scale(1.05);
  }
`;

const DateBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  color: #fff;
  padding: 8px;
  min-width: 55px;
  text-align: center;
  border-bottom: 3px solid ${theme.colors.primary};
  z-index: 5;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const EventTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const LocationLabel = styled.p`
  color: ${theme.colors.primary};
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EventInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const BuyButton = styled.button`
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  padding: 10px 18px;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #fff;
    transform: scale(1.05);
  }
`;

const ShareButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #fff;
    color: #000;
    transform: scale(1.1);
  }
`;

// Universal Share SVG Icon
const ShareIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const EventsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleBuy = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleShare = async (event) => {
    const shareData = {
      title: event.title,
      text: `Check out ${event.title} happening at ${event.location || "the track"}!`,
      url: `${window.location.origin}/events/${event.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Event link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const displayEvents = events?.filter((e) => e.featured) || [];

  return (
    <>
      <SectionWrapper id="events">
        <Container>
          <HeaderBox>
            <Badge>Elite Racing 2026</Badge>
            <Title>
              Upcoming <span>Season Events</span>
            </Title>
          </HeaderBox>

          <Row className="g-4">
            {displayEvents.map((event, index) => (
              <Col key={event.id} xs={12} sm={6} lg={4} xl={3}>
                <CardWrapper>
                  <ImageContainer>
                    <DateBadge>
                      <span className="day">{15 + index}</span>
                      <span className="month">MAR</span>
                    </DateBadge>
                    <img
                      src={index % 2 === 0 ? "/h.jpg" : "/hero.jpg"}
                      alt={event.title}
                      loading="lazy"
                    />
                  </ImageContainer>

                  <CardBody>
                    <EventTitle>{event.title}</EventTitle>
                    <LocationLabel>
                      📍 {event.location || "Jamhuri Park"}
                    </LocationLabel>

                    <EventInfo>
                      <div className="price-box">
                        <div
                          style={{
                            color: "#fff",
                            fontWeight: "900",
                            fontSize: "1.2rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.7rem",
                              color: theme.colors.primary,
                            }}
                          >
                            KSH
                          </span>{" "}
                          {event.price || "1,500"}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        <BuyButton onClick={() => handleBuy(event)}>
                          Tickets
                        </BuyButton>
                        <ShareButton onClick={() => handleShare(event)}>
                          <ShareIcon />
                        </ShareButton>
                      </div>
                    </EventInfo>
                  </CardBody>
                </CardWrapper>
              </Col>
            ))}
          </Row>
        </Container>
      </SectionWrapper>

      <MpesaModal
        show={showModal}
        onHide={() => setShowModal(false)}
        event={selectedEvent}
      />
    </>
  );
};

export default EventsSection;

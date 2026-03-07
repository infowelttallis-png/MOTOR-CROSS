import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { events } from "../dummydata";
import { theme } from "../../styles/theme";
import MpesaModal from "../modals/mpesaModal"; // Add this import

const DetailWrapper = styled.div`
  background: #000;
  min-height: 100vh;
  padding: 100px 0;
  color: #fff;
`;

const BackButton = styled.button`
  background: transparent;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  padding: 8px 20px;
  margin-bottom: 30px;
  cursor: pointer;
  font-weight: 800;
  text-transform: uppercase;
  transition: 0.3s;

  &:hover {
    background: ${theme.colors.primary};
    color: #000;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PriceSection = styled.div`
  background: #0a0a0a;
  padding: 30px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 4px solid ${theme.colors.primary};
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;

  small {
    font-size: 1rem;
    color: ${theme.colors.primary};
    margin-right: 5px;
  }
`;

const BuyButton = styled.button`
  background: ${theme.colors.primary};
  color: #000;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
  transition: 0.3s;
  width: 100%;
  margin: 20px 0;

  &:hover {
    background: #fff;
    transform: scale(1.02);
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px 0;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoItem = styled.div`
  text-align: center;

  .label {
    color: #666;
    font-size: 0.7rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .value {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    font-weight: 900;
    margin-top: 5px;
  }
`;

const Description = styled.p`
  color: #888;
  line-height: 1.8;
  margin: 20px 0;
`;

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Find the event by ID (ensure types match, e.g., String vs Number)
  const event = events.find((e) => e.id.toString() === id);

  const handleBuyClick = () => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleBack = () => {
    // Navigate back to home page (root)
    navigate("/");
  };

  if (!event) {
    return (
      <DetailWrapper>
        <Container>
          <h1>Event Not Found</h1>
          <BackButton onClick={handleBack}>← Back to Home</BackButton>
        </Container>
      </DetailWrapper>
    );
  }

  // Format date
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + parseInt(id) * 7);
  const formattedDate = eventDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format price
  const priceValue =
    typeof event.price === "string"
      ? event.price.replace(/[^0-9]/g, "")
      : event.price || "1500";

  return (
    <>
      <DetailWrapper>
        <Container>
          <BackButton onClick={handleBack}>← Back to Home</BackButton>

          <Row>
            <Col lg={7}>
              <HeroImage src="/hero.jpg" alt={event.title} />
            </Col>

            <Col lg={5}>
              <h1
                style={{
                  fontWeight: 900,
                  textTransform: "uppercase",
                  fontSize: "2rem",
                }}
              >
                {event.title}
              </h1>

              <p
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                📍 {event.location || "Nairobi International Track"}
              </p>

              <InfoGrid>
                <InfoItem>
                  <div className="label">Date</div>
                  <div className="value">{formattedDate}</div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Time</div>
                  <div className="value">10:00 AM</div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Category</div>
                  <div className="value">MX1</div>
                </InfoItem>
              </InfoGrid>

              <PriceSection>
                <Price>
                  <small>KSH</small> {priceValue}
                </Price>
                <Description>
                  Experience the thrill of {event.title} at {event.location}.
                  Join the elite racing community for the 2026 season. Limited
                  tickets available!
                </Description>
              </PriceSection>

              <BuyButton onClick={handleBuyClick}>Get Tickets Now</BuyButton>

              <p
                style={{
                  color: "#666",
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                Secure payment via M-PESA • Instant ticket confirmation
              </p>
            </Col>
          </Row>
        </Container>
      </DetailWrapper>

      {/* M-PESA Modal */}
      <MpesaModal
        show={showModal}
        onHide={() => setShowModal(false)}
        event={selectedEvent}
      />
    </>
  );
};

export default EventDetails;


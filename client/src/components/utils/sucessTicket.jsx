// components/tickets/SuccessTicket.js
import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { theme } from "../../styles/theme";
import { generateQRCode, downloadTicket } from "../../utils/ticketUtils";

const TicketContainer = styled.div`
  background: ${theme.gradients.primary};
  padding: 40px 30px;
  border-radius: 25px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
  }

  &::after {
    content: "MOTOCROSS KENYA";
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 12px;
    opacity: 0.3;
    font-family: ${theme.fonts.display};
    letter-spacing: 5px;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const TicketHeader = styled.div`
  margin-bottom: 30px;
  position: relative;
  z-index: 2;

  h3 {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const TicketCode = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  font-family: ${theme.fonts.display};
  letter-spacing: 5px;
  background: rgba(255, 255, 255, 0.15);
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(5px);
`;

const TicketDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 30px 0;
  position: relative;
  z-index: 2;

  .detail-item {
    .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      opacity: 0.7;
      margin-bottom: 5px;
    }

    .value {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
`;

const QRCode = styled.div`
  width: 150px;
  height: 150px;
  margin: 20px auto;
  background: white;
  padding: 10px;
  border-radius: 15px;
  position: relative;
  z-index: 2;
  box-shadow: ${theme.shadows.medium};
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 30px;
  position: relative;
  z-index: 2;
`;

const SuccessTicket = ({ ticket, onBookAnother }) => {
  const ticketRef = useRef();

  const handleDownload = () => {
    downloadTicket(ticket);
  };

  return (
    <TicketContainer ref={ticketRef}>
      <TicketHeader>
        <h3>🎫 TICKET CONFIRMED</h3>
        <p>Your digital ticket is ready</p>
      </TicketHeader>

      <TicketCode>{ticket.id}</TicketCode>

      <TicketDetails>
        <div className="detail-item">
          <div className="label">Name</div>
          <div className="value">{ticket.name}</div>
        </div>
        <div className="detail-item">
          <div className="label">Event</div>
          <div className="value">{ticket.event}</div>
        </div>
        <div className="detail-item">
          <div className="label">Date</div>
          <div className="value">{ticket.date}</div>
        </div>
        <div className="detail-item">
          <div className="label">Tickets</div>
          <div className="value">x{ticket.quantity}</div>
        </div>
      </TicketDetails>

      <QRCode dangerouslySetInnerHTML={{ __html: generateQRCode(ticket.id) }} />

      <ActionButtons>
        <Button variant="light" onClick={handleDownload} className="py-3">
          📥 Download
        </Button>
        <Button
          variant="outline-light"
          onClick={onBookAnother}
          className="py-3"
        >
          🎟️ Book Another
        </Button>
      </ActionButtons>

      <p className="mt-4 small opacity-75">
        Show this QR code at the entrance with a valid ID
      </p>
    </TicketContainer>
  );
};

export default SuccessTicket;

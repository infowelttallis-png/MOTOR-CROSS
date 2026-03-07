// components/booking/BookingModal.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Modal, Alert } from "react-bootstrap";
import { theme } from "../../styles/theme";
import BookingForm from "./BookingForm";
import { formatDate } from "../../utils/formatters";

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 25px;
    overflow: hidden;
    animation: ${slideIn} 0.3s ease;
  }

  .modal-header {
    background: ${theme.gradients.primary};
    color: white;
    border: none;
    padding: 20px 25px;

    .btn-close {
      filter: brightness(0) invert(1);
    }
  }

  .modal-body {
    padding: 30px;
  }
`;

const EventSummary = styled(Alert)`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border: none;
  border-radius: 15px;
  padding: 20px;

  .event-title {
    font-family: ${theme.fonts.display};
    color: ${theme.colors.accent};
    margin-bottom: 10px;
  }

  .event-detail {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    color: ${theme.colors.dark};

    i {
      width: 20px;
      color: ${theme.colors.accent};
    }
  }
`;

const BookingModal = ({ show, onHide, event, onSubmit, loading }) => {
  if (!event) return null;

  const formattedDate = formatDate(event.date);

  return (
    <StyledModal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Complete Your Booking</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EventSummary variant="light">
          <h5 className="event-title">{event.title}</h5>
          <div className="event-detail">
            <i className="fas fa-calendar"></i>
            <span>
              {formattedDate.full} at {event.time}
            </span>
          </div>
          <div className="event-detail">
            <i className="fas fa-map-marker-alt"></i>
            <span>Jamhuri Showgrounds, Nairobi</span>
          </div>
          <div className="event-detail">
            <i className="fas fa-ticket-alt"></i>
            <span>KSH {event.price} per ticket</span>
          </div>
        </EventSummary>

        <BookingForm event={event} onSubmit={onSubmit} loading={loading} />
      </Modal.Body>
    </StyledModal>
  );
};

export default BookingModal;

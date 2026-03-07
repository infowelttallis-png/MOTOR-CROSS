// components/home/EventCard.js
import React from "react";
import styled from "styled-components";
import { Card, Badge } from "react-bootstrap";
import { theme } from "../../styles/theme";

const StyledCard = styled(Card)`
  border: none;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  transition: ${theme.transitions.smooth};
  height: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.hover};
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
`;

const CategoryBadge = styled(Badge)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${theme.colors.primary};
  color: white;
  padding: 8px 15px;
  border-radius: 50px;
  font-weight: 600;
  z-index: 2;
`;

const PriceTag = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 15px;
  border-radius: 50px;
  font-weight: 700;
  color: ${theme.colors.primary};
  z-index: 2;
  box-shadow: ${theme.shadows.small};
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${theme.colors.gray};
  font-size: 0.9rem;
  margin: 10px 0;

  i {
    color: ${theme.colors.primary};
  }
`;

const EventCard = ({ event, onClick }) => {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <StyledCard onClick={onClick}>
      <CardImage style={{ backgroundImage: `url(${event.image})` }}>
        <CategoryBadge>{event.category}</CategoryBadge>
        <PriceTag>KSH {event.price}</PriceTag>
      </CardImage>

      <Card.Body>
        <Card.Title
          className="h5 mb-3"
          style={{ fontFamily: theme.fonts.display }}
        >
          {event.title}
        </Card.Title>

        <EventDate>
          <i className="far fa-calendar"></i>
          <span>
            {formattedDate} at {event.time}
          </span>
        </EventDate>

        <EventDate>
          <i className="fas fa-map-marker-alt"></i>
          <span>{event.location}</span>
        </EventDate>

        <Card.Text className="text-muted mt-3" style={{ fontSize: "0.9rem" }}>
          {event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default EventCard;

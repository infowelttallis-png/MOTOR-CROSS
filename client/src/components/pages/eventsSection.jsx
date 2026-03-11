import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles/theme";
import { events } from "../../components/dummydata";
import MpesaModal from "../modals/mpesaModal";
import "react-calendar/dist/Calendar.css";

// Override calendar styles to match your theme
// Override calendar styles to match your theme
const CalendarStyles = styled.div`
  .react-calendar {
    width: 100%;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    font-family: inherit;
    padding: 20px;

    &__navigation {
      margin-bottom: 20px;
      display: flex;
      gap: 4px;

      button {
        color: white !important;
        background: rgba(255, 255, 255, 0.1) !important;
        font-size: 1.1rem;
        font-weight: 700;
        text-transform: uppercase;
        min-width: 44px;
        padding: 8px 12px;
        border-radius: 4px;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 77, 0, 0.3);

        span {
          color: white !important;
        }

        &:hover {
          background: ${theme.colors.primary} !important;
          color: #000 !important;

          span {
            color: #000 !important;
          }
        }

        &:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.05) !important;

          &:hover {
            background: rgba(255, 255, 255, 0.05) !important;
            color: white !important;
          }
        }
      }

      &__label {
        color: white !important;
        font-size: 1.2rem;
        font-weight: 900;
        letter-spacing: 1px;
        background: rgba(255, 77, 0, 0.2) !important;

        &:hover {
          background: ${theme.colors.primary} !important;
          color: #000 !important;
        }

        &__labelText {
          color: white !important;
        }
      }

      &__arrow {
        font-size: 1.5rem;
        line-height: 1;
        color: white !important;
      }
    }

    &__navigation__label__labelText {
      color: white !important;
      font-weight: 900;
    }

    &__month-view__weekdays {
      text-transform: uppercase;
      font-weight: 900;
      font-size: 0.8rem;
      color: ${theme.colors.primary};
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 77, 0, 0.2);

      abbr {
        text-decoration: none;
        cursor: default;
      }
    }

    &__month-view__weekdays__weekday {
      padding: 8px 0;

      abbr {
        color: ${theme.colors.primary};
      }
    }

    &__tile {
      color: #fff;
      background: transparent;
      padding: 15px 5px;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 4px;
      position: relative;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 77, 0, 0.2) !important;
        color: #fff !important;
      }

      &:focus {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 2px;
      }

      &--active {
        background: ${theme.colors.primary} !important;
        color: #000 !important;
        font-weight: 900;
        transform: scale(0.98);

        &:hover {
          background: ${theme.colors.primary} !important;
          color: #000 !important;
        }
      }

      &--now {
        background: rgba(255, 77, 0, 0.1);
        border: 1px solid ${theme.colors.primary};
        font-weight: 700;
      }

      &.has-event {
        background: rgba(255, 77, 0, 0.15);
        font-weight: 700;
        border: 1px solid rgba(255, 77, 0, 0.3);

        &::after {
          content: "🏁";
          position: absolute;
          top: 2px;
          right: 2px;
          font-size: 0.7rem;
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
        }
      }
    }

    &__month-view__days__day--neighboringMonth {
      opacity: 0.3;

      &.has-event {
        opacity: 0.4;

        &::after {
          opacity: 0.5;
        }
      }

      &:hover {
        opacity: 0.6;
      }
    }

    &__year-view__months,
    &__decade-view__years,
    &__century-view__decades {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;

      &__month,
      &__year,
      &__decade {
        color: #fff;
        background: rgba(255, 255, 255, 0.05);
        padding: 15px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 4px;
        transition: all 0.2s ease;
        border: 1px solid rgba(255, 77, 0, 0.2);

        &:hover {
          background: rgba(255, 77, 0, 0.2) !important;
          border-color: ${theme.colors.primary};
        }

        &--active {
          background: ${theme.colors.primary} !important;
          color: #000 !important;
          font-weight: 900;
          border-color: ${theme.colors.primary};
        }
      }
    }

    &__navigation__prev-button,
    &__navigation__next-button {
      font-size: 1.8rem !important;
      line-height: 1;
      color: white !important;
    }
  }
`;

const SectionWrapper = styled.section`
  padding: 100px 0;
  position: relative;
`;

const HeaderBox = styled.div`
  margin-bottom: 60px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
`;

const HeaderLeft = styled.div``;

const ViewToggle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const ToggleButton = styled.button`
  background: ${(props) =>
    props.active ? theme.colors.primary : "transparent"};
  color: ${(props) => (props.active ? "#000" : "#fff")};
  border: 1px solid
    ${(props) =>
      props.active ? theme.colors.primary : "rgba(255,255,255,0.2)"};
  padding: 10px 25px;
  font-size: 0.85rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  letter-spacing: 1px;

  &:hover {
    background: ${theme.colors.primary};
    color: #000;
    border-color: ${theme.colors.primary};
  }
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
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

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

  .day {
    font-size: 1.3rem;
    font-weight: 900;
    line-height: 1;
    display: block;
  }

  .month {
    font-size: 0.7rem;
    text-transform: uppercase;
    opacity: 0.8;
  }
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

const CalendarWrapper = styled.div`
  margin-top: 40px;
`;

const SelectedDateEvents = styled.div`
  margin-top: 30px;
  padding: 20px;

  border-radius: 8px;
`;

const SelectedDateTitle = styled.h4`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 20px;

  span {
    color: ${theme.colors.primary};
    font-size: 0.9rem;
    margin-left: 10px;
  }
`;

const MiniEventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MiniEventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 77, 0, 0.1);
    border-color: ${theme.colors.primary};
    transform: translateX(5px);
  }

  .event-info {
    h5 {
      color: #fff;
      font-size: 1rem;
      font-weight: 700;
      margin: 0 0 5px 0;
    }

    p {
      color: ${theme.colors.primary};
      font-size: 0.75rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .event-price {
    color: #fff;
    font-weight: 900;
    font-size: 1.1rem;

    small {
      font-size: 0.6rem;
      color: ${theme.colors.primary};
      margin-right: 2px;
    }
  }
`;

const ViewDetailsButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  color: #fff;
  padding: 5px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;

  &:hover {
    background: ${theme.colors.primary};
    color: #000;
  }
`;

// Share Icon Component
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
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState("cards");
  const [date, setDate] = useState(new Date(2026, 2, 1)); // Set to March 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 15)); // Default to first event date

  // Generate proper Kenyan events with real dates
  const kenyanEvents = [
    {
      id: 1,
      title: "JAMHURI PARK NATIONALS",
      location: "Jamhuri Park, Nairobi",
      fullDate: new Date(2026, 2, 15), // March 15, 2026
      dateStr: "2026-03-15",
      day: "15",
      month: "MAR",
      price: "2,500",
      featured: true,
      description: "National motocross championship opening round",
    },
    {
      id: 2,
      title: "COAST CHALLENGE",
      location: "Mombasa Raceway",
      fullDate: new Date(2026, 2, 22), // March 22, 2026
      dateStr: "2026-03-22",
      day: "22",
      month: "MAR",
      price: "2,000",
      featured: true,
      description: "Coastal motocross classic",
    },
    {
      id: 3,
      title: "RIFT VALLEY RUMBLE",
      location: "Eldoret Speedpark",
      fullDate: new Date(2026, 3, 5), // April 5, 2026
      dateStr: "2026-04-05",
      day: "05",
      month: "APR",
      price: "1,800",
      featured: true,
      description: "High altitude racing in the Rift Valley",
    },
    {
      id: 4,
      title: "CENTRAL HIGHLANDS MX",
      location: "Nyeri Track",
      fullDate: new Date(2026, 3, 12), // April 12, 2026
      dateStr: "2026-04-12",
      day: "12",
      month: "APR",
      price: "1,500",
      featured: true,
      description: "Scenic hills motocross challenge",
    },
    {
      id: 5,
      title: "KISUMU LAKE RACE",
      location: "Kisumu Sports Ground",
      fullDate: new Date(2026, 3, 19), // April 19, 2026
      dateStr: "2026-04-19",
      day: "19",
      month: "APR",
      price: "1,500",
      featured: true,
      description: "Western region motocross event",
    },
    {
      id: 6,
      title: "NAIVASHA MX CHALLENGE",
      location: "Naivasha Track",
      fullDate: new Date(2026, 3, 26), // April 26, 2026
      dateStr: "2026-04-26",
      day: "26",
      month: "APR",
      price: "1,800",
      featured: true,
      description: "Great Rift Valley motocross",
    },
    {
      id: 7,
      title: "MACHAKOS DIRT BLAST",
      location: "Machakos Showground",
      fullDate: new Date(2026, 4, 3), // May 3, 2026
      dateStr: "2026-05-03",
      day: "03",
      month: "MAY",
      price: "1,500",
      featured: true,
      description: "Eastern region motocross",
    },
    {
      id: 8,
      title: "NAKURU CROSS COUNTRY",
      location: "Nakuru ASK Grounds",
      fullDate: new Date(2026, 4, 10), // May 10, 2026
      dateStr: "2026-05-10",
      day: "10",
      month: "MAY",
      price: "1,800",
      featured: true,
      description: "Cross country motocross special",
    },
  ];

  // Use Kenyan events instead of dummy data
  const enhancedEvents = kenyanEvents.filter((e) => e.featured);

  const handleBuy = (event, e) => {
    e.stopPropagation(); // Prevent card click when clicking buy button
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleShare = async (event, e) => {
    e.stopPropagation(); // Prevent card click when clicking share button
    const shareData = {
      title: `🏁 ${event.title} - Kenya Motocross`,
      text: `Catch the action at ${event.location}! 🏍️ Tickets from KSH ${event.price}`,
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

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleViewDetails = (eventId, e) => {
    e.stopPropagation();
    navigate(`/events/${eventId}`);
  };

  // Calendar tile customization
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = format(date, "yyyy-MM-dd");
      const hasEvent = enhancedEvents.some((e) => e.dateStr === dateStr);
      return hasEvent ? "has-event" : null;
    }
  };

  // Handle date click
  const handleDateClick = (value) => {
    setSelectedDate(value);
  };

  // Get events for selected date
  const eventsOnSelectedDate = selectedDate
    ? enhancedEvents.filter(
        (e) => e.dateStr === format(selectedDate, "yyyy-MM-dd"),
      )
    : [];

  return (
    <>
      <SectionWrapper id="events">
        <Container>
          <HeaderBox>
            <HeaderLeft>
              <Badge>Elite Racing 2026</Badge>
              <Title>
                Upcoming <span>Season Events</span>
              </Title>
            </HeaderLeft>

            <ViewToggle>
              <ToggleButton
                active={view === "cards"}
                onClick={() => setView("cards")}
              >
                CARD VIEW
              </ToggleButton>
              <ToggleButton
                active={view === "calendar"}
                onClick={() => setView("calendar")}
              >
                CALENDAR VIEW
              </ToggleButton>
            </ViewToggle>
          </HeaderBox>

          {view === "cards" ? (
            <Row className="g-4">
              {enhancedEvents.map((event, index) => (
                <Col key={event.id} xs={12} sm={6} lg={4} xl={3}>
                  <CardWrapper onClick={() => handleCardClick(event.id)}>
                    <ImageContainer>
                      <DateBadge>
                        <span className="day">{event.day}</span>
                        <span className="month">{event.month}</span>
                      </DateBadge>
                      <img
                        src={index % 2 === 0 ? "/h.jpg" : "/hero.jpg"}
                        alt={event.title}
                        loading="lazy"
                      />
                    </ImageContainer>

                    <CardBody>
                      <EventTitle>{event.title}</EventTitle>
                      <LocationLabel>📍 {event.location}</LocationLabel>

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
                            {event.price}
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <BuyButton onClick={(e) => handleBuy(event, e)}>
                            Tickets
                          </BuyButton>
                          <ShareButton onClick={(e) => handleShare(event, e)}>
                            <ShareIcon />
                          </ShareButton>
                        </div>
                      </EventInfo>
                    </CardBody>
                  </CardWrapper>
                </Col>
              ))}
            </Row>
          ) : (
            <CalendarWrapper>
              <CalendarStyles>
                <Calendar
                  onChange={handleDateClick}
                  value={selectedDate || date}
                  tileClassName={tileClassName}
                  className="react-calendar"
                  minDetail="month"
                  maxDetail="month"
                  prevLabel="←"
                  nextLabel="→"
                  prev2Label="≪"
                  next2Label="≫"
                  formatShortWeekday={(locale, date) => format(date, "EEEEE")}
                />
              </CalendarStyles>

              {selectedDate && (
                <SelectedDateEvents>
                  <SelectedDateTitle>
                    Events on {format(selectedDate, "MMMM do, yyyy")}
                    <span>{eventsOnSelectedDate.length} event(s)</span>
                  </SelectedDateTitle>

                  {eventsOnSelectedDate.length > 0 ? (
                    <MiniEventList>
                      {eventsOnSelectedDate.map((event) => (
                        <MiniEventItem
                          key={event.id}
                          onClick={() => handleCardClick(event.id)}
                        >
                          <div className="event-info">
                            <h5>{event.title}</h5>
                            <p>📍 {event.location}</p>
                            <small style={{ color: "rgba(255,255,255,0.5)" }}>
                              {event.description}
                            </small>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div className="event-price">
                              <small>KSH</small> {event.price}
                            </div>
                            <ViewDetailsButton
                              onClick={(e) => handleViewDetails(event.id, e)}
                            >
                              Details
                            </ViewDetailsButton>
                          </div>
                        </MiniEventItem>
                      ))}
                    </MiniEventList>
                  ) : (
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        textAlign: "center",
                        margin: 0,
                        padding: "20px",
                      }}
                    >
                      No events scheduled for this date. Check other dates with
                      🏁 markers.
                    </p>
                  )}
                </SelectedDateEvents>
              )}
            </CalendarWrapper>
          )}
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

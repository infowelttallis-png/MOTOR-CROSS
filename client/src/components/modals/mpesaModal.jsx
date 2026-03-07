// components/modals/MpesaModal.js
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* Prevent keyboard from resizing viewport */
  position: fixed;
  min-height: -webkit-fill-available;

  /* Smooth scroll behavior */
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    align-items: center;
    padding: 12px;
  }
`;

const ModalBox = styled.div`
  background: #000000;
  width: 100%;
  max-width: 440px;
  padding: 24px;
  border-radius: 28px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  color: #1a1a1a;
  margin: auto;
  animation: ${slideUp} 0.3s ease;
  border: 1px solid rgba(30, 144, 57, 0.15);
  max-height: 90vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    margin: auto;
    padding: 20px;
    border-radius: 24px;
    max-height: 85vh;
    width: 95%;
  }
`;

// Authentic Safaricom M-Pesa Header
const MpesaHeader = styled.div`
  background: linear-gradient(135deg, #1e9039 0%, #146b2a 100%);
  margin: -24px -24px 20px -24px;
  padding: 24px 24px 20px 24px;
  border-radius: 28px 28px 0 0;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  /* Fix for sticky header when scrolling */
  position: sticky;
  top: -24px;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: ${pulse} 3s infinite;
  }

  @media (max-width: 768px) {
    margin: -20px -20px 16px -20px;
    padding: 20px 20px 16px 20px;
    border-radius: 24px 24px 0 0;
    top: -20px;
  }
`;

const MpesaLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;

  img {
    height: 40px;
    width: auto;
    filter: brightness(0) invert(1);
  }

  span {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
`;

const MpesaBadge = styled.div`
  background: rgba(255, 255, 255, 0.15);
  display: inline-block;
  padding: 6px 16px;
  border-radius: 40px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 8px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const EventDetails = styled.div`
  background: #f5f9f6;
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #e0f0e3;

  .event-title {
    font-weight: 800;
    font-size: 1.1rem;
    color: #1e9039;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: -0.3px;
  }

  .event-location {
    font-size: 0.85rem;
    color: #4a5568;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  color: #1e9039;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #1e9039;
  font-size: 1.1rem;
  font-weight: 600;
  z-index: 1;
`;

const Input = styled.input`
  background: #ffffff;
  border: 2px solid #e2e8f0;
  color: #1a1a1a;
  padding: ${(props) => (props.icon ? "14px 14px 14px 45px" : "14px")};
  width: 100%;
  font-weight: 500;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.2s;
  /* Prevent zoom on focus in iOS */
  -webkit-text-size-adjust: 100%;

  &:focus {
    outline: none;
    border-color: #1e9039;
    box-shadow: 0 0 0 3px rgba(30, 144, 57, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
    font-weight: 400;
    font-size: 0.9rem;
  }
`;

const QtyContainer = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 4px;
  justify-content: space-between;

  span {
    font-weight: 800;
    font-size: 1.2rem;
    color: #1e9039;
    min-width: 40px;
    text-align: center;
  }
`;

const QtyBtn = styled.button`
  background: #f0f9f2;
  color: #1e9039;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #1e9039;
    color: white;
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PriceDisplay = styled.div`
  background: linear-gradient(135deg, #f0f9f2 0%, #e0f0e3 100%);
  border-radius: 16px;
  padding: 12px 16px;
  margin-top: 4px;

  .price-label {
    font-size: 0.7rem;
    color: #1e9039;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .price-value {
    font-size: 1.8rem;
    font-weight: 900;
    color: #1e9039;
    line-height: 1.2;

    small {
      font-size: 1rem;
      font-weight: 600;
      color: #4a5568;
      margin-right: 4px;
    }
  }
`;

const PayButton = styled.button`
  background: linear-gradient(135deg, #1e9039 0%, #146b2a 100%);
  color: white;
  border: none;
  padding: 18px;
  width: 100%;
  font-weight: 800;
  font-size: 1.1rem;
  text-transform: uppercase;
  margin-top: 20px;
  border-radius: 20px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.2s;
  box-shadow: 0 10px 20px -5px rgba(30, 144, 57, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 15px 25px -5px rgba(30, 144, 57, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #90c695 0%, #7fb284 100%);
  }
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  margin-top: 16px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s;
  padding: 8px 16px;

  &:hover {
    color: #ef4444;
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  color: #94a3b8;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Add this new component for keyboard handling
const KeyboardSpacer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    height: ${(props) => (props.isKeyboardOpen ? "20px" : "0")};
    transition: height 0.2s;
  }
`;

const MpesaModal = ({ show, onHide, event }) => {
  const [attendeeName, setAttendeeName] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Format phone number as user types (Kenyan format)
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, "");

    // Handle different Kenyan formats
    if (numbers.startsWith("254")) {
      return numbers;
    } else if (numbers.startsWith("0")) {
      return "254" + numbers.substring(1);
    } else if (numbers.startsWith("7")) {
      return "254" + numbers;
    }
    return numbers;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPayerPhone(formatted);
  };

  // SAFE PRICE CALCULATION
  const getRawPrice = (priceVal) => {
    if (!priceVal) return 1500;
    if (typeof priceVal === "number") return priceVal;
    return parseInt(priceVal.replace(/[^0-9]/g, "")) || 1500;
  };

  const unitPrice = getRawPrice(event?.price);
  const totalPrice = unitPrice * qty;

  // Handle keyboard opening/closing
  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight;
      const keyboardOpen = newHeight < windowHeight;
      setIsKeyboardOpen(keyboardOpen);

      if (!keyboardOpen) {
        // When keyboard closes, scroll to top smoothly
        setTimeout(() => {
          if (overlayRef.current) {
            overlayRef.current.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }, 100);
      }

      setWindowHeight(newHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowHeight]);

  // Handle focus on inputs - scroll input into view
  const handleInputFocus = (inputRef) => {
    setTimeout(() => {
      if (inputRef.current && overlayRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const overlayRect = overlayRef.current.getBoundingClientRect();

        // Check if input is hidden by keyboard
        if (inputRect.bottom > overlayRect.height - 100) {
          inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 300);
  };

  // Smooth scroll to top when modal opens
  useEffect(() => {
    setMounted(true);

    if (show) {
      document.body.style.overflow = "hidden";

      // Fix for iOS viewport height
      const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };

      setVh();
      window.addEventListener("resize", setVh);

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Scroll overlay into view smoothly
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }

        // Focus the first input after animation
        setTimeout(() => {
          if (nameInputRef.current) {
            nameInputRef.current.focus();
          }
        }, 400);
      }, 100);

      return () => {
        window.removeEventListener("resize", setVh);
      };
    } else {
      document.body.style.overflow = "unset";
      setAttendeeName("");
      setPayerPhone("");
      setQty(1);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show || !mounted) return null;

  const handlePay = () => {
    if (!attendeeName) {
      alert("Please enter the ticket holder's name");
      nameInputRef.current?.focus();
      return;
    }

    // Validate Kenyan phone number
    const phoneRegex = /^254[17]\d{8}$/;
    if (!payerPhone || !phoneRegex.test(payerPhone)) {
      alert(
        "Please enter a valid Kenyan M-Pesa number (e.g., 0712345678 or 254712345678)",
      );
      phoneInputRef.current?.focus();
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      alert(
        `✅ STK Push sent to ${payerPhone}\n\nPlease enter your M-Pesa PIN to complete payment of KES ${totalPrice.toLocaleString()}`,
      );
      onHide();
    }, 2000);
  };

  return createPortal(
    <Overlay
      ref={overlayRef}
      onClick={onHide}
      style={{
        height: isKeyboardOpen ? `${windowHeight}px` : "100%",
      }}
    >
      <ModalBox
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="M-Pesa Payment"
      >
        <MpesaHeader>
          <MpesaLogo>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg"
              alt="M-PESA"
            />
            <span>M-PESA</span>
          </MpesaLogo>
        </MpesaHeader>

        <EventDetails>
          <div className="event-title">{event?.title || "Event Ticket"}</div>
          <div className="event-location">
            <span>📍</span> {event?.location || "Nairobi, Kenya"}
          </div>
        </EventDetails>

        <Label>
          <span>👤</span> TICKET HOLDER NAME
        </Label>
        <InputWrapper>
          <Input
            ref={nameInputRef}
            placeholder="Full name as on ID"
            value={attendeeName}
            onChange={(e) => setAttendeeName(e.target.value)}
            onFocus={() => handleInputFocus(nameInputRef)}
          />
        </InputWrapper>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <div>
            <Label>
              <span>👥</span> QUANTITY
            </Label>
            <QtyContainer>
              <QtyBtn
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
              >
                −
              </QtyBtn>
              <span>{qty}</span>
              <QtyBtn onClick={() => setQty(qty + 1)}>+</QtyBtn>
            </QtyContainer>
          </div>
          <div>
            <Label>
              <span>💰</span> TOTAL
            </Label>
            <PriceDisplay>
              <div className="price-label">KES</div>
              <div className="price-value">
                <small>KSh</small> {totalPrice.toLocaleString()}
              </div>
            </PriceDisplay>
          </div>
        </div>

        <Label style={{ marginTop: "20px" }}>
          <span>📱</span> M-PESA NUMBER
        </Label>
        <InputWrapper>
          <InputIcon>+254</InputIcon>
          <Input
            ref={phoneInputRef}
            type="tel"
            icon="true"
            placeholder="712345678"
            value={payerPhone.replace("254", "")}
            onChange={handlePhoneChange}
            maxLength="9"
            onFocus={() => handleInputFocus(phoneInputRef)}
          />
        </InputWrapper>
        <div
          style={{
            fontSize: "0.7rem",
            color: "#64748b",
            marginTop: "4px",
            paddingLeft: "12px",
          }}
        >
          Enter your Safaricom number (e.g., 0712345678)
        </div>

        <PayButton onClick={handlePay} disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner /> PROCESSING...
            </>
          ) : (
            `PAY KES ${totalPrice.toLocaleString()}`
          )}
        </PayButton>

        <CancelButton onClick={onHide}>CANCEL TRANSACTION</CancelButton>

        <SecurityBadge>
          <span>🔐</span> Complete Transaction To Get Ticket Number
        </SecurityBadge>
      </ModalBox>
      <KeyboardSpacer isKeyboardOpen={isKeyboardOpen} />
    </Overlay>,
    document.body,
  );
};

export default MpesaModal;

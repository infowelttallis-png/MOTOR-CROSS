import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { theme } from "../../styles/theme";

const FooterWrapper = styled.footer`
  background: ${theme.colors.background};
  color: #ffffff;
  padding: 80px 0 40px;
  border-top: 1px solid ${theme.colors.border};
`;

const FooterMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLogo = styled.h2`
  font-family: ${theme.fonts.main};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin-bottom: 5px;
  line-height: 1;

  span {
    color: ${theme.colors.primary};
  }
`;

const Tagline = styled.p`
  color: ${theme.colors.gray};
  font-size: 0.7rem;
  letter-spacing: 8px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 40px;
  padding-left: 8px;
`;

const MapContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 60px;
  border: 1px solid ${theme.colors.border};
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);

  iframe {
    width: 100%;
    height: 300px; /* Adjusted height for better footer balance */
    filter: grayscale(1) invert(1) opacity(0.7); /* Professional dark mode map look */
    transition: 0.3s;

    &:hover {
      filter: grayscale(0) invert(0) opacity(1);
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    iframe {
      height: 250px;
    }
  }
`;

const BottomBar = styled.div`
  width: 100%;
  padding-top: 40px;
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  p {
    color: rgba(255, 255, 255, 0.2);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
  }
`;

const DevCredit = styled.a`
  color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  span {
    font-weight: 900;
    color: rgba(255, 255, 255, 0.4);
    transition: 0.3s;
  }

  &:hover span {
    color: ${theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterMain>
          <FooterLogo>
            MX<span> KENYA</span>
          </FooterLogo>
          <Tagline>Fearless • Fast • Kenyan</Tagline>

          <MapContainer>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.773662029687!2d36.761218299999996!3d-1.3111659999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6010d326d5%3A0x61b75168cc8de1b9!2sJamhuri%20Motocross%20Track!5e0!3m2!1sen!2ske!4v1772899736082!5m2!1sen!2ske"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Motocross Track Location"
            ></iframe>
          </MapContainer>

          <BottomBar>
            <p>© {new Date().getFullYear()} MXKENYA. ALL RIGHTS RESERVED.</p>
            <DevCredit
              href="https://weltallis.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Developed by <span>WELT TALLIS</span>
            </DevCredit>
          </BottomBar>
        </FooterMain>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

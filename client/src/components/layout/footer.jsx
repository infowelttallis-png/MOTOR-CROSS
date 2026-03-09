import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const FooterWrapper = styled.footer`
  border-top: 4px solid ${(props) => props.theme?.colors?.primary || "#FF3E00"};
  padding: 80px 0 30px;
  position: relative;
  overflow: hidden;
`;

const Logo = styled.h3`
  font-family: "Orbitron", sans-serif;
  font-weight: 950;
  font-size: 2.2rem;
  font-style: italic;
  margin-bottom: 5px;
  letter-spacing: -1px;
  line-height: 1;

  span {
    color: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
  }
`;

const Tagline = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h4`
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #fff;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: "";
    height: 1px;
    flex: 1;
    background: linear-gradient(to right, rgba(255, 62, 0, 0.5), transparent);
  }
`;

const MiniMap = styled.div`
  width: 100%;
  height: 150px;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  /* Racing Slant */
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);

  iframe {
    width: 100%;
    height: 100%;
    filter: grayscale(1) invert(0.9) brightness(0.8) contrast(1.2);
    border: none;
    transition: 0.5s ease;

    &:hover {
      filter: grayscale(0) invert(0) brightness(1);
    }
  }

  &::before {
    content: "LIVE TRACK GPS";
    position: absolute;
    bottom: 10px;
    right: 20px;
    z-index: 2;
    font-size: 10px;
    font-weight: 900;
    color: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
    background: #000;
    padding: 2px 8px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: all 0.2s ease;
    width: fit-content;

    &:hover {
      color: #fff;
      transform: translateX(8px);
      padding-left: 5px;
      border-left: 3px solid
        ${(props) => props.theme?.colors?.primary || "#FF3E00"};
    }
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;

  a {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    text-decoration: none;
    font-size: 0.65rem;
    font-weight: 900;
    width: 40px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
      color: #000;
      transform: translateY(-5px);
      border-color: #fff;
    }
  }
`;

const BottomBar = styled.div`
  margin-top: 60px;
  padding: 25px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.65rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 2px;

  .dev {
    color: #fff;
    text-decoration: none;
    span {
      color: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const Footer = () => {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.086326164228!2d36.7456748!3d-1.3121985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1bc20170a4a1%3A0xc3f1406e9f193!2sJamhuri%20Park%20Motocross%20Track!5e0!3m2!1sen!2ske!4v1700000000000";

  return (
    <FooterWrapper>
      <Container>
        <Row className="g-5">
          <Col lg={4} md={12}>
            <Logo>
              MX<span>KENYA</span>
            </Logo>
            <Tagline>No Guts No Glory</Tagline>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.8rem",
                lineHeight: "1.6",
                maxWidth: "300px",
              }}
            >
              The heartbeat of East African motocross. Join the elite community
              of riders and fans.
            </p>
            <SocialRow>
              <a href="#">IG</a>
              <a href="#">FB</a>
              <a href="#">YT</a>
              <a href="#">X</a>
            </SocialRow>
          </Col>

          <Col lg={2} md={6}>
            <SectionTitle>RACE HUB</SectionTitle>
            <Links>
              <a href="#">Riders</a>
              <a href="#">Schedule</a>
              <a href="#">Tickets</a>
              <a href="#">Results</a>
            </Links>
          </Col>

          <Col lg={2} md={6}>
            <SectionTitle>COMMUNITY</SectionTitle>
            <Links>
              <a href="#">Gallery</a>
              <a href="#">Shop</a>
              <a href="#">Contact</a>
              <a href="#">Sponsors</a>
            </Links>
          </Col>

          <Col lg={4} md={12}>
            <SectionTitle>LOCATION</SectionTitle>
            <MiniMap>
              <iframe src={mapUrl} title="Jamhuri Track" loading="lazy" />
            </MiniMap>
          </Col>
        </Row>

        <BottomBar>
          <p>© {new Date().getFullYear()} MXKENYA MOTORSPORT FEDERATION</p>
          <a
            href="https://weltallis.com"
            className="dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            DESIGNED BY <span>WELT TALLIS</span>
          </a>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;


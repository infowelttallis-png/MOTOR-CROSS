import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 100px 0;
  background: #000;
  position: relative;
  border-top: 1px solid rgba(255, 77, 0, 0.15);
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BrandingHeader = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  gap: 25px;

  .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #ff4d00, transparent);
    opacity: 0.4;
  }

  h2 {
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 6px;
    color: #fff;
    margin: 0;
    white-space: nowrap;

    span {
      color: #ff4d00;
    }
  }

  @media (max-width: 768px) {
    gap: 15px;
    
    h2 {
      font-size: 0.6rem;
      letter-spacing: 4px;
    }
  }
`;

const EliteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding-bottom: 20px;
    margin-bottom: -20px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    
    /* Hide scrollbar but keep functionality */
    scrollbar-width: thin;
    scrollbar-color: #ff4d00 #1a1a1a;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: #1a1a1a;
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #ff4d00;
      border-radius: 10px;
    }
  }
`;

const SponsorCard = styled.div`
  min-width: 280px;
  height: 160px;
  background: #0a0a0a;
  border: 1px solid
    ${(props) => props.$brandColor + "66" || "rgba(255, 255, 255, 0.15)"};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  overflow: hidden;

  @media (max-width: 768px) {
    min-width: 260px;
    scroll-snap-align: start;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      ${(props) => props.$brandColor + "20"},
      transparent 85%
    );
    opacity: 0.8;
    transition: 0.4s;
  }

  &:hover {
    background: #111;
    border-color: ${(props) => props.$brandColor || "#ff4d00"};
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
    z-index: 2;

    @media (max-width: 768px) {
      transform: translateY(-4px);
    }

    &::after {
      opacity: 1;
    }

    .logo-img {
      transform: scale(1.1);
      filter: brightness(1.15);
    }
  }
`;

const LogoImg = styled.img`
  width: 75%;
  height: 65%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
  filter: brightness(1);
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 0.55rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  z-index: 3;
  pointer-events: none;
`;

const FooterNote = styled.div`
  margin-top: 80px;
  text-align: center;
  opacity: 0.3;
  
  span {
    font-size: 0.6rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 900;
  }

  @media (max-width: 768px) {
    margin-top: 50px;
    
    span {
      font-size: 0.5rem;
      letter-spacing: 3px;
    }
  }
`;

const SponsorSection = () => {
  const partners = [
    {
      name: "Shell",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Shell_logo.svg/1200px-Shell_logo.svg.png",
      tier: "Title Partner",
      color: "#fbce07",
    },
    {
      name: "Safaricom",
      logo: "https://www.safaricom.co.ke/images/safaricom-25.gif",
      tier: "Connectivity",
      color: "#4eb848",
    },
    {
      name: "Red Bull",
      logo: "https://www.redbull.com/v3/resources/images/client/header/redbullcom-logo_double-with-text.svg",
      tier: "Performance",
      color: "#001a30",
    },
    {
      name: "KCB",
      logo: "https://ke.kcbgroup.com/templates/corporate/images/logo.svg",
      tier: "Financial",
      color: "#8cc63f",
    },
  ];

  return (
    <Wrapper>
      <Content>
        <BrandingHeader>
          <h2>
            <span>CHAMPIONSHIP</span> SERIES PARTNERS
          </h2>
          <div className="line" />
        </BrandingHeader>

        <EliteGrid>
          {partners.map((p, i) => (
            <SponsorCard key={i} $brandColor={p.color}>
              <StatusBadge className="status-badge">{p.tier}</StatusBadge>
              <LogoImg src={p.logo} alt={p.name} className="logo-img" />
            </SponsorCard>
          ))}
        </EliteGrid>

        <FooterNote>
          <span>2026 Season Grid Partnerships // Secure Your Brand Position</span>
        </FooterNote>
      </Content>
    </Wrapper>
  );
};

export default SponsorSection;

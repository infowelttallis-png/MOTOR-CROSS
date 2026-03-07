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

    span {
      color: #ff4d00;
    }
  }
`;

const EliteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const SponsorCard = styled.div`
  height: 160px;
  background: #0a0a0a;

  /* BORDER SHOWING BY DEFAULT - Matches Brand Color */
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
    /* Border lights up fully */
    border-color: ${(props) => props.$brandColor || "#ff4d00"};
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
    z-index: 2;

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

        <div style={{ marginTop: "80px", textAlign: "center", opacity: 0.3 }}>
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#fff",
              fontWeight: 900,
            }}
          >
            2026 Season Grid Partnerships // Secure Your Brand Position
          </span>
        </div>
      </Content>
    </Wrapper>
  );
};

export default SponsorSection;

import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 80px 0;
  position: relative;
  /* Removed hardcoded background - inherited from parent */
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BrandingHeader = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 25px;

  .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(
      to right,
      ${(props) => props.theme?.colors?.primary || "#FF3E00"},
      transparent
    );
    opacity: 0.3;
  }

  h2 {
    font-family: ${(props) => props.theme?.fonts?.display || "sans-serif"};
    font-size: 0.75rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #fff;
    margin: 0;

    span {
      color: ${(props) => props.theme?.colors?.primary || "#FF3E00"};
    }
  }
`;

const EliteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
`;

const SponsorCard = styled.div`
  height: 140px;
  /* Border is themed to the brand color of the sponsor with low opacity by default */
  border: 1px solid
    ${(props) =>
      props.$brandColor
        ? props.$brandColor + "40"
        : "rgba(255, 255, 255, 0.1)"};
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      ${(props) =>
        props.$brandColor ? props.$brandColor + "15" : "transparent"},
      transparent 80%
    );
    opacity: 0;
    transition: 0.4s;
  }

  &:hover {
    border-color: ${(props) =>
      props.$brandColor || props.theme?.colors?.primary || "#FF3E00"};
    transform: translateY(-5px) scale(1.02);
    background: rgba(255, 255, 255, 0.05);
    z-index: 2;

    &::after {
      opacity: 1;
    }

    .logo-img {
      transform: scale(1.05);
      /* Brightens slightly on hover for "pop" */
      filter: brightness(1.1);
    }

    .status-badge {
      background: ${(props) => props.$brandColor || "#FF3E00"};
      color: #000;
      border-color: transparent;
    }
  }
`;

const LogoImg = styled.img`
  width: 65%;
  height: 55%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
  /* Dark overlay removed: grayscale filter and brightness reduction are gone */
  filter: none;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 0;
  right: 15%;
  font-size: 0.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.3);
  transition: 0.3s;
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
      color: "#da0000",
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

        <div style={{ marginTop: "60px", textAlign: "center", opacity: 0.4 }}>
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#fff",
              fontWeight: 900,
              fontStyle: "italic",
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

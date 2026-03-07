import React, { useState, memo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SponsorSection from "./sponsorSection"; // Imported as requested

// --- ANIMATIONS (optimized) ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

// --- STYLED COMPONENTS ---
const ResultsWrapper = styled.section`
  background: #010300c8;
  color: #fff;
  font-family: "Inter", sans-serif;
  width: 100%;
  padding: 20px 0;
  animation: ${fadeIn} 0.2s ease; /* Faster fade in */
`;

const ResultsContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
`;

const BackButton = styled.button`
  background: #ff4d00;
  color: #000000;
  border: 2px solid #ff4d00;
  padding: 10px 20px;
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #ff4d00;
    color: #000;
    transform: translateX(-5px);
  }

  .arrow {
    font-size: 1.2rem;
    line-height: 1;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-left: 4px solid #ff4d00;
  padding-left: 15px;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  span {
    color: #ff4d00;
    font-size: 0.65rem;
    display: block;
    letter-spacing: 2px;
    margin-bottom: 2px;
  }
`;

const ClassGrid = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const ClassBtn = styled.button`
  background: ${(props) => (props.$active ? "#ff4d00" : "#0a0a0a")};
  color: ${(props) => (props.$active ? "#fff" : "#666")};
  border: 1px solid ${(props) => (props.$active ? "#333" : "#1a1a1a")};
  border-bottom: 3px solid
    ${(props) => (props.$active ? "#ff4d00" : "transparent")};
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 900;
  font-size: 0.75rem;
  text-transform: uppercase;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  transition: all 0.2s ease;

  &:hover {
    background: #222;
    color: #fff;
  }
`;

const TableFrame = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 4px;
`;

const GridTemplate = styled.div`
  display: grid;
  grid-template-columns: 80px 120px 80px 200px 10px;
  column-gap: 15px;
  min-width: 650px;
  align-items: center;
  padding: 10px 20px;
`;

const TableHeader = styled(GridTemplate)`
  background: #0a0a0a;
  font-size: 0.65rem;
  font-weight: 900;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const TableRow = styled(GridTemplate)`
  border-bottom: 1px solid #111;
  animation: ${fadeIn} 0.2s ease forwards;
  animation-delay: ${(props) => props.$index * 0.02}s;
  opacity: 0;
  background: ${(props) =>
    props.$offTrack ? "rgba(255, 0, 0, 0.02)" : "transparent"};

  &:hover {
    background: rgba(255, 77, 0, 0.05);
  }
`;

const Position = styled.div`
  font-family: "Orbitron", sans-serif;
  font-weight: 950;
  font-size: 1rem;
  color: ${(props) => (props.$index < 3 ? "#ff4d00" : "#444")};
  font-style: italic;
`;

const RiderName = styled.div`
  .name {
    font-weight: 800;
    font-size: 0.85rem;
    color: ${(props) => (props.$offTrack ? "#666" : "#fff")};
  }
  .team {
    font-size: 0.55rem;
    color: #444;
    text-transform: uppercase;
  }
`;

const StatusTag = styled.div`
  font-size: 0.55rem;
  font-weight: 900;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => (props.$active ? "#00ff66" : "#ff4444")};
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    animation: ${blink} 1.5s infinite;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 160px;
  height: 6px;
  background: #111;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.$offTrack &&
    `
    background: transparent;
    border: 1px dashed #333;
  `}
`;

const Fill = styled.div`
  height: 100%;
  width: ${(props) => props.$percent}%;
  transition: width 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67);

  background: ${(props) => {
    if (props.$offTrack) return "#222222";
    if (props.$percent >= 90) return "#fff";
    if (props.$percent >= 60) return "#fbbf24";
    return "#10b981";
  }};

  box-shadow: ${(props) =>
    props.$percent >= 90 && !props.$offTrack ? "0 0 8px #fff" : "none"};
`;

const Points = styled.div`
  text-align: right;
  font-family: "JetBrains Mono", monospace;
  font-weight: 900;
  color: ${(props) => (props.$offTrack ? "#444" : "#fff")};
  font-size: 0.8rem;
  span {
    font-size: 0.55rem;
    color: #444;
    margin-left: 2px;
  }
`;

const ResultsSection = () => {
  const [activeClass, setActiveClass] = useState("MX1");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isFullPage = location.pathname === "/results";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const results = [
    { name: "E. KIMANI", team: "RED BULL KTM", status: "Active", pts: 100 },
    { name: "L. KWAMBAI", team: "ROCKSTAR HUSKY", status: "Active", pts: 88 },
    { name: "Z. MUTUA", team: "MONSTER YAMAHA", status: "Active", pts: 82 },
    { name: "M. OTIENO", team: "TLD GASGAS", status: "Off-Track", pts: 71 },
    { name: "J. SHAH", team: "MOTOSPORT KE", status: "Active", pts: 65 },
    { name: "D. KIPROP", team: "HONDA RACING", status: "Active", pts: 58 },
    { name: "S. MAINA", team: "PRIVATEER", status: "Active", pts: 42 },
    { name: "P. LEWA", team: "KTM KENYA", status: "Off-Track", pts: 35 },
    { name: "R. LANGAT", team: "HUSQVARNA KE", status: "Active", pts: 28 },
    { name: "B. WAWERU", team: "SHERCO KE", status: "Active", pts: 12 },
  ];

  if (!isVisible) return null;

  return (
    <ResultsWrapper>
      <ResultsContainer>
        {isFullPage && (
          <BackButton onClick={() => navigate("/")}>
            <span className="arrow">←</span> BACK TO HOME
          </BackButton>
        )}

        <HeaderSection>
          <Title>
            <span>LIVE // RACE 1</span>
            Race Leaderboard
          </Title>
          <div
            style={{
              textAlign: "right",
              fontSize: "0.65rem",
              color: "#444",
              fontWeight: "900",
            }}
          >
            CIRCUIT MX1 • 2026
          </div>
        </HeaderSection>

        <ClassGrid>
          {["MX50", "MX65", "MX85", "MX2", "MX1"].map((c) => (
            <ClassBtn
              key={c}
              $active={activeClass === c}
              onClick={() => setActiveClass(c)}
            >
              {c}
            </ClassBtn>
          ))}
        </ClassGrid>

        <TableFrame>
          <TableHeader>
            <div>Pos</div>
            <div>Rider / Team</div>
            <div>Status</div>
            <div>Efficiency</div>
            <div style={{ textAlign: "right" }}>Pts</div>
          </TableHeader>

          {results.map((r, i) => (
            <TableRow key={i} $index={i} $offTrack={r.status === "Off-Track"}>
              <Position $index={i}>P{i + 1}</Position>

              <RiderName $offTrack={r.status === "Off-Track"}>
                <div className="name">{r.name}</div>
                <div className="team">{r.team}</div>
              </RiderName>

              <StatusTag $active={r.status === "Active"}>
                <div className="dot" />
                {r.status === "Active" ? "Active" : "Off-Track"}
              </StatusTag>

              <ProgressBarContainer $offTrack={r.status === "Off-Track"}>
                <Fill $percent={r.pts} $offTrack={r.status === "Off-Track"} />
              </ProgressBarContainer>

              <Points $offTrack={r.status === "Off-Track"}>{r.pts}</Points>
            </TableRow>
          ))}
        </TableFrame>

        {/* SPONSOR SECTION INTEGRATED HERE */}
        <SponsorSection />
      </ResultsContainer>
    </ResultsWrapper>
  );
};

export default memo(ResultsSection);

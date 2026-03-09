import React, { useState, memo } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import SponsorSection from "./sponsorSection";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ResultsWrapper = styled.section`
  color: #fff;
  padding: 40px 0;
`;

const BackBtn = styled.button`
  background: ${props => props.theme?.colors?.primary || "#FF3E00"};
  color: #000;
  border: none;
  padding: 8px 20px;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  margin-bottom: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateX(-5px);
    filter: brightness(1.2);
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
  border-left: 4px solid ${props => props.theme?.colors?.primary || "#FF3E00"};
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h1 {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    span {
      color: ${props => props.theme?.colors?.primary || "#FF3E00"};
      font-size: 0.6rem;
      display: block;
      letter-spacing: 3px;
      margin-bottom: 5px;
    }
  }
`;

const TableFrame = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px 160px 60px;
  align-items: center;
  padding: 14px 25px;
  gap: 20px;
  min-width: 750px;
`;

const HeaderRow = styled(Grid)`
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${props => props.theme?.colors?.primary || "#FF3E00"};
`;

const Row = styled(Grid)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  animation: ${fadeIn} 0.3s ease forwards;
  
  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const Pts = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-weight: 900;
  font-size: 1.1rem;
  color: ${props => props.$off ? "#444" : "#fff"};
`;

const RiderBox = styled.div`
  .n { font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: ${props => props.$off ? "#555" : "#fff"}; }
  .t { font-size: 0.6rem; color: rgba(255,255,255,0.3); text-transform: uppercase; font-weight: 700; }
`;

const Status = styled.div`
  font-size: 0.6rem;
  font-weight: 900;
  text-transform: uppercase;
  color: ${props => props.$active ? "#00ff66" : "#ff4444"};
`;

const BarBase = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  width: ${props => props.$val}%;
  transition: width 1s ease;

  background: ${props => {
    if (props.$off) return "#222";
    if (props.$val >= 90) return "#ffffff"; // Elite - White
    if (props.$val >= 75) return "#fbbf24"; // Top Tier - Yellow
    return "#10b981"; // Active - Green
  }};
  
  box-shadow: ${props => (props.$val >= 90 && !props.$off) ? "0 0 10px rgba(255,255,255,0.5)" : "none"};
`;

const Pos = styled.div`
  text-align: right;
  font-weight: 950;
  font-style: italic;
  font-size: 1rem;
  color: ${props => {
    if (props.$idx === 0) return "#FFD700"; // Gold
    if (props.$idx === 1) return "#C0C0C0"; // Silver
    if (props.$idx === 2) return "#CD7F32"; // Bronze
    return "rgba(255,255,255,0.1)";
  }};
`;

const ResultsSection = () => {
  const navigate = useNavigate();
  const results = [
    { n: "E. KIMANI", t: "RED BULL KTM", s: "Active", p: 100 },
    { n: "L. KWAMBAI", t: "ROCKSTAR HUSKY", s: "Active", p: 88 },
    { n: "Z. MUTUA", t: "MONSTER YAMAHA", s: "Active", p: 82 },
    { n: "M. OTIENO", t: "TLD GASGAS", s: "Off-Track", p: 71 },
    { n: "J. SHAH", t: "MOTOSPORT KE", s: "Active", p: 65 },
    { n: "D. KIPROP", t: "HONDA RACING", s: "Active", p: 58 },
  ];

  return (
    <ResultsWrapper>
      <div className="container">
        <BackBtn onClick={() => navigate("/")}>← Back to Home</BackBtn>

        <Header>
          <h1><span>2026 SERIES</span>Live Standings</h1>
          <div style={{fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', fontWeight: 900}}>JAMHURI PARK CIRCUIT</div>
        </Header>

        <TableFrame>
          <HeaderRow>
            <div>Points</div>
            <div>Rider / Team</div>
            <div>Status</div>
            <div>Efficiency</div>
            <div style={{textAlign: 'right'}}>Pos</div>
          </HeaderRow>

          {results.map((r, i) => (
            <Row key={i} $off={r.s === "Off-Track"}>
              <Pts $off={r.s === "Off-Track"}>{r.p}</Pts>
              <RiderBox $off={r.s === "Off-Track"}>
                <div className="n">{r.n}</div>
                <div className="t">{r.t}</div>
              </RiderBox>
              <Status $active={r.s === "Active"}>{r.s}</Status>
              <BarBase>
                <BarFill $val={r.p} $off={r.s === "Off-Track"} />
              </BarBase>
              <Pos $idx={i}>P{i + 1}</Pos>
            </Row>
          ))}
        </TableFrame>

        <div style={{ marginTop: "60px" }}>
          <SponsorSection />
        </div>
      </div>
    </ResultsWrapper>
  );
};

export default memo(ResultsSection);

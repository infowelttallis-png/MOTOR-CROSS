import React, { useState, memo, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import SponsorSection from "./sponsorSection";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

// Main Styled Components
const ResultsWrapper = styled.section`
  color: #fff;
  padding: 40px 0;
  position: relative;
`;

const BackBtn = styled(motion.button)`
  background: #ff5100;
  color: #000;
  border: none;
  padding: 8px 20px;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateX(-5px);
    filter: brightness(1.2);
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
  border-left: 4px solid #ff5100;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    line-height: 1.2;
    span {
      color: #ff5100;
      font-size: 0.6rem;
      display: block;
      letter-spacing: 3px;
      margin-bottom: 5px;
    }
  }
`;

const LiveIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 15px;
  border-radius: 20px;
  border: 1px solid rgba(255, 81, 0, 0.3);
  width: fit-content;

  .dot {
    width: 8px;
    height: 8px;
    background: #ff3300;
    border-radius: 50%;
    animation: ${pulse} 1.5s infinite;
  }

  span {
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #ff5100;
  }
`;

// REMOVED CircuitInfo component entirely

// Table Components
const TableFrame = styled(motion.div)`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

// Mobile-optimized grid
const Grid = styled.div`
  display: grid;
  grid-template-columns: 45px 25px 1fr 70px 70px 60px;
  align-items: center;
  padding: 12px 10px;
  gap: 8px;

  @media (min-width: 768px) {
    grid-template-columns: 60px 30px 1fr 80px 100px 80px;
    padding: 14px 20px;
    gap: 15px;
    min-width: 850px;
  }
`;

const HeaderRow = styled(Grid)`
  font-size: 0.6rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ff5100;
  border-bottom: 1px solid rgba(255, 81, 0, 0.2);

  @media (min-width: 768px) {
    font-size: 0.65rem;
    letter-spacing: 2px;
  }
`;

const Row = styled(Grid)`
  animation: ${fadeIn} 0.3s ease forwards;
  transition: 0.3s;
  border-bottom: 1px solid rgba(255, 81, 0, 0.05);

  ${(props) =>
    props.$kenyan &&
    `
    background: linear-gradient(90deg, rgba(0, 102, 0, 0.1) 0%, transparent 100%);
    border-left: 2px solid #006600;
  `}

  &:hover {
    background: rgba(255, 81, 0, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Position = styled.div`
  font-weight: 900;
  font-size: 1rem;
  font-family: "Orbitron", monospace;
  color: ${(props) => {
    if (props.$pos === 1) return "#FFD700";
    if (props.$pos === 2) return "#C0C0C0";
    if (props.$pos === 3) return "#CD7F32";
    return "rgba(255,255,255,0.2)";
  }};

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const KenyanFlag = styled.span`
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const RiderCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RiderAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff5100, #ffaa00);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.65rem;
  color: #000;

  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 0.8rem;
  }
`;

const RiderBox = styled.div`
  .name {
    font-weight: 800;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: ${(props) => (props.$off ? "#555" : "#fff")};
    white-space: nowrap;

    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  }
  .team {
    font-size: 0.5rem;
    color: ${(props) => (props.$off ? "rgba(255,255,255,0.2)" : "#ff5100")};
    text-transform: uppercase;
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: 0.6rem;
    }
  }
`;

const Status = styled.div`
  font-size: 0.5rem;
  font-weight: 900;
  text-transform: uppercase;
  color: ${(props) => (props.$active ? "#00ff66" : "#ff4444")};
  background: ${(props) =>
    props.$active ? "rgba(0,255,102,0.1)" : "rgba(255,68,68,0.1)"};
  padding: 3px 5px;
  border-radius: 4px;
  text-align: center;
  width: fit-content;

  @media (min-width: 768px) {
    font-size: 0.6rem;
    padding: 4px 8px;
  }
`;

const Points = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-weight: 900;
  font-size: 0.9rem;
  color: ${(props) => (props.$off ? "#444" : "#fff")};
  text-align: right;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BarBase = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 6px;
  }
`;

const BarFill = styled.div`
  height: 100%;
  width: ${(props) => props.$val}%;
  transition: width 1s ease;
  background: ${(props) => {
    if (props.$off) return "#333";
    if (props.$val >= 90) return "#ffaa00";
    if (props.$val >= 75) return "#fbbf24";
    return "#ff5100";
  }};
`;

// Video Highlights Components
const HighlightsSection = styled(motion.section)`
  margin: 40px 0;
  position: relative;
  overflow: hidden;
`;

const HighlightsTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 20px 0;

  span {
    color: #ff5100;
    font-size: 0.7rem;
    display: block;
    letter-spacing: 2px;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const VideoCard = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 81, 0, 0.2);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VideoInfo = styled.div`
  padding: 12px;

  h3 {
    color: #ff5100;
    font-size: 0.9rem;
    font-weight: 900;
    margin: 0 0 5px 0;
    text-transform: uppercase;
  }

  p {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 8px 0;
  }

  .meta {
    display: flex;
    gap: 10px;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.4);
    flex-wrap: wrap;

    span {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
`;

const ResultsSection = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Kenyan motocross results
  const results = [
    {
      id: 1,
      name: "E. KIMANI",
      team: "RED BULL KTM",
      status: "Active",
      points: 245,
      kenyan: true,
      initials: "EK",
    },
    {
      id: 2,
      name: "L. KWAMBAI",
      team: "ROCKSTAR HUSKY",
      status: "Active",
      points: 218,
      kenyan: true,
      initials: "LK",
    },
    {
      id: 3,
      name: "Z. MUTUA",
      team: "MONSTER YAMAHA",
      status: "Active",
      points: 202,
      kenyan: true,
      initials: "ZM",
    },
    {
      id: 4,
      name: "M. OTIENO",
      team: "TLD GASGAS",
      status: "Injured",
      points: 171,
      kenyan: true,
      initials: "MO",
    },
    {
      id: 5,
      name: "J. SHAH",
      team: "MOTOSPORT KE",
      status: "Active",
      points: 165,
      kenyan: true,
      initials: "JS",
    },
    {
      id: 6,
      name: "D. KIPROP",
      team: "HONDA RACING",
      status: "Active",
      points: 158,
      kenyan: true,
      initials: "DK",
    },
  ];

  // Video highlights data
  const highlightVideos = [
    {
      id: 1,
      title: "Junior Showdown",
      description: "KTM 65 vs KTM 50 - Future stars battle",
      embedUrl:
        "https://www.youtube.com/embed/L2aqXiXrvdc?autoplay=1&mute=1&loop=1&playlist=L2aqXiXrvdc",
      views: "9.2M",
      time: "2 days",
    },
    {
      id: 2,
      title: "MXGP France 2025",
      description: "World championship highlights",
      embedUrl:
        "https://www.youtube.com/embed/oiiD635oRw0?autoplay=1&mute=1&loop=1&playlist=oiiD635oRw0",
      views: "586K",
      time: "11 months",
    },
    {
      id: 3,
      title: "Kimani's Winning Move",
      description: "Last lap pass at Nakuru",
      embedUrl:
        "https://www.youtube.com/embed/L2aqXiXrvdc?autoplay=1&mute=1&loop=1&playlist=L2aqXiXrvdc&start=20",
      views: "124K",
      time: "5 hours",
    },
  ];

  const maxPoints = Math.max(...results.map((r) => r.points));

  return (
    <ResultsWrapper>
      <div className="container">
        {/* Back Button */}
        <BackBtn
          onClick={() => navigate("/")}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </BackBtn>

        {/* Header */}
        <Header>
          <h1>
            <span>2026 KENYAN CHAMPIONSHIP</span>
            Live Standings
          </h1>
          <LiveIndicator
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="dot" />
            <span>LIVE</span>
          </LiveIndicator>
        </Header>

        {/* RESULTS TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <h2
            style={{ color: "#fff", marginBottom: "15px", fontSize: "1.1rem" }}
          >
            <span style={{ color: "#ff5100" }}>🏆</span> STANDINGS
          </h2>

          <TableFrame ref={ref}>
            <HeaderRow>
              <div>POS</div>
              <div></div>
              <div>RIDER</div>
              <div>STATUS</div>
              <div>PTS</div>
              <div>%</div>
            </HeaderRow>

            {results.map((r, i) => {
              const efficiency = Math.round((r.points / maxPoints) * 100);

              return (
                <Row key={i} $kenyan={r.kenyan}>
                  <Position $pos={i + 1}>#{i + 1}</Position>
                  <div>{r.kenyan ? <KenyanFlag>🇰🇪</KenyanFlag> : "🌍"}</div>
                  <RiderCell>
                    <RiderAvatar>{r.initials}</RiderAvatar>
                    <RiderBox $off={r.status === "Injured"}>
                      <div className="name">{r.name}</div>
                      <div className="team">{r.team}</div>
                    </RiderBox>
                  </RiderCell>
                  <Status $active={r.status === "Active"}>
                    {r.status === "Active" ? "Racing" : "Out"}
                  </Status>
                  <Points $off={r.status === "Injured"}>{r.points}</Points>
                  <BarBase>
                    <BarFill $val={efficiency} $off={r.status === "Injured"} />
                  </BarBase>
                </Row>
              );
            })}
          </TableFrame>
        </motion.div>

        {/* VIDEO HIGHLIGHTS */}
        <HighlightsSection
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <HighlightsTitle>
            <span>WATCH</span>
            Highlights
          </HighlightsTitle>

          <VideoGrid>
            {highlightVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + 0.1 * index }}
              >
                <VideoContainer>
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </VideoContainer>
                <VideoInfo>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className="meta">
                    <span>👁️ {video.views}</span>
                    <span>📅 {video.time}</span>
                  </div>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        </HighlightsSection>

        {/* SPONSOR SECTION */}
        <div style={{ marginTop: "40px" }}>
          <SponsorSection />
        </div>
      </div>
    </ResultsWrapper>
  );
};

export default memo(ResultsSection);

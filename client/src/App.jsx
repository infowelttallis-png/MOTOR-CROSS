// App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./styles/globalStyles";
import Header from "./components/layout/header";
import Footer from "./components/layout/Footer";
import EventDetails from "./components/pages/eventsDetails"; // Create this file next

// Lazy load all sections
const HeroSection = lazy(() => import("./components/sections/heroSection"));
const EventsSection = lazy(() => import("./components/pages/eventsSection"));
const CTASection = lazy(() => import("./components/pages/ctaSection"));
const ResultsSection = lazy(
  () => import("./components/sections/resultsSection"),
);

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000000;
`;

const MainContent = styled.main`
  flex: 1 0 auto;
  width: 100%;
`;

// Loading spinner component
const LoadingSpinner = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;

  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 3px solid #ff4d00;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Home page component
const HomePage = () => (
  <>
    <HeroSection />
    <EventsSection />
    <CTASection />
  </>
);

// Results page component
const ResultsPage = () => (
  <div style={{ padding: "100px 0 40px 0" }}>
    <ResultsSection />
  </div>
);

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/events/:id" element={<EventDetails />} />
            </Routes>
          </Suspense>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;

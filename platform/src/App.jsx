import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TrackDetails from "./pages/TrackDetails";
import TopicLearningPage from "./pages/TopicLearningPage";

export default function App() {
  return (
    <Router basename="/interviewOrbit/platform">
      <div className="min-h-screen bg-[#080d22] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tracks/:trackId" element={<TrackDetails />} />
            {/* Dynamic Route: /java/oops */}
            <Route path="/:trackId/:topicId" element={<TopicLearningPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

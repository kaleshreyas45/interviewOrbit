import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Code2,
  HelpCircle,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  Sparkles,
  AlertCircle,
  Bookmark,
  Lightbulb,
  ChevronLeft,
  Layers,
  Cpu,
  Workflow,
  Menu,
  X,
  Tag,
  AlertTriangle,
  PlayCircle,
  ListOrdered,
  Info,
} from "lucide-react";

const BASE_API_URL = "https://kaleshreyas45.github.io/java-full-stack-learning";

export default function TopicLearningPage() {
  const { trackId, topicId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for guaranteed scroll-to-top
  const mainContentRef = useRef(null);
  const questionTopRef = useRef(null);

  // Mobile / Tablet Drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Top header tab: 'concepts' | 'interviews'
  const [activeTab, setActiveTab] = useState("concepts");
  // Sub-tab inside view: 'theory' | 'code'
  const [subTab, setSubTab] = useState("theory");

  // Selection states
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(0);
  const [activeInterviewCategory, setActiveInterviewCategory] =
    useState("conceptual"); // 'conceptual' | 'tricky' | 'scenarioBased'
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);

  // Floating Back to Top Button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll detection for Back to Top Button
  useEffect(() => {
    const checkScroll = () => {
      const mainScroll = mainContentRef.current
        ? mainContentRef.current.scrollTop
        : 0;
      const windowScroll =
        window.scrollY || document.documentElement.scrollTop;
      if (mainScroll > 300 || windowScroll > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    const mainEl = mainContentRef.current;
    if (mainEl) {
      mainEl.addEventListener("scroll", checkScroll, { passive: true });
    }
    window.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      if (mainEl) mainEl.removeEventListener("scroll", checkScroll);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Guaranteed Scroll to Question Top when changing questions
  const handleQuestionChange = (newIndex) => {
    setSelectedQuestionIndex(newIndex);
    setSubTab("theory");

    setTimeout(() => {
      if (questionTopRef.current) {
        questionTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 10);
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const endpoint = `${BASE_API_URL}/${trackId}/${topicId}.json`;
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [trackId, topicId]);

  const copyCode = (code, key) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Helper to format Java keywords in notes
  const formatWithCodeBadges = (text) => {
    if (!text) return "";
    const keywords = [
      "new",
      "private",
      "package-private",
      "protected",
      "public",
      "extends",
      "implements",
      "abstract",
      "final",
      "static",
      "void",
      "class",
      "interface",
      "record",
      "super",
      "this",
    ];
    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      keywords.includes(part) ? (
        <code
          key={i}
          className="font-mono text-cyan-300 font-semibold px-1 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-[11px] sm:text-xs"
        >
          {part}
        </code>
      ) : (
        part
      )
    );
  };

  // Render Walkthrough Sub-Component
  const renderWalkthroughSection = (walkthrough) => {
    if (!walkthrough) return null;

    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0d1227] border border-blue-500/20 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-cyan-400">
              <Terminal size={16} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-cyan-300">
                Architectural Walkthrough &amp; Execution
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                Deconstructed steps, runtime flow, and compiler semantics.
              </p>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">
            {walkthrough.steps?.length || 0} Steps
          </span>
        </div>

        {/* 1. High-Level Approach */}
        {walkthrough.approach && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-2.5">
            <Sparkles size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 block mb-0.5">
                Core Approach
              </span>
              <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
                {walkthrough.approach}
              </p>
            </div>
          </div>
        )}

        {/* 2. Step-by-Step Breakdown */}
        {walkthrough.steps && walkthrough.steps.length > 0 && (
          <div className="space-y-3 pt-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ListOrdered size={14} className="text-cyan-400" /> Execution Steps
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {walkthrough.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#151a30]/80 border border-white/5 hover:border-cyan-500/30 transition-all space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-cyan-300 border border-blue-400/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {sIdx + 1}
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-tight">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Runtime Flow */}
        {walkthrough.flow && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#151a30]/60 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <PlayCircle size={14} /> Runtime Lifecycle Flow
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {walkthrough.flow}
            </p>
          </div>
        )}

        {/* 4. Common Pitfalls / Anti-patterns */}
        {walkthrough.pitfalls && walkthrough.pitfalls.length > 0 && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <AlertTriangle size={14} /> Pitfalls &amp; Traps to Avoid
            </span>
            <ul className="space-y-1.5">
              {walkthrough.pitfalls.map((pitfall, pIdx) => (
                <li
                  key={pIdx}
                  className="flex items-start gap-2 text-xs text-slate-200"
                >
                  <span className="text-amber-400 shrink-0 mt-0.5">⚠️</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. Key Line Directives */}
        {walkthrough.keyLines && walkthrough.keyLines.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 block">
              Key Line Takeaways
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {walkthrough.keyLines.map((kl, klIdx) => (
                <div
                  key={klIdx}
                  className="p-3 rounded-lg bg-[#080d22] border border-white/5 flex items-start gap-2"
                >
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-mono text-[10px] shrink-0 font-bold">
                    Line {kl.line}
                  </span>
                  <p className="text-xs text-slate-300 leading-snug">
                    {kl.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d22] text-white flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-300 font-mono text-xs sm:text-sm text-center">
          Loading curriculum for{" "}
          <span className="text-cyan-400">
            /{trackId}/{topicId}
          </span>
          ...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#080d22] text-white flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="p-6 sm:p-8 max-w-md w-full rounded-2xl bg-[#0d1227] border border-red-500/30 text-center space-y-4">
          <AlertCircle size={28} className="text-red-400 mx-auto" />
          <h2 className="text-xl font-bold">Topic Not Found</h2>
          <p className="text-sm text-slate-300">
            {error || "Curriculum not available."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition"
          >
            <ArrowLeft size={16} /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  const concepts = data.concepts || [];
  const interviewQuestionsData = data.interviewQuestions || {};

  const conceptualList = interviewQuestionsData.conceptual || [];
  const trickyList = interviewQuestionsData.tricky || [];
  const scenarioList =
    interviewQuestionsData.scenarioBased ||
    interviewQuestionsData.scenario ||
    [];

  const currentQuestionsList =
    activeInterviewCategory === "tricky"
      ? trickyList
      : activeInterviewCategory === "scenarioBased"
        ? scenarioList
        : conceptualList;

  const activeConcept = concepts[selectedConceptIndex] || concepts[0] || {};
  const activeQuestion =
    currentQuestionsList[selectedQuestionIndex] || currentQuestionsList[0];

  const conceptCode =
    activeConcept.basicExample?.code ||
    activeConcept.codeExample?.code ||
    activeConcept.code ||
    "";

  const conceptOutput =
    activeConcept.basicExample?.output ||
    activeConcept.codeExample?.output ||
    activeConcept.output ||
    "";

  const conceptWalkthrough =
    activeConcept.basicExample?.walkthrough || activeConcept.walkthrough;

  const legacyConceptExplanations =
    activeConcept.codeExplanation ||
    activeConcept.basicExample?.codeExplanation ||
    activeConcept.basicExample?.detailedExplanation?.lineByLine ||
    activeConcept.detailedExplanation?.lineByLine ||
    (Array.isArray(activeConcept.detailedExplanation)
      ? activeConcept.detailedExplanation
      : []);

  return (
    <div className="min-h-screen bg-[#080d22] text-slate-200 flex flex-col font-sans overflow-x-hidden relative">
      {/* Top Header */}
      <header className="h-16 border-b border-white/10 bg-[#0d1227] px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-[#151a30] text-slate-300 hover:text-white border border-white/10 transition shrink-0"
            aria-label="Open Curriculum Menu"
          >
            <Menu size={18} />
          </button>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition shrink-0"
          >
            <ArrowLeft size={15} />
            <span className="hidden xs:inline">Back</span>
          </Link>
          <span className="text-slate-600 hidden xs:inline">/</span>
          <span className="text-xs uppercase font-mono text-slate-400 hidden sm:inline truncate max-w-[90px]">
            {trackId}
          </span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-xs font-mono text-cyan-400 font-semibold truncate max-w-[110px] sm:max-w-none">
            {topicId}
          </span>
        </div>

        {/* View Switcher: Concepts vs Interview Q&A */}
        <div className="flex items-center bg-[#151a30] p-1 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => {
              setActiveTab("concepts");
              setSubTab("theory");
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "concepts"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} className="shrink-0" />
            <span>Concepts</span>
            <span className="hidden sm:inline">({concepts.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("interviews");
              setSubTab("theory");
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "interviews"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle size={13} className="shrink-0" />
            <span>Interview Q&amp;A</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Mobile / Tablet Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={`
            fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-[#0d1227] border-r border-white/10 z-50 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out
            lg:static lg:translate-x-0 lg:z-10 lg:w-72 xl:w-80 lg:shrink-0
            ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          `}
        >
          {/* Mobile Drawer Header */}
          <div className="lg:hidden p-4 border-b border-white/10 flex items-center justify-between bg-[#151a30]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Curriculum Navigation
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          {/* 1. Concepts Section */}
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Core Curriculum
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-300">
                JDK 21 LTS
              </span>
            </div>
            <div className="mt-3 space-y-1">
              {concepts.map((concept, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab("concepts");
                    setSelectedConceptIndex(idx);
                    setSubTab("theory");
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between text-xs ${
                    activeTab === "concepts" && selectedConceptIndex === idx
                      ? "bg-blue-600/20 text-cyan-300 border border-blue-500/40 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="truncate pr-2">
                    {String(concept.learningOrder || idx + 1).padStart(2, "0")}
                    . {concept.name || concept.title}
                  </span>
                  <ChevronRight size={13} className="shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Interview Questions & 3 Subtopics */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <HelpCircle size={13} /> Interview Drills
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Subtopic 1: Conceptual */}
            <button
              onClick={() => {
                setActiveTab("interviews");
                setActiveInterviewCategory("conceptual");
                setSelectedQuestionIndex(0);
                setSubTab("theory");
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl transition border ${
                activeTab === "interviews" &&
                activeInterviewCategory === "conceptual"
                  ? "bg-blue-600/20 text-white border-blue-500/50 shadow-lg shadow-blue-950/50"
                  : "bg-[#151a30]/60 text-slate-400 hover:text-white border-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-cyan-400 shrink-0" />
                  <span className="text-xs font-bold">Conceptual Questions</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  {conceptualList.length} Qs
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-1">
                Core paradigm principles &amp; memory models.
              </p>
            </button>

            {/* Subtopic 2: Tricky */}
            <button
              onClick={() => {
                setActiveTab("interviews");
                setActiveInterviewCategory("tricky");
                setSelectedQuestionIndex(0);
                setSubTab("theory");
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl transition border ${
                activeTab === "interviews" &&
                activeInterviewCategory === "tricky"
                  ? "bg-blue-600/20 text-white border-blue-500/50 shadow-lg shadow-blue-950/50"
                  : "bg-[#151a30]/60 text-slate-400 hover:text-white border-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-amber-400 shrink-0" />
                  <span className="text-xs font-bold">Tricky Questions</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {trickyList.length || 8} Qs
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-1">
                Method hiding vs overriding, static binding edge-cases.
              </p>
            </button>

            {/* Subtopic 3: Scenario-Based */}
            <button
              onClick={() => {
                setActiveTab("interviews");
                setActiveInterviewCategory("scenarioBased");
                setSelectedQuestionIndex(0);
                setSubTab("theory");
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl transition border ${
                activeTab === "interviews" &&
                activeInterviewCategory === "scenarioBased"
                  ? "bg-blue-600/20 text-white border-blue-500/50 shadow-lg shadow-blue-950/50"
                  : "bg-[#151a30]/60 text-slate-400 hover:text-white border-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Workflow size={14} className="text-purple-400 shrink-0" />
                  <span className="text-xs font-bold">Scenario-Based</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  {scenarioList.length || 6} Qs
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-1">
                Refactoring procedural code, microservice contracts.
              </p>
            </button>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main
          ref={mainContentRef}
          className="flex-1 flex flex-col justify-between overflow-y-auto w-full min-w-0"
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">

            {/* ======================================================== */}
            {/* VIEW 1: CONCEPTS                                         */}
            {/* ======================================================== */}
            {activeTab === "concepts" && activeConcept && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                    Concept Module 0
                    {activeConcept.learningOrder || selectedConceptIndex + 1}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                    {activeConcept.name || activeConcept.title}
                  </h1>

                  {activeConcept.interviewTip && (
                    <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-2.5">
                      <Sparkles
                        size={17}
                        className="text-cyan-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold block mb-0.5">
                          Concept Interview Tip
                        </span>
                        <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed">
                          {activeConcept.interviewTip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sub-tabs: Theory vs Code */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-[#151a30] border border-white/10 w-fit">
                  <button
                    onClick={() => setSubTab("theory")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition ${
                      subTab === "theory"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <BookOpen size={14} />
                    <span>Theory</span>
                  </button>
                  <button
                    onClick={() => setSubTab("code")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition ${
                      subTab === "code"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Code2 size={14} />
                    <span>Code &amp; Walkthrough</span>
                  </button>
                </div>

                {/* CONCEPT SUB-TAB 1: THEORY */}
                {subTab === "theory" && (
                  <div className="space-y-6 animate-fadeIn">
                    <section className="p-4 sm:p-6 rounded-2xl bg-[#0d1227] border border-blue-500/20 shadow-xl space-y-5">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400">
                            <Sparkles size={15} />
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                            Fundamental Mastery
                          </span>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                          Quick Ref
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        Core Concept Essentials &amp; Engineering Notes
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeConcept.definition && (
                          <div className="p-4 sm:p-5 rounded-xl bg-[#151a30]/90 border border-blue-500/30 flex flex-col justify-between hover:border-blue-400/50 transition">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-300 border border-blue-400/20">
                                  <Bookmark size={13} />
                                  Blueprint Model
                                </span>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  01
                                </span>
                              </div>
                              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 mb-2">
                                Formal Definition
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                                {activeConcept.definition}
                              </p>
                            </div>
                          </div>
                        )}

                        {activeConcept.realWorldExample && (
                          <div className="p-4 sm:p-5 rounded-xl bg-[#151a30]/90 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-400/50 transition">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                                  <Lightbulb size={13} />
                                  Concrete Analogy
                                </span>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  02
                                </span>
                              </div>
                              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 mb-2">
                                Real-World Example
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                                {activeConcept.realWorldExample}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {activeConcept.howItWorksDetailed && (
                        <div className="p-4 rounded-xl bg-[#151a30]/60 border border-white/5 space-y-1.5">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                            <Info size={14} /> How It Works Under The Hood
                          </span>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {activeConcept.howItWorksDetailed}
                          </p>
                        </div>
                      )}

                      {activeConcept.javaNotes &&
                        activeConcept.javaNotes.length > 0 && (
                          <div className="p-4 sm:p-5 rounded-xl bg-[#080d22]/90 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300">
                                Java Notes &amp; Engineering Rules
                              </span>
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                                {activeConcept.javaNotes.length} Key Rules
                              </span>
                            </div>

                            <ul className="flex flex-col gap-2 pt-1 text-xs text-slate-300">
                              {activeConcept.javaNotes.map((note, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#151a30]/80 hover:bg-[#1a213e] transition-colors border border-white/5"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                                  <span className="leading-relaxed text-xs sm:text-[13px]">
                                    {formatWithCodeBadges(note)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </section>

                    {activeConcept.whyItExists && (
                      <section className="p-4 sm:p-6 rounded-2xl bg-[#0d1227] border border-blue-500/20 shadow-xl space-y-5 sm:space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                              Architectural Rationale
                            </span>
                          </div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            Design Intent
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          Why This Concept Exists in Software Architecture
                        </h3>

                        {activeConcept.whyItExists.explanation && (
                          <div className="p-3.5 sm:p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                            <div className="p-1.5 rounded-lg bg-blue-600/20 text-cyan-400 shrink-0">
                              <Sparkles size={16} />
                            </div>
                            <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed">
                              {activeConcept.whyItExists.explanation}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeConcept.whyItExists.designProblemSolved && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#151a30]/80 border border-emerald-500/30 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                  <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                                    <CheckCircle2 size={15} />
                                  </span>
                                  <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-emerald-300">
                                    Design Problem Solved
                                  </h4>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                  {
                                    activeConcept.whyItExists
                                      .designProblemSolved
                                  }
                                </p>
                              </div>
                            </div>
                          )}

                          {activeConcept.whyItExists.problemsWithoutConcept && (
                            <div className="p-4 sm:p-5 rounded-xl bg-[#151a30]/80 border border-amber-500/30">
                              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
                                  <AlertCircle size={15} />
                                </span>
                                <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-amber-300">
                                  Problems Without This Concept
                                </h4>
                              </div>

                              <ul className="space-y-2">
                                {activeConcept.whyItExists.problemsWithoutConcept.map(
                                  (problem, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                                    >
                                      <span className="text-red-400 shrink-0 mt-0.5">
                                        ✕
                                      </span>
                                      <span>{problem}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </section>
                    )}
                  </div>
                )}

                {/* CONCEPT SUB-TAB 2: CODE & WALKTHROUGH */}
                {subTab === "code" && (
                  <div className="space-y-6 animate-fadeIn">
                    {activeConcept.basicExample?.beginnerNote && (
                      <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-2.5">
                        <Lightbulb
                          size={16}
                          className="text-cyan-400 shrink-0 mt-0.5"
                        />
                        <p className="text-xs sm:text-sm text-cyan-200 leading-relaxed font-medium">
                          <span className="font-bold text-white uppercase font-mono mr-1.5">
                            Beginner Note:
                          </span>
                          {activeConcept.basicExample.beginnerNote}
                        </p>
                      </div>
                    )}

                    {conceptCode && (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-[#080d22] overflow-hidden shadow-2xl">
                          <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#151a30] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="flex gap-1.5 shrink-0">
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 inline-block" />
                              </div>
                              <span className="text-xs font-mono text-slate-400 ml-1.5 truncate">
                                {activeConcept.filename ||
                                  `${(activeConcept.name || activeConcept.title || topicId || "Concept").replace(/\s+/g, "")}.java`}
                              </span>
                            </div>

                            <button
                              onClick={() => copyCode(conceptCode, "concept-code")}
                              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition shrink-0"
                            >
                              {copiedKey === "concept-code" ? (
                                <Check size={13} className="text-emerald-400" />
                              ) : (
                                <Copy size={13} />
                              )}
                              <span>
                                {copiedKey === "concept-code"
                                  ? "Copied"
                                  : "Copy"}
                              </span>
                            </button>
                          </div>

                          <div className="overflow-x-auto p-4 sm:p-5 w-full">
                            <pre className="font-mono text-xs sm:text-[13px] text-cyan-100/90 leading-relaxed whitespace-pre min-w-max selection:bg-blue-500/30">
                              <code>{conceptCode}</code>
                            </pre>
                          </div>
                        </div>

                        {conceptOutput && (
                          <div className="p-3 sm:p-4 rounded-xl bg-[#080d22] border border-white/10 font-mono text-xs space-y-1 overflow-x-auto">
                            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                              Standard Output (stdout)
                            </span>
                            <pre className="text-emerald-400 whitespace-pre min-w-max">
                              {conceptOutput}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {conceptWalkthrough &&
                      renderWalkthroughSection(conceptWalkthrough)}

                    {!conceptWalkthrough &&
                      legacyConceptExplanations &&
                      legacyConceptExplanations.length > 0 && (
                        <section className="p-4 sm:p-6 rounded-2xl bg-[#0d1227] border border-blue-500/20 shadow-xl space-y-4">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-blue-500/10 text-cyan-400">
                                <Terminal size={16} />
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-cyan-300">
                                  Code Walkthrough &amp; Breakdown
                                </h3>
                                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                                  Granular review of statements and runtime
                                  semantics.
                                </p>
                              </div>
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">
                              {legacyConceptExplanations.length} Directives
                            </span>
                          </div>

                          <div className="space-y-3.5 pt-1">
                            {legacyConceptExplanations.map((item, index) => (
                              <div
                                key={index}
                                className="p-3.5 sm:p-5 rounded-xl bg-[#151a30]/80 border border-white/5 hover:border-cyan-500/30 transition-all space-y-3 group"
                              >
                                <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] sm:text-[11px] font-mono">
                                  <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="px-2 py-0.5 rounded bg-[#080d22] text-cyan-300 font-semibold border border-cyan-800/40">
                                      LINE #
                                      {String(item.line || index + 1).padStart(
                                        2,
                                        "0"
                                      )}
                                    </span>
                                    {(item.category || item.directive) && (
                                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                                        {item.category || item.directive}
                                      </span>
                                    )}
                                  </div>

                                  <span className="text-slate-500 flex items-center gap-1.5">
                                    <span>
                                      {item.scope || "Statement Scope"}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 group-hover:animate-ping" />
                                  </span>
                                </div>

                                {item.code && (
                                  <div className="rounded-lg bg-[#080d22] border border-cyan-500/20 p-3 sm:p-3.5 overflow-x-auto w-full">
                                    <code className="font-mono text-xs sm:text-[13px] text-cyan-200 leading-relaxed whitespace-pre min-w-max block selection:bg-cyan-500/20">
                                      {item.code}
                                    </code>
                                  </div>
                                )}

                                <div className="flex items-start gap-2 pt-0.5 pl-1 border-l-2 border-cyan-500/40">
                                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pl-2">
                                    {item.explanation ||
                                      item.description ||
                                      item.text}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 2: INTERVIEWS                                       */}
            {/* ======================================================== */}
            {activeTab === "interviews" && activeQuestion && (
              <>
                {/* Header with questionTopRef for direct scrolling */}
                <div ref={questionTopRef} className="scroll-mt-20">
                  <div className="flex items-center justify-between flex-wrap gap-2.5 mb-2.5 pb-2 border-b border-white/5">
                    {/* Left Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/15 text-cyan-300 border border-blue-500/30 font-semibold uppercase">
                        {activeQuestion.category ||
                          activeInterviewCategory.toUpperCase()}{" "}
                        • {activeQuestion.difficulty || "Beginner"} Level
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                        Java 17+ LTS
                      </span>
                      {activeQuestion.predictOutput && (
                        <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Predict Output
                        </span>
                      )}
                      <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        Question{" "}
                        {String(selectedQuestionIndex + 1).padStart(2, "0")} of{" "}
                        {currentQuestionsList.length || 1}
                      </span>
                    </div>

                    {/* TOP PREV & NEXT QUICK BUTTONS */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-[#151a30] p-1 rounded-xl border border-white/10">
                      <button
                        disabled={selectedQuestionIndex === 0}
                        onClick={() =>
                          handleQuestionChange(selectedQuestionIndex - 1)
                        }
                        className={`h-7 px-2.5 inline-flex items-center gap-1 rounded-lg text-xs font-semibold transition leading-none ${
                          selectedQuestionIndex === 0
                            ? "opacity-30 cursor-not-allowed text-slate-500"
                            : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                        title="Previous Question"
                      >
                        <ChevronLeft size={14} />
                        <span className="hidden sm:inline">Prev</span>
                      </button>

                      <span className="text-[11px] font-mono text-slate-500 px-1">
                        {selectedQuestionIndex + 1}/
                        {currentQuestionsList.length}
                      </span>

                      <button
                        disabled={
                          selectedQuestionIndex >=
                          currentQuestionsList.length - 1
                        }
                        onClick={() =>
                          handleQuestionChange(selectedQuestionIndex + 1)
                        }
                        className={`h-7 px-2.5 inline-flex items-center gap-1 rounded-lg text-xs font-semibold transition leading-none ${
                          selectedQuestionIndex >=
                          currentQuestionsList.length - 1
                            ? "opacity-30 cursor-not-allowed text-slate-500"
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                        }`}
                        title="Next Question"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Question Title */}
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {activeQuestion.question}
                  </h1>

                  {/* Question Tags */}
                  {activeQuestion.tags && activeQuestion.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                      <Tag size={13} className="text-slate-500 shrink-0" />
                      {activeQuestion.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interviewer Pro-Tip */}
                  {activeQuestion.interviewerTip && (
                    <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-2.5 sm:gap-3">
                      <Sparkles
                        size={17}
                        className="text-cyan-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold block mb-0.5">
                          Interviewer Pro-Tip
                        </span>
                        <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed">
                          {activeQuestion.interviewerTip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sub-tabs: Theory vs Code */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-[#151a30] border border-white/10 w-fit">
                  <button
                    onClick={() => setSubTab("theory")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition ${
                      subTab === "theory"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <BookOpen size={14} />
                    <span>Theory Drill</span>
                  </button>
                  <button
                    onClick={() => setSubTab("code")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition ${
                      subTab === "code"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Code2 size={14} />
                    <span>Code &amp; Walkthrough</span>
                  </button>
                </div>

                {/* INTERVIEW SUB-TAB 1: THEORY */}
                {subTab === "theory" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeQuestion.interviewAnswer?.shortAnswer && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1227] border border-blue-500/30 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-2">
                              <Sparkles size={14} /> Quick-Executive Pitch
                            </span>
                            <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed italic">
                              "{activeQuestion.interviewAnswer.shortAnswer}"
                            </p>
                          </div>
                        </div>
                      )}

                      {activeQuestion.interviewAnswer?.detailedAnswer && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1227] border border-white/10 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                              <BookOpen size={14} /> Detailed Architectural Answer
                            </span>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {activeQuestion.interviewAnswer.detailedAnswer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {activeQuestion.interviewAnswer?.realWorldExample && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#151a30]/80 border border-emerald-500/30 flex items-start gap-3">
                        <Lightbulb
                          size={18}
                          className="text-emerald-400 shrink-0 mt-0.5"
                        />
                        <div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                            Practical Domain Archetype
                          </span>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {activeQuestion.interviewAnswer.realWorldExample}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeQuestion.interviewAnswer?.importantPoints && (
                      <div className="p-4 sm:p-6 rounded-2xl bg-[#0d1227] border border-white/10 space-y-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                          Important Interview Takeaways / Points to Remember
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                          {activeQuestion.interviewAnswer.importantPoints.map(
                            (point, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#151a30]/80 border border-white/5 text-xs text-slate-300 leading-relaxed"
                              >
                                <CheckCircle2
                                  size={15}
                                  className="text-cyan-400 shrink-0 mt-0.5"
                                />
                                <span>{point}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Follow Up Questions in Theory Tab */}
                    {activeQuestion.followUpQuestions &&
                      activeQuestion.followUpQuestions.length > 0 && (
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
                              Deep-Dive Follow-Up Questions (
                              {activeQuestion.followUpQuestions.length})
                            </h3>
                          </div>

                          {activeQuestion.followUpQuestions.map(
                            (followUp, idx) => (
                              <div
                                key={idx}
                                className="p-4 sm:p-5 rounded-2xl bg-[#0d1227] border border-blue-500/20 space-y-3"
                              >
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                                      Follow-Up #{idx + 1}
                                    </span>
                                    {followUp.difficulty && (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                                        {followUp.difficulty}
                                      </span>
                                    )}
                                  </div>

                                  {followUp.tags && followUp.tags.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      {followUp.tags.map((tag, tgIdx) => (
                                        <span
                                          key={tgIdx}
                                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400"
                                        >
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <h4 className="text-sm sm:text-base font-bold text-white">
                                  {followUp.question}
                                </h4>

                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#151a30]/60 p-3 sm:p-4 rounded-xl border border-white/5">
                                  {followUp.answer}
                                </p>

                                {followUp.interviewTip && (
                                  <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 flex items-start gap-2">
                                    <Sparkles
                                      size={14}
                                      className="text-cyan-400 shrink-0 mt-0.5"
                                    />
                                    <p className="text-xs text-cyan-200">
                                      <span className="font-bold text-cyan-300 font-mono mr-1">
                                        Tip:
                                      </span>
                                      {followUp.interviewTip}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                )}

                {/* INTERVIEW SUB-TAB 2: CODE & WALKTHROUGH */}
                {subTab === "code" && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Main Question Code Block */}
                    {activeQuestion.interviewAnswer?.codeExample?.code && (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-[#080d22] overflow-hidden shadow-2xl">
                          <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#151a30] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="flex gap-1.5 shrink-0">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 inline-block" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 inline-block" />
                              </div>
                              <span className="text-xs font-mono text-slate-400 ml-1.5 truncate">
                                SolutionPattern.java
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                copyCode(
                                  activeQuestion.interviewAnswer.codeExample
                                    .code,
                                  "main-code"
                                )
                              }
                              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 transition shrink-0"
                            >
                              {copiedKey === "main-code" ? (
                                <Check size={13} className="text-emerald-400" />
                              ) : (
                                <Copy size={13} />
                              )}
                              <span>
                                {copiedKey === "main-code"
                                  ? "Copied"
                                  : "Copy"}
                              </span>
                            </button>
                          </div>

                          <div className="overflow-x-auto p-4 sm:p-5 w-full">
                            <pre className="font-mono text-xs sm:text-[13px] text-cyan-100/90 leading-relaxed whitespace-pre min-w-max selection:bg-blue-500/30">
                              <code>
                                {activeQuestion.interviewAnswer.codeExample.code}
                              </code>
                            </pre>
                          </div>
                        </div>

                        {activeQuestion.interviewAnswer.codeExample.output && (
                          <div className="p-3 sm:p-4 rounded-xl bg-[#080d22] border border-white/10 font-mono text-xs space-y-1 overflow-x-auto">
                            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                              Standard Output (stdout)
                            </span>
                            <pre className="text-emerald-400 whitespace-pre min-w-max">
                              {
                                activeQuestion.interviewAnswer.codeExample
                                  .output
                              }
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Main Question Walkthrough */}
                    {activeQuestion.interviewAnswer?.codeExample?.walkthrough &&
                      renderWalkthroughSection(
                        activeQuestion.interviewAnswer.codeExample.walkthrough
                      )}

                    {/* Follow-up Questions Code & Walkthrough */}
                    {activeQuestion.followUpQuestions?.map((followUp, fIdx) => {
                      const fuCode =
                        followUp.code || followUp.codeExample?.code;
                      const fuOutput =
                        followUp.output || followUp.codeExample?.output;
                      const fuWalkthrough =
                        followUp.walkthrough ||
                        followUp.codeExample?.walkthrough;

                      return (
                        <div
                          key={fIdx}
                          className="p-4 sm:p-6 rounded-2xl bg-[#0d1227] border border-blue-500/20 shadow-xl space-y-5"
                        >
                          <div className="border-b border-white/5 pb-3 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1 rounded-md bg-blue-500/10 text-cyan-400">
                                <Terminal size={15} />
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-white font-mono">
                                Follow-Up #{fIdx + 1}: {followUp.question}
                              </h4>
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20 shrink-0">
                              Execution Drill
                            </span>
                          </div>

                          {fuCode && (
                            <div className="rounded-xl border border-white/10 bg-[#080d22] overflow-hidden shadow-lg">
                              <div className="px-3 sm:px-4 py-2 bg-[#151a30] border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                                  <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                                  <span className="text-xs font-mono text-slate-400 ml-1.5 truncate">
                                    FollowUp_{fIdx + 1}.java
                                  </span>
                                </div>

                                <button
                                  onClick={() =>
                                    copyCode(fuCode, `fu-code-${fIdx}`)
                                  }
                                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition shrink-0"
                                >
                                  {copiedKey === `fu-code-${fIdx}` ? (
                                    <Check
                                      size={12}
                                      className="text-emerald-400"
                                    />
                                  ) : (
                                    <Copy size={12} />
                                  )}
                                  <span>
                                    {copiedKey === `fu-code-${fIdx}`
                                      ? "Copied"
                                      : "Copy"}
                                  </span>
                                </button>
                              </div>

                              <div className="overflow-x-auto p-4 w-full">
                                <pre className="font-mono text-xs text-cyan-100/90 whitespace-pre min-w-max leading-relaxed">
                                  <code>{fuCode}</code>
                                </pre>
                              </div>
                            </div>
                          )}

                          {fuOutput && (
                            <div className="p-3 sm:p-4 rounded-xl bg-[#080d22] border border-white/10 font-mono text-xs space-y-1 overflow-x-auto">
                              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                                Standard Output (stdout)
                              </span>
                              <pre className="text-emerald-400 whitespace-pre min-w-max">
                                {fuOutput}
                              </pre>
                            </div>
                          )}

                          {fuWalkthrough &&
                            renderWalkthroughSection(fuWalkthrough)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sticky Bottom Pagination Bar */}
          {activeTab === "interviews" && currentQuestionsList.length > 0 && (
            <footer className="h-16 border-t border-white/10 bg-[#0d1227] px-4 sm:px-8 flex items-center justify-between sticky bottom-0 z-20 shrink-0">
              <button
                disabled={selectedQuestionIndex === 0}
                onClick={() =>
                  handleQuestionChange(selectedQuestionIndex - 1)
                }
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedQuestionIndex === 0
                    ? "opacity-40 cursor-not-allowed text-slate-500 bg-white/5"
                    : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                }`}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous Question</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                  {selectedQuestionIndex + 1} / {currentQuestionsList.length}
                </span>
                <div className="w-16 sm:w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${((selectedQuestionIndex + 1) / currentQuestionsList.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <button
                disabled={
                  selectedQuestionIndex >=
                  currentQuestionsList.length - 1
                }
                onClick={() =>
                  handleQuestionChange(selectedQuestionIndex + 1)
                }
                className={`flex items-center gap-1 sm:gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedQuestionIndex >=
                  currentQuestionsList.length - 1
                    ? "opacity-40 cursor-not-allowed text-slate-500 bg-white/5"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                }`}
              >
                <span className="hidden sm:inline">Next Question</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight size={16} />
              </button>
            </footer>
          )}
        </main>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 sm:bottom-22 sm:right-8 z-40 h-11 w-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/60 border border-blue-400/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group animate-fadeIn"
          aria-label="Scroll to top"
          title="Back to Top"
        >
          <ArrowUp
            size={18}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
        </button>
      )}
    </div>
  );
}
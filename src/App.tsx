import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface ChakraInfo {
  name: string;
  color: string;
  glowColor: string;
  highlightColor: string;
  shadowColor: string;
  description: string;
  appName: string;
  technologies: string[];
  appDescription: string;
  appFeatures?: string[];
  appLink: string;
}

const ChakraSpheres: React.FC = () => {
  const [activeChakra, setActiveChakra] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const chakras: ChakraInfo[] = [
    {
      "name": "Root Chakra",
      "color": "#ef5350",
      "glowColor": "#f48a88",
      "highlightColor": "#f9b3b1",
      "shadowColor": "#a73937",
      "description": "Foundation of the chakra system, representing stability, security, and basic needs.",
      "appName": "GroundWorks",
      "technologies": ["Deno", "Postgres", "TypeScript", "Security", "GraphQL", "REST API"],
      "appDescription": "A minimal yet powerful REST or GraphQL API built on Deno, backed by Postgres. It serves as a foundational microservice for other portfolio applications, emphasizing security, efficiency, and production-readiness.",
      "appFeatures": [
        "Deno Runtime with built-in security features (permissions model)",
        "Postgres with a robust ORM and migration/versioning support",
        "Efficient TypeScript-based backend architecture",
        "Continuous Integration with Deno’s built-in test runner",
        "Optional containerization with Docker and Postgres",
        "Secure schema design for user accounts, roles, and permissions"
      ],
      "appLink": "/portfolio/groundworks"
    },
    {
      "name": "Sacral Chakra",
      "color": "#ff7043",
      "glowColor": "#ffa183",
      "highlightColor": "#ffbda7",
      "shadowColor": "#b24e2f",
      "description": "Connected to creativity, passion, pleasure, and emotional well-being.",
      "appName": "CreativeFlow",
      "technologies": ["Three.js", "WebGL", "Canvas API", "Creative Coding"],
      "appDescription": "An interactive creative platform allowing users to express themselves through digital art, music, and motion using intuitive interfaces.",
      "appFeatures": [
        "Generative Art Engine powered by WebGL",
        "Real-time physics-based animations",
        "Customizable brush and motion effects",
        "Music-reactive visuals with frequency analysis",
        "3D object sculpting in the browser"
      ],
      "appLink": "/portfolio/creative-flow"
    },
    {
      "name": "Solar Plexus Chakra",
      "color": "#ffca28",
      "glowColor": "#ffe082",
      "highlightColor": "#fff0b7",
      "shadowColor": "#b28c1c",
      "description": "Linked to personal power, confidence, and self-esteem.",
      "appName": "ProductivityPro",
      "technologies": ["Vue.js", "Electron", "IndexedDB", "Task Management"],
      "appDescription": "A powerful productivity suite that empowers users to take control of their workflow with customizable systems and analytics.",
      "appFeatures": [
        "Customizable Kanban board for project tracking",
        "Offline-first architecture using IndexedDB",
        "Focus mode with Pomodoro integration",
        "Intelligent task prioritization with AI suggestions",
        "Cross-platform support via Electron"
      ],
      "appLink": "/portfolio/productivity-pro"
    },
    {
      "name": "Heart Chakra",
      "color": "#66bb6a",
      "glowColor": "#98d49b",
      "highlightColor": "#bde4bf",
      "shadowColor": "#468349",
      "description": "Center of love, compassion, and harmony, balancing the physical and spiritual worlds.",
      "appName": "CommunityBridge",
      "technologies": ["React", "Firebase", "Tailwind CSS", "Geolocation API"],
      "appDescription": "A community platform connecting people with local volunteer opportunities, fostering meaningful connections and support networks.",
      "appFeatures": [
        "Live geolocation-based volunteering opportunities",
        "Instant messaging for community collaboration",
        "Karma points system for social impact tracking",
        "Automated event reminders and check-ins",
        "Real-time donation and fundraiser tracking"
      ],
      "appLink": "/portfolio/community-bridge"
    },
    {
      "name": "Throat Chakra",
      "color": "#42a5f5",
      "glowColor": "#7dc0f8",
      "highlightColor": "#a1d4fb",
      "shadowColor": "#2c70a7",
      "description": "Governs communication, self-expression, and the power of speaking your truth.",
      "appName": "VoiceFlow",
      "technologies": ["WebRTC", "Node.js", "Socket.io", "Voice Recognition"],
      "appDescription": "A real-time communication platform enabling seamless voice interactions with intelligent transcription and translation capabilities.",
      "appFeatures": [
        "Real-time speech-to-text and voice recognition",
        "Multi-language translation engine",
        "End-to-end encrypted voice calls",
        "AI-driven tone analysis and speech coaching",
        "Live captioning and transcript storage"
      ],
      "appLink": "/portfolio/voice-flow"
    },
    {
      "name": "Third Eye Chakra",
      "color": "#5c6bc0",
      "glowColor": "#8591d5",
      "highlightColor": "#a7b1e3",
      "shadowColor": "#3f4a86",
      "description": "Associated with intuition, insight, and perception beyond ordinary sight.",
      "appName": "InsightDash",
      "technologies": ["D3.js", "React", "GraphQL", "Data Visualization"],
      "appDescription": "A data visualization platform that transforms complex datasets into intuitive, interactive visual insights for better decision-making.",
      "appFeatures": [
        "Interactive real-time data charts",
        "Customizable dashboards with drag-and-drop widgets",
        "GraphQL-powered API for fast data querying",
        "Predictive analytics and anomaly detection",
        "Seamless export options (CSV, PDF, JSON)"
      ],
      "appLink": "/portfolio/insight-dash"
    },
    {
      "name": "Crown Chakra",
      "color": "#9c59d1",
      "glowColor": "#b98be0",
      "highlightColor": "#d7b4f3",
      "shadowColor": "#6a3d90",
      "description": "Represents spiritual connection, higher consciousness, and enlightenment.",
      "appName": "MindfulAI",
      "technologies": ["TensorFlow", "Python", "Natural Language Processing"],
      "appDescription": "An AI-powered meditation assistant that uses machine learning to create personalized meditation experiences based on user feedback and progress.",
      "appFeatures": [
        "AI-driven personalized guided meditations",
        "Emotion recognition through facial and voice analysis",
        "Sleep tracking and relaxation recommendations",
        "Adaptive breathing exercises based on stress levels",
        "Seamless integration with wearable health devices"
      ],
      "appLink": "/portfolio/mindful-ai"
    }
  ]
  

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChakraClick = (index: number) => {
    setActiveChakra(index);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>My Chakra-Aligned Portfolio</h1>
        <p>Exploring the connection between spiritual energy centers and digital creation</p>
      </header>

      <main className="main-content">
        <div className="chakra-container" ref={containerRef}>
          <div className="chakra-stack">
            {chakras.map((chakra, index) => {
              const isActive = activeChakra === index;
              const tiltX = isActive ? mousePosition.y * 15 : 0;
              const tiltY = isActive ? mousePosition.x * 15 : 0;

              return (
                <div
                  key={index}
                  className={`chakra-wrapper ${isActive ? 'active' : ''}`}
                  onClick={() => handleChakraClick(index)}
                >
                  <div className="hitbox"></div>
                  <div className="aura-glow" style={{ background: `radial-gradient(circle, ${chakra.glowColor}33 10%, transparent 70%)` }}></div>
                  <div className="chakra-sphere-3d" style={{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}>
                    <div
                      className="sphere-body"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${chakra.highlightColor} 0%, ${chakra.color} 40%, ${chakra.shadowColor} 100%)`,
                        boxShadow: isActive
                          ? `0 10px 30px ${chakra.glowColor}99, inset 0 0 20px ${chakra.highlightColor}66`
                          : `0 5px 15px ${chakra.shadowColor}66`
                      }}
                    >
                      <div className="highlight-spot" style={{ backgroundColor: chakra.highlightColor }}></div>
                      <div className="secondary-highlight" style={{ backgroundColor: chakra.highlightColor }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chakra Information Panel */}
          <div
            className="chakra-info-panel"
            style={{
              borderColor: chakras[activeChakra].color,
              backgroundColor: `${chakras[activeChakra].shadowColor}10`
            }}
          >
            <h2 style={{ color: chakras[activeChakra].color }}>
              {chakras[activeChakra].name}
            </h2>

            <p className="chakra-description">{chakras[activeChakra].description}</p>

            <div className="app-connection">
              <h3>Portfolio Connection: <span style={{ color: chakras[activeChakra].color }}>{chakras[activeChakra].appName}</span></h3>

              <div className="tech-tags">
                {chakras[activeChakra].technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="tech-tag"
                    style={{ backgroundColor: `${chakras[activeChakra].color}20`, borderColor: chakras[activeChakra].color }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p>{chakras[activeChakra].appDescription}</p>

              {/* Render app features if available */}
              {chakras[activeChakra].appFeatures && (
                <ul className="app-features">
                  {chakras[activeChakra].appFeatures.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}

              <a
                href={chakras[activeChakra].appLink}
                className="view-project-btn"
                style={{
                  backgroundColor: chakras[activeChakra].color,
                  boxShadow: `0 4px 15px ${chakras[activeChakra].glowColor}66`
                }}
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Alan Campbell</h3>
            <p>Full-Stack Developer</p>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>hello@example.com</p>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Alan Campbell. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ChakraSpheres;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TechBadge from "../components/TechBadge.tsx"; 

interface DemoInfo {
  id: string;
  title: string;
  description: string;
  tags: string[];
  path: string;
  image: string;
}

const DemosPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Demo data
  const demos: DemoInfo[] = [
    {
      id: "boat-navigation",
      title: "Maritime Navigation Game",
      description:
        "Test your navigation skills in this fun boat steering game! Control a realistic vessel through treacherous waters and avoid rocks to achieve the highest score. Features include dynamic wave animations with D3.js, multiple difficulty levels, physics-based boat movement, and real-time scoring. Built with React, HTML Canvas, D3.js, and custom SVG graphics for smooth performance. Use arrow keys or WASD to navigate as you experience subtle tilting effects and fluid water dynamics in increasingly challenging maritime environments.",
      tags: ["game", "react", "canvas", "javascript", "interactive", "animation", "maritime", "d3.js", "svg"],
      path: "/demos/boat-navigation",
      image: "/boat-navigation.svg",
    },
    {
      id: "sentiment-analysis",
      title: "AI Sentiment Analysis",
      description:
        "Experience real-time sentiment analysis powered by HuggingFace's DistilBERT model. This demo uses a Deno/Oak backend to securely communicate with HuggingFace's API, analyzing text emotion with advanced NLP. The frontend leverages Redux Toolkit Query for efficient API handling and features a dynamic visualization meter that provides immediate visual feedback on sentiment. Try entering various text samples to see how AI perceives emotional tone in different contexts.",
      tags: ["ai", "huggingface", "nlp", "react", "redux-toolkit", "deno", "oak", "api-integration"],
      path: "/demos/sentiment-analysis",
      image: "/sentiment-analysis.svg", 
    },
    {
      id: "realtime-chat",
      title: "Real-time Chat Application",
      description:
        "A fully-functional real-time chat application built with native WebSockets and React. Features include real-time messaging, typing indicators, user online status, and auto-reconnection. Try opening multiple windows to chat with yourself and experience the real-time communication capabilities. This demo showcases advanced state management, WebSocket communication, and responsive UI design.",
      tags: ["websockets", "real-time", "react", "tailwind-css", "typescript", "deno", "chat"],
      path: "/demos/chat",
      image: "/chat.svg",
    },
    {
      id: "tailwind-frequencies",
      title: "Tailwind CSS Frequencies",
      description:
        "This visualization application renders harmonic frequencies and chakra energy using D3.js for SVG animation and Tone.js for audio synthesis. It features interactive visualizations that respond to frequency changes in either spiral or mandala patterns, with customizable parameters including animation speed, base frequency, and harmonic ratios. The UI is built with React and styled using Tailwind CSS, creating a responsive interface that allows users to select chakras, apply sacred geometry ratios, and toggle sound playback.",
      tags: ["d3.js", "tone.js", "data-visualization", "react", "tailwind-css", "audio", "interactive"],
      path: "/demos/tailwind-frequencies",
      image: "/tailwind-freq.svg",
    },
    {
      id: "recharts-mouse-event",
      title: "Recharts Mouse Event Data Visualization",
      description: "An advanced, interactive data visualization dashboard that tracks and renders real-time mouse events using React, Recharts, and Material-UI. Features multiple chart types including scatter plots, pie charts, and timelines that dynamically update as users interact with a tracking area, providing comprehensive insights into mouse interaction patterns.",
      tags: [
        "react",
        "recharts", 
        "data-visualization", 
        "interactive", 
        "mouse-events", 
        "material-ui", 
        "typescript", 
        "dashboard"
      ],
      path: "/demos/recharts-mouse-event-data-viz",
      image: "/recharts-mouse-events.svg",
    },
    // You can add more demos here as you create them
  ];

  // Technologies used to build the page
  const technologies = [
    { name: "React", color: "#61DAFB" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind CSS", color: "#38B2AC" },
    { name: "Framer Motion", color: "#FF4D4D" },
  ];

  // Get all unique tags
  const allTags = Array.from(new Set(demos.flatMap((demo) => demo.tags)));

  // Filter demos based on selected tag and search query
  const filteredDemos = demos.filter((demo) => {
    const matchesTag = selectedTag ? demo.tags.includes(selectedTag) : true;
    const matchesSearch =
      demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTag && matchesSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <TechBadge
        technologies={technologies}
        position="header"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Tech Badge */}
          <div className="text-center mb-12 relative">
            <div className="flex flex-col items-center">
              <motion.h1
                className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Interactive Demos
              </motion.h1>
            </div>

            <motion.div
              className="h-1 w-20 bg-indigo-600 mx-auto mt-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.p
              className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Explore interactive examples of my frontend development work
            </motion.p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              {/* Tags filter */}
              <div className="flex flex-wrap gap-2">
                <motion.button
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedTag === null
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  } transition-colors`}
                  onClick={() => setSelectedTag(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>

                {allTags.map((tag) => (
                  <motion.button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTag === tag
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    } transition-colors`}
                    onClick={() => setSelectedTag(tag)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search demos..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Demo cards */}
          {filteredDemos.length > 0
            ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDemos.map((demo) => (
                  <DemoCard key={demo.id} demo={demo} />
                ))}
              </motion.div>
            )
            : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No demos found matching your criteria. Try adjusting your
                  filter or search.
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

const DemoCard: React.FC<{ demo: DemoInfo }> = ({ demo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <motion.img
          src={demo.image}
          alt={demo.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 w-full">
            <h3 className="text-xl font-bold text-white">{demo.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {demo.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {demo.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-4">
          <Link
            to={demo.path}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
          >
            <span>View Demo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DemosPage;
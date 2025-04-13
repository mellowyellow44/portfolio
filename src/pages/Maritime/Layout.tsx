import React, { useEffect, useRef, useState } from "react";
import BoatNavigationGame from "./BoatNavigation.tsx";
import {
  Anchor,
  Award,
  Briefcase,
  Compass,
  Map,
  Navigation,
  Ship,
  Wind,
} from "lucide-react";
import { AnimatePresence, color, motion } from "framer-motion";
import TechBadge from "../../components/TechBadge.tsx";

import * as d3 from "d3";

// D3 Chart Component for Years of Experience
const ExperienceChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const data = [
        { category: "Vessel Operations", years: 15 },
        { category: "Captain License", years: 17 },
        { category: "Crew Training", years: 9 },
        { category: "Safety Consulting", years: 4 },
        { category: "Business Ownership", years: 3 },
      ];

      // Clear any existing SVG
      d3.select(chartRef.current).selectAll("*").remove();

      // Set up dimensions
      const margin = { top: 20, right: 30, bottom: 40, left: 90 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      // Create SVG element
      const svg = d3.select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create scales
      const x = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.years) || 0])
        .range([0, width]);

      const y = d3.scaleBand()
        .domain(data.map((d) => d.category))
        .range([0, height])
        .padding(0.1);

      // Add x-axis
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "#666")
        .text("Years of Experience");

      // Add y-axis
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add bars with animation
      svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => y(d.category) || 0)
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", 0)
        .attr("fill", "#38B2AC")
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("width", (d) => x(d.years));

      // Add labels
      svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("y", (d) => (y(d.category) || 0) + y.bandwidth() / 2)
        .attr("x", (d) => x(d.years) - 30)
        .attr("dy", ".35em")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .text((d) => d.years + " yrs")
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 300)
        .style("opacity", 1);
    }
  }, []);

  return (
    <div className="mt-8 bg-white rounded-lg p-6 shadow border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Experience Summary
      </h2>
      <div className="w-full overflow-x-auto">
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

// Framer Motion variants for animations
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
    transition: { type: "spring", stiffness: 100 },
  },
};

const tabVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Tailwind CSS", color: "#38B2AC" },
  { name: "D3.js", color: "#F9A826" },
  { name: "Framer Motion", color: "#FF4D4D" },
  { name: "Lucide Icons", color: "#000000" },
];

const MaritimeProfileComponent = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const experiences = [
    {
      title: "USCG Licensed Captain (100-ton)",
      years: "2008 - Present",
      description:
        "Hold active 100-ton Near Coastal U.S. Coast Guard Captain's License, maintaining all required certifications and endorsements.",
      icon: <Navigation className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Boat tour Business Owner/Operator",
      years: "2020 - 2023",
      description:
        "Founded and operated parasail businesses in Montana and Seattle, providing memorable experiences while maintaining strict safety standards.",
      icon: <Wind className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Lead Captain",
      years: "2008 - 2019",
      description:
        "Operated various parasail vessels in diverse locations including Lake Tahoe, Cayman Islands, US Virgin Islands, and multiple coastal regions. 100% incident-free record.",
      icon: <Ship className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Maritime Safety Consultant",
      years: "2015 - 2019",
      description:
        "Provided expert consultation for new parasail operations, focusing on safety protocols, crew training, and operational best practices.",
      icon: <Award className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Crew Trainer",
      years: "2010 - 2019",
      description:
        "Trained numerous crew members and upcoming captains in proper parasailing operations, emergency procedures, and customer service excellence.",
      icon: <Briefcase className="w-6 h-6 text-teal-600" />,
    },
  ];

  const certifications = [
    {
      name: "USCG 100-Ton Master Captain License (Near Coastal)",
      issuer: "United States Coast Guard",
      year: 2008,
    },
    {
      name: "USCG Medical Certificate",
      issuer: "United States Coast Guard",
      year: 2008,
    },
    {
      name: "STCW Certificate",
      issuer: "International Maritime Organization",
      year: 2011,
    },
    {
      name: "Advanced First Aid/CPR Certification",
      issuer: "American Red Cross",
      year: 2008,
    },
    {
      name: "Open Water Scuba Certification",
      issuer: "PADI",
      year: 2010,
    },
  ];

  const resumeEntries = [
    {
      position: "Boat tour Business Owner/Operator",
      company: "Owner/Operator",
      location: "Montana and Seattle, WA",
      period: "2020 - 2023",
      description: [
        "Founded and operated parasail businesses in two distinct locations",
        "Managed all aspects including equipment maintenance, crew training, and customer service",
        "Maintained 100% safety record while providing memorable water experiences",
        "Navigated business operations through challenging economic conditions",
      ],
    },
    {
      position: "Lead Parasail Captain",
      company: "Action Water-Sports",
      location: "South Lake Tahoe, CA",
      period: "May 2019 - October 2019",
      description: [
        "Drove a 31' Ocean Pro on the South Side of Lake Tahoe in highly variable wind conditions",
        "Trained several new crew members",
        "Completed seasonal position with incident-free record",
      ],
    },
    {
      position: "Lead Parasail Captain",
      company: "Multiple Locations",
      location: "Various",
      period: "2008 - 2017",
      description: [
        "Worked for California Parasail (locations on Catalina Island, Lake Tahoe, and Newport Beach) for 6 years",
        "Primarily operated 35' and 30' Centurions in extremely high volume settings",
        "Trained countless crew and office staff, as well as up-and-coming captains",
        "Additional captain experience in US Virgin Islands, Roatan-Honduras, Canada, Florida, and Washington",
        "Consulted on 3 successful parasail business start-ups",
        "Maintained 100% incident-free record throughout career",
      ],
    },
  ];

  // Wave animation for header
  const waveVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <TechBadge
        technologies={technologies}
        position="header"
      />
      {/* Animated Header */}
      <motion.div
        className="bg-white py-10 border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                animate="animate"
                variants={waveVariants}
              >
                <Anchor className="w-8 h-8 mr-3 text-teal-600" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-3xl font-bold tracking-wide text-gray-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  MARITIME PROFILE
                </motion.h1>
                <motion.p
                  className="text-gray-600 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Alan Campbell • USCG Licensed Captain (100-ton)
                </motion.p>
              </div>
            </div>

            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Compass className="w-6 h-6 text-teal-600 mr-2" />
              <span className="text-gray-600 font-medium">
                USCG Licensed Captain (100-ton) since 2008
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs with Animation */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex overflow-x-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setActiveTab("experience")}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "experience"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent hover:text-gray-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("certifications")}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "certifications"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent hover:text-gray-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Certifications
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("resume")}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "resume"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent hover:text-gray-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Mariner Resume
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("game")}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "game"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent hover:text-gray-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Game
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Content Area with AnimatePresence for smooth tab transitions */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow border border-gray-100"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start mb-4">
                    <motion.div
                      className="p-3 bg-gray-100 rounded-lg mr-4"
                      whileHover={{ rotate: 15 }}
                    >
                      {exp.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-gray-500">{exp.years}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "certifications" && (
            <motion.div
              key="certifications"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-lg p-6 shadow border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-gray-900">
                Professional Certifications
              </h2>
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg"
                    variants={itemVariants}
                    whileHover={{
                      backgroundColor: "rgba(56, 178, 172, 0.1)",
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="flex items-start">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Award className="w-5 h-5 text-teal-600 mt-1 mr-3" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {cert.name}
                        </h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="md:text-right mt-2 md:mt-0">
                      <p className="text-gray-700">Issued: {cert.year}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "resume" && (
            <motion.div
              key="resume"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-lg p-6 shadow border border-gray-100"
            >
              <div className="flex items-center mb-6 border-b border-gray-200 pb-2">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Briefcase className="w-6 h-6 text-teal-600 mr-2" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Mariner Career History
                </h2>
              </div>

              <motion.div
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {resumeEntries.map((entry, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-teal-600 pl-5 pb-1"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {entry.position}
                      </h3>
                      <span className="text-gray-500 font-medium">
                        {entry.period}
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="text-gray-700 font-medium">
                        {entry.company}
                      </span>
                      <span className="mx-2">|</span>
                      <span className="text-gray-600">{entry.location}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1">
                      {entry.description.map((point, idx) => (
                        <motion.li
                          key={idx}
                          className="text-gray-700"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "game" && (
            <div>
              <BoatNavigationGame />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Footer */}
      <motion.footer
        className="mt-12 bg-white py-6 text-center text-gray-600 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          USCG Licensed Captain (100-ton) since 2008
        </motion.p>
        <motion.p
          className="mt-2 text-sm"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          © {new Date().getFullYear()} Alan Campbell - Maritime Professional
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default MaritimeProfileComponent;

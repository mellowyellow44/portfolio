import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ColorLens as ColorLensIcon,
  Edit as EditIcon,
  FormatSize as FormatSizeIcon,
  GetApp as GetAppIcon,
  Style as StyleIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Document,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PageHeader from "../../components/PageHeader";
import TechBadge from "../../components/TechBadge";

// Type definitions
interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  highlights: string[];
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  coreCompetencies: string[];
  additionalQualifications: string[];
  notes?: string;
}

interface ResumeTheme {
  name: string;
  background: string;
  primary: string;
  primaryLight: string;
  textPrimary: string;
  textSecondary: string;
}

interface ThemeOptions {
  [key: string]: ResumeTheme;
}

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Material UI", color: "#0081CB" },
  { name: "React-PDF", color: "#FF6C37" },
];

// Updated resume data with Alan Campbell's information
const initialResumeData: ResumeData = {
  personalInfo: {
    name: "Alan Campbell",
    title: "Staff Engineer | AI Solutions Architect",
    email: "alancampbell4444@gmail.com",
    phone: "",
    location: "Kings Beach, CA (Lake Tahoe area), United States",
    summary:
      `Full-Stack Engineer and AI Solutions Architect with 8+ years of experience delivering high-impact, scalable, and secure web applications. Specialized in JavaScript, TypeScript, Python, and cutting-edge ML technologies. Proven track record of building greenfield applications, leading full-stack architecture, and integrating AI/LLM solutions with traditional enterprise systems. Deep expertise in cloud infrastructure (AWS), vector databases, security, and regulatory compliance. Passionate about mentoring, cross-functional collaboration, and transforming business requirements into elegant, performant software solutions.`,
  },
  experience: [
    {
      company: "Precedent",
      position: "Staff Engineer",
      duration: "January 2024 - Present",
      description:
        "Leading development of an AI-enhanced legal technology platform for insurance claims mediation. Architecting front-end and full-stack systems with a strong focus on modular design, scalability, and seamless integration with ML models.",
      highlights: [
        "Designed and implemented island-based architecture for a greenfield legal tech platform using React, RTK Query, and MUI",
        "Integrated advanced ML solutions into the product pipeline for document extraction and AI-based mediation support",
        "Developed dynamic PDF editing with bounding box data extraction for ML processing",
        "Engineered full-stack solutions with Node.js, AWS Lambda, and Terraform for scalable deployment",
        "Implemented centralized state management, end-to-end testing with Playwright, and collaborated closely with backend and product teams",
      ],
    },
    {
      company: "CSAA Insurance Group (AAA Insurer)",
      position: "Staff Engineer",
      duration: "June 2020 - 2024",
      description:
        "Full-stack engineering lead on a multi-state, multi-product insurance quoting platform. Delivered a scalable, modular frontend and led architecture efforts with a focus on design consistency, accessibility, and code quality.",
      highlights: [
        "Led React/TypeScript development with Redux, Formik, and MUI in Agile/SAFe teams",
        "Successfully launched production apps across multiple states and product lines",
        "Introduced modular component design using React Query and Storybook",
        "Implemented CI/CD automation and mentored junior engineers on testing and design patterns",
        "Managed versioning, release workflows, and collaborated with cross-functional teams on regulatory requirements",
      ],
    },
    {
      company: "American Express",
      position: "Software Engineer",
      duration: "December 2018 - June 2020",
      description:
        "Developed customer and internal-facing financial services applications with an emphasis on modular architecture, high performance, and compliance with financial regulations.",
      highlights: [
        "Built and maintained MYCA portal using Node.js, Express, PostgreSQL, React, and MUI",
        "Contributed to a micro-frontend architecture supporting independent feature deployment",
        "Led efforts on functional design patterns, test-driven development, and modular React components",
        "Collaborated with internal stakeholders and business units to ensure project alignment and customer needs",
        "Provided mentorship to junior engineers on technical architecture and application performance",
      ],
    },
    {
      company: "Sierra Telecom, Inc",
      position: "Software Engineer",
      duration: "September 2017 - December 2018",
      description:
        "Led frontend development for a commercial IoT monitoring platform with real-time visualization, geospatial mapping, and interactive dashboards.",
      highlights: [
        "Built interactive UI dashboards with React, Redux, and Redux-Forms for dynamic device control",
        "Developed real-time data visualizations using D3.js, Highcharts, and Pond.js",
        "Implemented OAuth-based authentication and Express backend integration",
        "Enabled geospatial device provisioning using Google Maps API and Leaflet.js",
        "Optimized UI for responsive performance across screens using Bootstrap and Flexbox",
      ],
    },
    {
      company: "Freelance",
      position: "JavaScript Developer",
      duration: "October 2015 - September 2017",
      description:
        "Delivered full-stack SPAs for clients across various industries, handling end-to-end software lifecycle including design, development, testing, and deployment.",
      highlights: [
        "Built and deployed SPAs using Node.js, React, Redux, and Express",
        "Implemented AWS Lambda, S3, and API Gateway for serverless architectures",
        "Designed efficient PostgreSQL schemas and REST APIs for dynamic front-end integration",
        "Set up CI/CD pipelines and automated test suites for robust delivery",
        "Configured Webpack and Babel for performance optimization and cross-browser support",
      ],
    },
  ],
  education: [
    {
      institution: "Fullstack Academy of Code",
      degree: "Full Stack Software Engineering Immersive Program",
      duration: "2015 - 2016",
      description:
        "Completed 1000+ hours of immersive training. Focused on JavaScript deep dive, Node.js, Express, React, SQL databases, Big O notation, and core CS fundamentals.",
    },
    {
      institution: "Bellevue University",
      degree: "Bachelor of Business Administration (BBA)",
      duration: "",
      description:
        "Major: Business Administration and Management. Coursework included Business Law, Ethics, and Organizational Behavior.",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Deno",
    "Redux",
    "RTK Query",
    "Material UI",
    "Tailwind CSS",
    "PostgreSQL",
    "Express",
    "AWS",
    "AWS Lambda",
    "Terraform",
    "Playwright",
    "Python",
    "Large Language Models (LLMs)",
    "Vector Databases (VDBs)",
    "Data Visualization (D3, Highcharts, Pond.js)",
    "CI/CD",
    "OAuth",
    "Micro-Frontends",
    "Storybook",
  ],
  coreCompetencies: [
    "Full-Stack Web Architecture",
    "Cloud Infrastructure Design",
    "Security and Authentication",
    "Modular Frontend Systems",
    "AI Integration and LLM Ops",
    "Technical Mentorship",
    "Test-Driven Development",
    "Agile & SAFe Methodologies",
    "Cross-Functional Team Leadership",
    "Client-Centric Product Development",
  ],
  additionalQualifications: [
    "USCG 100-ton license holder with 10 years’ experience as charter captain",
    "Advanced experience in Generative AI, ML model deployment, and statistical analysis",
    "Demonstrated ability to lead greenfield development and cross-org architecture efforts",
    "Strong background in security, compliance, and regulatory frameworks for insurance and finance sectors",
    "Fluent in dynamic PDF editing and bounding box extraction techniques for ML data pipelines",
  ],
  notes: "",
};

// Resume template styles
const createResumeStyles = (
  theme: ResumeTheme,
  fontSizeScale: number,
  fontFamily: string,
) =>
  StyleSheet.create({
    page: {
      flexDirection: "column" as const,
      backgroundColor: theme.background,
      padding: 30,
      fontFamily: fontFamily,
      color: theme.textPrimary,
    },
    header: {
      marginBottom: 20,
      borderBottom: `2pt solid ${theme.primary}`,
      paddingBottom: 10,
    },
    name: {
      fontSize: 24 * fontSizeScale,
      fontWeight: 700,
      color: theme.primary,
    },
    title: {
      fontSize: 16 * fontSizeScale,
      marginBottom: 10,
      color: theme.textSecondary,
    },
    contactInfo: {
      fontSize: 10 * fontSizeScale,
      marginBottom: 5,
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
    },
    sectionTitle: {
      fontSize: 14 * fontSizeScale,
      fontWeight: 700,
      marginBottom: 10,
      marginTop: 15,
      color: theme.primary,
      textTransform: "uppercase" as const,
    },
    company: {
      fontSize: 12 * fontSizeScale,
      fontWeight: 700,
      marginBottom: 5,
    },
    position: {
      fontSize: 12 * fontSizeScale,
      fontWeight: 500,
      marginBottom: 5,
    },
    duration: {
      fontSize: 10 * fontSizeScale,
      fontWeight: 400,
      marginBottom: 5,
      color: theme.textSecondary,
    },
    description: {
      fontSize: 10 * fontSizeScale,
      marginBottom: 5,
      lineHeight: 1.5,
    },
    highlights: {
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
      marginTop: 5,
      marginBottom: 10,
    },
    highlight: {
      fontSize: 8 * fontSizeScale,
      backgroundColor: theme.primaryLight,
      color: theme.textPrimary,
      padding: "3 6",
      borderRadius: 3,
      marginRight: 5,
      marginBottom: 5,
    },
    skills: {
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
      marginTop: 5,
    },
    skill: {
      fontSize: 10 * fontSizeScale,
      backgroundColor: theme.primaryLight,
      color: theme.textPrimary,
      padding: "4 8",
      borderRadius: 4,
      marginRight: 8,
      marginBottom: 8,
    },
    summary: {
      fontSize: 11 * fontSizeScale,
      marginBottom: 15,
      lineHeight: 1.6,
    },
    notes: {
      fontSize: 10 * fontSizeScale,
      marginTop: 15,
      marginBottom: 15,
      padding: 10,
      backgroundColor: theme.primaryLight,
      borderRadius: 4,
      borderLeft: `3pt solid ${theme.primary}`,
      fontWeight: 400,
    },
    listItem: {
      fontSize: 10 * fontSizeScale,
      marginBottom: 3,
      lineHeight: 1.5,
    },
  });

interface ResumePDFProps {
  resumeData: ResumeData;
  theme: ResumeTheme;
  fontSize: number;
  fontFamily: string;
}

// Resume PDF Document Component
const ResumePDFDocument: React.FC<ResumePDFProps> = (
  { resumeData, theme, fontSize, fontFamily },
) => {
  const styles = createResumeStyles(theme, fontSize, fontFamily);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
          <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{resumeData.personalInfo.email}</Text>
            {resumeData.personalInfo.phone && (
              <Text>{resumeData.personalInfo.phone}</Text>
            )}
            <Text>{resumeData.personalInfo.location}</Text>
          </View>
        </View>

        {/* Summary */}
        <View>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
        </View>

        {/* Experience */}
        <View>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {resumeData.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.position}>{exp.position}</Text>
              <Text style={styles.duration}>{exp.duration}</Text>
              <Text style={styles.description}>{exp.description}</Text>
              <View style={styles.highlights}>
                {exp.highlights.map((highlight, hIndex) => (
                  <Text key={hIndex} style={styles.highlight}>{highlight}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Education */}
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <Text style={styles.company}>{edu.institution}</Text>
              <Text style={styles.position}>{edu.degree}</Text>
              <Text style={styles.duration}>{edu.duration}</Text>
              <Text style={styles.description}>{edu.description}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Core Competencies */}
        <View>
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <View style={styles.skills}>
            {resumeData.coreCompetencies.map((competency, index) => (
              <Text key={index} style={styles.skill}>{competency}</Text>
            ))}
          </View>
        </View>

        {/* Additional Qualifications */}
        <View>
          <Text style={styles.sectionTitle}>Additional Qualifications</Text>
          {resumeData.additionalQualifications.map((qualification, index) => (
            <Text key={index} style={styles.listItem}>• {qualification}</Text>
          ))}
        </View>

        {/* Notes (if present) */}
        {resumeData.notes && resumeData.notes.trim() !== "" && (
          <View>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notes}>{resumeData.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

// Resume Builder App
const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  // Theme options
  const [selectedLayout, setSelectedLayout] = useState<string>("modern");
  const [selectedFont, setSelectedFont] = useState<string>("Helvetica");
  const [selectedColorTheme, setSelectedColorTheme] = useState<string>(
    "default",
  );
  const [fontSize, setFontSize] = useState<number>(1);

  // Font families - Using standard system fonts only
  const fontFamilies = [
    { value: "Helvetica", label: "Helvetica" },
    { value: "Courier", label: "Courier" },
  ];

  // Color themes options - More visually distinct themes
  const colorThemes = [
    {
      value: "default",
      label: "Default Blue",
      primary: "#3f51b5",
      secondary: "#f50057",
      background: "#ffffff",
      textPrimary: "#333333",
      textSecondary: "#666666",
    },
    {
      value: "dark",
      label: "Dark Mode",
      primary: "#bb86fc",
      secondary: "#03dac6",
      background: "#121212",
      textPrimary: "#ffffff",
      textSecondary: "#aaaaaa",
    },
    {
      value: "tropical",
      label: "Tropical",
      primary: "#00bfa5",
      secondary: "#ff5722",
      background: "#f8f9fa",
      textPrimary: "#1a3c40",
      textSecondary: "#2a6168",
    },
    {
      value: "neon",
      label: "Neon",
      primary: "#f706cf",
      secondary: "#11f3eb",
      background: "#0b0b13",
      textPrimary: "#ffffff",
      textSecondary: "#bbbbbb",
    },
    {
      value: "earthy",
      label: "Earthy",
      primary: "#8d6e63",
      secondary: "#a5d6a7",
      background: "#f5f5f0",
      textPrimary: "#3e2723",
      textSecondary: "#5d4037",
    },
    {
      value: "monochrome",
      label: "Monochrome",
      primary: "#424242",
      secondary: "#9e9e9e",
      background: "#ffffff",
      textPrimary: "#212121",
      textSecondary: "#757575",
    },
  ];

  // Theme lookup function
  const getThemeData = (): ThemeOptions => {
    // Find the selected color theme
    const colorTheme =
      colorThemes.find((t) => t.value === selectedColorTheme) || colorThemes[0];

    // Create layout themes based on the color theme
    return {
      modern: {
        name: "Modern Layout",
        background: colorTheme.background,
        primary: colorTheme.primary,
        primaryLight: `${colorTheme.primary}22`,
        textPrimary: colorTheme.textPrimary,
        textSecondary: colorTheme.textSecondary,
      },
      minimal: {
        name: "Minimal Layout",
        background: colorTheme.background,
        primary: colorTheme.primary,
        primaryLight: `${colorTheme.primary}15`,
        textPrimary: colorTheme.textPrimary,
        textSecondary: colorTheme.textSecondary,
      },
      classic: {
        name: "Classic Layout",
        background: colorTheme.background === "#ffffff"
          ? "#fafafa"
          : colorTheme.background,
        primary: colorTheme.primary,
        primaryLight: `${colorTheme.primary}18`,
        textPrimary: colorTheme.textPrimary,
        textSecondary: colorTheme.textSecondary,
      },
      creative: {
        name: "Creative Layout",
        background: colorTheme.background,
        primary: colorTheme.primary,
        primaryLight: `${colorTheme.primary}20`,
        textPrimary: colorTheme.textPrimary,
        textSecondary: colorTheme.textSecondary,
      },
      professional: {
        name: "Professional Layout",
        background: colorTheme.background === "#ffffff"
          ? "#f9f9f9"
          : colorTheme.background,
        primary: colorTheme.primary,
        primaryLight: `${colorTheme.primary}18`,
        textPrimary: colorTheme.textPrimary,
        textSecondary: colorTheme.textSecondary,
      },
    };
  };

  // Get current theme data
  const themes = getThemeData();

  // Create MUI theme for the app UI
  const theme = createTheme({
    palette: {
      mode: selectedColorTheme === "dark" || selectedColorTheme === "neon"
        ? "dark"
        : "light",
      primary: {
        main: colorThemes.find((t) =>
          t.value === selectedColorTheme
        )?.primary || "#3f51b5",
      },
      secondary: {
        main: colorThemes.find((t) =>
          t.value === selectedColorTheme
        )?.secondary || "#f50057",
      },
      background: {
        default: selectedColorTheme === "dark" || selectedColorTheme === "neon"
          ? "#0a0a0a"
          : "#f5f5f5",
        paper: selectedColorTheme === "dark" || selectedColorTheme === "neon"
          ? "#1e1e1e"
          : "#ffffff",
      },
    },
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFontSizeChange = (_event: Event, newValue: number | number[]) => {
    setFontSize(newValue as number);
  };

  const handleLayoutChange = (event: SelectChangeEvent) => {
    setSelectedLayout(event.target.value);
  };

  const handleColorThemeChange = (event: SelectChangeEvent) => {
    setSelectedColorTheme(event.target.value);
  };

  const handleFontChange = (event: SelectChangeEvent) => {
    setSelectedFont(event.target.value);
  };

  // Handle PDF generation and download
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <ResumePDFDocument
          resumeData={resumeData}
          theme={themes[selectedLayout]}
          fontSize={fontSize}
          fontFamily={selectedFont}
        />,
      ).toBlob();

      // Create a URL from the blob
      const url = URL.createObjectURL(blob);

      // Create a download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `${
        resumeData.personalInfo.name.replace(/\s/g, "_")
      }_Resume.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        setIsGenerating(false);
      }, 100);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsGenerating(false);
      alert(
        "There was an error generating the PDF. Please try a different font or theme.",
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TechBadge
            technologies={technologies}
            position="header"
          />
      <Container maxWidth="xl">
        {/* Changed from lg to xl for more width */}
        <Box sx={{ mt: 4, mb: 3, textAlign: "center" }}>
          {/* Reduced margins */}
          <PageHeader
            title="Design My Resume"
            subtitle="Customize my resume color themes and fonts– add notes– and download as PDF"
            color="primary"
          />
        </Box>

        <Grid container spacing={2}>
          {/* Reduced spacing from 3 to 2 */}
          {/* Left: Controls */}
          <Grid size={{ xs: 12, md: 4 }} >
            {/* Changed from md=4 to md=3 to give more space to preview */}
            <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
              {/* Reduced padding */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="resume customization tabs"
                sx={{ mb: 2 }}
              >
                <Tab icon={<StyleIcon />} label="Design" />
                <Tab icon={<ColorLensIcon />} label="Font" />
                <Tab icon={<EditIcon />} label="Notes" />
              </Tabs>

              {/* Design Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                    {/* Reduced margin */}
                    Choose Color Theme
                  </Typography>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="color-theme-select-label">
                      Color Theme
                    </InputLabel>
                    <Select
                      labelId="color-theme-select-label"
                      id="color-theme-select"
                      value={selectedColorTheme}
                      label="Color Theme"
                      onChange={handleColorThemeChange}
                    >
                      {colorThemes.map((theme) => (
                        <MenuItem key={theme.value} value={theme.value}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                bgcolor: theme.primary,
                                mr: 1,
                                border: "1px solid rgba(128,128,128,0.3)",
                              }}
                            />
                            {theme.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, textAlign: "center" }}
                  >
                    See your changes in the preview panel on the right.
                  </Typography>
                </Box>
              )}

              {/* Font Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Font Settings
                  </Typography>

                  <FormControl fullWidth margin="normal">
                    <InputLabel id="font-family-label">Font Family</InputLabel>
                    <Select
                      labelId="font-family-label"
                      id="font-family"
                      value={selectedFont}
                      label="Font Family"
                      onChange={handleFontChange}
                    >
                      {fontFamilies.map((font) => (
                        <MenuItem key={font.value} value={font.value}>
                          {font.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography id="font-size-slider" gutterBottom sx={{ mt: 2 }}>
                    {/* Reduced margin */}
                    Font Size
                  </Typography>
                  <Slider
                    aria-labelledby="font-size-slider"
                    value={fontSize}
                    min={0.8}
                    max={1.2}
                    step={0.05}
                    marks={[
                      { value: 0.8, label: "S" },
                      { value: 1, label: "M" },
                      { value: 1.2, label: "L" },
                    ]}
                    onChange={handleFontSizeChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}x`}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, mb: 1, fontStyle: "italic" }}
                  >
                    Note: Font selection affects both the preview and PDF
                    output.
                  </Typography>
                </Box>
              )}

              {/* Notes Tab */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Add Notes to Resume
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {/* Reduced margin */}
                    Add any additional information, special instructions, or
                    context for your resume.
                  </Typography>
                  <TextField
                    label="Notes"
                    value={resumeData.notes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setResumeData({
                        ...resumeData,
                        notes: e.target.value,
                      })}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={8}
                    placeholder="Add your notes here. They will appear at the bottom of your resume."
                    helperText="Notes will only appear in the PDF if you add content here."
                  />
                </Box>
              )}

              <Divider sx={{ my: 2 }} /> {/* Reduced margin */}

              {/* Export Button */}
              <Box sx={{ textAlign: "center" }}>
                {isGenerating
                  ? (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled
                      startIcon={<CircularProgress size={20} color="inherit" />}
                      fullWidth
                      size="large"
                    >
                      Generating PDF...
                    </Button>
                  )
                  : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<GetAppIcon />}
                      fullWidth
                      size="large"
                      onClick={handleDownloadPDF}
                    >
                      Download Resume PDF
                    </Button>
                  )}
              </Box>
            </Paper>
          </Grid>

          {/* Right: Preview */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" display="flex" alignItems="center">
                  <VisibilityIcon sx={{ mr: 1 }} />
                  Resume Preview
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1, fontStyle: "italic" }}
                  >
                    (Scroll to view all)
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  {
                    /* <Chip
                    label={themes[selectedLayout].name}
                    color="primary"
                    size="small"
                    variant="outlined"
                  /> */
                  }

                  <Chip
                    label={colorThemes.find((t) =>
                      t.value === selectedColorTheme
                    )?.label || "Default"}
                    color="secondary"
                    size="small"
                    variant="outlined"
                  />

                  <Chip
                    label={fontFamilies.find((f) => f.value === selectedFont)
                      ?.label || "Default"}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  backgroundColor:
                    selectedColorTheme === "dark" ||
                      selectedColorTheme === "neon"
                      ? "#333"
                      : "#f0f0f0",
                  borderRadius: 1,
                  pt: 2,
                  pb: 4,
                  overflow: "auto",
                  maxHeight: "800px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: isSmallScreen ? "85%" : "65%",
                    minHeight: 600,

                    maxHeight: "100%",
                    backgroundColor:
                      colorThemes.find((t) => t.value === selectedColorTheme)
                        ?.background || "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    borderRadius: "4px 4px 0 0",
                    overflow: "auto",
                    position: "relative",
                  }}
                >
                  {/* Dynamic preview based on selected theme and font size */}
                  <Box
                    sx={{
                      p: 4,
                      fontFamily: selectedFont + ", sans-serif",
                      color:
                        colorThemes.find((t) => t.value === selectedColorTheme)
                          ?.textPrimary || "#333333",
                    }}
                  >
                    {/* Header section */}
                    {/* Styling specific to template type */}
                    <Box
                      sx={{
                        mb: 3,
                        pb: 2,
                        borderBottom: `2px solid ${
                          themes[selectedLayout].primary
                        }`,
                        backgroundColor: selectedLayout === "classic"
                          ? (selectedColorTheme === "dark"
                            ? "#1a1a1a"
                            : "#fafafa")
                          : "transparent",
                        p: selectedLayout === "classic" ? 2 : 0,
                        borderRadius: selectedLayout === "classic" ? 1 : 0,
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: themes[selectedLayout].primary,
                          fontWeight: "bold",
                          fontSize: `calc(2.125rem * ${fontSize})`,
                          letterSpacing: selectedLayout === "minimal"
                            ? "-0.5px"
                            : "normal",
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        {resumeData.personalInfo.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: themes[selectedLayout].textSecondary,
                          mb: 1,
                          fontSize: `calc(1.25rem * ${fontSize})`,
                          fontWeight: selectedLayout === "modern" ? 500 : 400,
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        {resumeData.personalInfo.title}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          fontSize: `calc(0.8rem * ${fontSize})`,
                          color: themes[selectedLayout].textSecondary,
                          flexWrap: { xs: "wrap", sm: "nowrap" },
                          gap: 1,
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: `calc(0.8rem * ${fontSize})`,
                            fontFamily: selectedFont + ", sans-serif",
                          }}
                        >
                          {resumeData.personalInfo.email}
                        </Typography>
                        {resumeData.personalInfo.phone && (
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: `calc(0.8rem * ${fontSize})`,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {resumeData.personalInfo.phone}
                          </Typography>
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: `calc(0.8rem * ${fontSize})`,
                            fontFamily: selectedFont + ", sans-serif",
                          }}
                        >
                          {resumeData.personalInfo.location}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Summary section */}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: themes[selectedLayout].primary,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          mb: 1,
                          fontSize: `calc(1rem * ${fontSize})`,
                          borderBottom: selectedLayout === "minimal"
                            ? `1px solid ${themes[selectedLayout].primaryLight}`
                            : "none",
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        Professional Summary
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 3,
                          fontSize: `calc(0.875rem * ${fontSize})`,
                          lineHeight: 1.6,
                          color: themes[selectedLayout].textPrimary,
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        {resumeData.personalInfo.summary}
                      </Typography>
                    </Box>

                    {/* Experience section */}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: themes[selectedLayout].primary,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          mb: 1,
                          fontSize: `calc(1rem * ${fontSize})`,
                          borderBottom: selectedLayout === "minimal"
                            ? `1px solid ${themes[selectedLayout].primaryLight}`
                            : "none",
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        Professional Experience
                      </Typography>
                      {resumeData.experience.map((exp, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              fontSize: `calc(1rem * ${fontSize})`,
                              color: themes[selectedLayout].textPrimary,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {exp.company}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "medium",
                              fontSize: `calc(0.875rem * ${fontSize})`,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {exp.position}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontStyle: "italic",
                              fontSize: `calc(0.8rem * ${fontSize})`,
                              color: themes[selectedLayout].textSecondary,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {exp.duration}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              my: 1,
                              fontSize: `calc(0.875rem * ${fontSize})`,
                              color: themes[selectedLayout].textPrimary,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {exp.description}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: "wrap", gap: 1 }}
                          >
                            {exp.highlights.map((highlight, hIndex) => (
                              <Chip
                                key={hIndex}
                                label={highlight}
                                size="small"
                                sx={{
                                  bgcolor: themes[selectedLayout].primaryLight,
                                  fontSize: `calc(0.7rem * ${fontSize})`,
                                  height: `calc(24px * ${
                                    fontSize >= 1 ? fontSize : 1
                                  })`,
                                  border: selectedLayout === "minimal"
                                    ? `1px solid ${
                                      themes[selectedLayout].primary
                                    }22`
                                    : "none",
                                  fontFamily: selectedFont + ", sans-serif",
                                  color: themes[selectedLayout].textPrimary,
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </Box>

                    {/* Education section */}
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: themes[selectedLayout].primary,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          mb: 1,
                          fontSize: `calc(1rem * ${fontSize})`,
                          borderBottom: selectedLayout === "minimal"
                            ? `1px solid ${themes[selectedLayout].primaryLight}`
                            : "none",
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        Education
                      </Typography>
                      {resumeData.education.map((edu, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              fontSize: `calc(1rem * ${fontSize})`,
                              color: themes[selectedLayout].textPrimary,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {edu.institution}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "medium",
                              fontSize: `calc(0.875rem * ${fontSize})`,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {edu.degree}
                          </Typography>
                          {edu.duration && (
                            <Typography
                              variant="body2"
                              sx={{
                                fontStyle: "italic",
                                fontSize: `calc(0.8rem * ${fontSize})`,
                                color: themes[selectedLayout].textSecondary,
                                fontFamily: selectedFont + ", sans-serif",
                              }}
                            >
                              {edu.duration}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              mt: 1,
                              fontSize: `calc(0.875rem * ${fontSize})`,
                              color: themes[selectedLayout].textPrimary,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {edu.description}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Skills section */}
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: themes[selectedLayout].primary,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          mb: 1,
                          fontSize: `calc(1rem * ${fontSize})`,
                          borderBottom: selectedLayout === "minimal"
                            ? `1px solid ${themes[selectedLayout].primaryLight}`
                            : "none",
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        Skills
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: "wrap", gap: 1 }}
                      >
                        {resumeData.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: themes[selectedLayout].primaryLight,
                              fontSize: `calc(0.7rem * ${fontSize})`,
                              height: `calc(24px * ${
                                fontSize >= 1 ? fontSize : 1
                              })`,
                              mb: 1,
                              border: selectedLayout === "minimal"
                                ? `1px solid ${
                                  themes[selectedLayout].primary
                                }22`
                                : "none",
                              fontFamily: selectedFont + ", sans-serif",
                              color: themes[selectedLayout].textPrimary,
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* Core Competencies Section */}
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: themes[selectedLayout].primary,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          mb: 1,
                          fontSize: `calc(1rem * ${fontSize})`,
                          borderBottom: selectedLayout === "minimal"
                            ? `1px solid ${themes[selectedLayout].primaryLight}`
                            : "none",
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        Core Competencies
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: "wrap", gap: 1 }}
                      >
                        {resumeData.coreCompetencies.map((
                          competency,
                          index,
                        ) => (
                          <Chip
                            key={index}
                            label={competency}
                            size="small"
                            sx={{
                              bgcolor: themes[selectedLayout].primaryLight,
                              fontSize: `calc(0.7rem * ${fontSize})`,
                              height: `calc(24px * ${
                                fontSize >= 1 ? fontSize : 1
                              })`,
                              mb: 1,
                              border: selectedLayout === "minimal"
                                ? `1px solid ${
                                  themes[selectedLayout].primary
                                }22`
                                : "none",
                              fontFamily: selectedFont + ", sans-serif",
                              color: themes[selectedLayout].textPrimary,
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* Additional Qualifications Section */}
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: themes[selectedLayout].primary,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          mb: 1,
                          fontSize: `calc(1rem * ${fontSize})`,
                          borderBottom: selectedLayout === "minimal"
                            ? `1px solid ${themes[selectedLayout].primaryLight}`
                            : "none",
                          fontFamily: selectedFont + ", sans-serif",
                        }}
                      >
                        Additional Qualifications
                      </Typography>
                      {resumeData.additionalQualifications.map((
                        qualification,
                        index,
                      ) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            fontSize: `calc(0.875rem * ${fontSize})`,
                            mb: 0.5,
                            pl: 2,
                            position: "relative",
                            "&:before": {
                              content: '"•"',
                              position: "absolute",
                              left: 0,
                            },
                            fontFamily: selectedFont + ", sans-serif",
                            color: themes[selectedLayout].textPrimary,
                          }}
                        >
                          {qualification}
                        </Typography>
                      ))}
                    </Box>

                    {/* Notes Section (if present) */}
                    {resumeData.notes && resumeData.notes.trim() !== "" && (
                      <Box sx={{ mt: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: themes[selectedLayout].primary,
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            mb: 1,
                            fontSize: `calc(1rem * ${fontSize})`,
                            borderBottom: selectedLayout === "minimal"
                              ? `1px solid ${
                                themes[selectedLayout].primaryLight
                              }`
                              : "none",
                            fontFamily: selectedFont + ", sans-serif",
                          }}
                        >
                          Notes
                        </Typography>
                        <Box
                          sx={{
                            p: 2,
                            backgroundColor:
                              themes[selectedLayout].primaryLight,
                            borderRadius: 1,
                            borderLeft: `4px solid ${
                              themes[selectedLayout].primary
                            }`,
                            fontSize: `calc(0.875rem * ${fontSize})`,
                            mt: 1,
                            fontFamily: selectedFont + ", sans-serif",
                            color: themes[selectedLayout].textPrimary,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: `calc(0.875rem * ${fontSize})`,
                              fontFamily: selectedFont + ", sans-serif",
                            }}
                          >
                            {resumeData.notes}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ResumeBuilder;

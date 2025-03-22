import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
} from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Divider,
  alpha,
  useMediaQuery,
  Stack,
} from "@mui/material";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";
import RefreshIcon from "@mui/icons-material/Refresh";
import MouseIcon from "@mui/icons-material/Mouse";
import TimelineIcon from "@mui/icons-material/Timeline";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TouchAppIcon from "@mui/icons-material/TouchApp";

// Enhanced theme with better color palette
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5048E5",
      light: "#828DF8",
      dark: "#3832A0",
    },
    secondary: {
      main: "#FF6B6B",
      light: "#FFB4A2",
      dark: "#E23E57",
    },
    background: {
      default: "#F9FAFC",
      paper: "#FFFFFF",
    },
    success: {
      main: "#14B8A6",
      light: "#43C6B7",
      dark: "#0E8074",
    },
    info: {
      main: "#2196F3",
      light: "#64B6F7",
      dark: "#0B79D0",
    },
    warning: {
      main: "#FFB020",
      light: "#FFBF4C",
      dark: "#B27B16",
    },
    error: {
      main: "#D14343",
      light: "#DA6868",
      dark: "#922E2E",
    },
    grey: {
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    text: {
      primary: "#121828",
      secondary: "#65748B",
      disabled: "#9CA3AF",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
    "0px 1px 5px rgba(0, 0, 0, 0.05), 0px 2px 5px rgba(0, 0, 0, 0.06)",
    "0px 1px 8px rgba(0, 0, 0, 0.08), 0px 3px 4px rgba(0, 0, 0, 0.1)",
    "0px 2px 4px rgba(0, 0, 0, 0.08), 0px 4px 5px rgba(0, 0, 0, 0.08)",
    "0px 3px 5px rgba(0, 0, 0, 0.07), 0px 5px 8px rgba(0, 0, 0, 0.08)",
    "0px 3px 5px rgba(0, 0, 0, 0.06), 0px 6px 10px rgba(0, 0, 0, 0.1)",
    "0px 4px 5px rgba(0, 0, 0, 0.05), 0px 8px 10px rgba(0, 0, 0, 0.1)",
    "0px 5px 5px rgba(0, 0, 0, 0.04), 0px 8px 12px rgba(0, 0, 0, 0.1)",
    "0px 5px 6px rgba(0, 0, 0, 0.05), 0px 10px 14px rgba(0, 0, 0, 0.1)",
    "0px 6px 6px rgba(0, 0, 0, 0.05), 0px 10px 16px rgba(0, 0, 0, 0.1)",
    "0px 6px 7px rgba(0, 0, 0, 0.05), 0px 12px 16px rgba(0, 0, 0, 0.1)",
    "0px 7px 8px rgba(0, 0, 0, 0.05), 0px 12px 17px rgba(0, 0, 0, 0.1)",
    "0px 7px 8px rgba(0, 0, 0, 0.05), 0px 13px 19px rgba(0, 0, 0, 0.1)",
    "0px 7px 9px rgba(0, 0, 0, 0.05), 0px 14px 21px rgba(0, 0, 0, 0.1)",
    "0px 8px 9px rgba(0, 0, 0, 0.05), 0px 15px 22px rgba(0, 0, 0, 0.1)",
    "0px 8px 10px rgba(0, 0, 0, 0.05), 0px 16px 24px rgba(0, 0, 0, 0.1)",
    "0px 8px 11px rgba(0, 0, 0, 0.05), 0px 17px 26px rgba(0, 0, 0, 0.1)",
    "0px 9px 11px rgba(0, 0, 0, 0.05), 0px 18px 28px rgba(0, 0, 0, 0.1)",
    "0px 9px 12px rgba(0, 0, 0, 0.05), 0px 19px 29px rgba(0, 0, 0, 0.1)",
    "0px 10px 13px rgba(0, 0, 0, 0.05), 0px 20px 31px rgba(0, 0, 0, 0.1)",
    "0px 10px 13px rgba(0, 0, 0, 0.05), 0px 21px 33px rgba(0, 0, 0, 0.1)",
    "0px 10px 14px rgba(0, 0, 0, 0.05), 0px 22px 35px rgba(0, 0, 0, 0.1)",
    "0px 11px 14px rgba(0, 0, 0, 0.05), 0px 24px 36px rgba(0, 0, 0, 0.1)",
    "0px 11px 15px rgba(0, 0, 0, 0.05), 0px 26px 39px rgba(0, 0, 0, 0.1)",
  ],
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: "3rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.25rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.875rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    subtitle1: {
      fontSize: "1rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: "0.75rem",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          transition: "box-shadow 0.3s, transform 0.3s",
          "&:hover": {
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.09)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Enhanced color palette for charts
const colorPalette = [
  "#5048E5", // primary
  "#14B8A6", // success
  "#FFB020", // warning
  "#FF6B6B", // secondary
  "#2196F3", // info
  "#9C27B0", // purple
  "#00ACC1", // cyan
];

const MouseEventsDashboard = () => {
  const theme = lightTheme;
  const colors = colorPalette;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Track click positions (for the scatter chart)
  const [clickEvents, setClickEvents] = useState<
    Array<{ x: number; y: number; time: number }>
  >([]);
  const [lastClick, setLastClick] = useState<{
    x: number;
    y: number;
    time: number;
  } | null>(null);

  // Toggle for tracking mousemove
  const [trackMove, setTrackMove] = useState<boolean>(false);

  // Our eventCounts now includes 'move'
  const [eventCounts, setEventCounts] = useState<
    Record<
      | "click"
      | "enter"
      | "leave"
      | "over"
      | "out"
      | "down"
      | "up"
      | "move",
      number
    >
  >({
    click: 0,
    enter: 0,
    leave: 0,
    over: 0,
    out: 0,
    down: 0,
    up: 0,
    move: 0,
  });

  // Reference to the tracking area
  const trackingAreaRef = useRef<HTMLDivElement | null>(null);

  // Clear all collected data
  const handleReset = () => {
    setClickEvents([]);
    setLastClick(null);
    setEventCounts({
      click: 0,
      enter: 0,
      leave: 0,
      over: 0,
      out: 0,
      down: 0,
      up: 0,
      move: 0,
    });
  };

  // Record event helper
  const recordEvent = (
    type:
      | "click"
      | "enter"
      | "leave"
      | "over"
      | "out"
      | "down"
      | "up"
      | "move",
    event: ReactMouseEvent
  ) => {
    if (!trackingAreaRef.current) return;

    const rect = trackingAreaRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const time = Date.now();

    // Update last click info if event is click
    if (type === "click") {
      setLastClick({ x, y, time });
      setClickEvents((prev) => [...prev, { x, y, time }]);
    }

    // Increment event counter
    setEventCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  // Set up event listeners based on trackMove
  useEffect(() => {
    const trackingArea = trackingAreaRef.current;
    if (!trackingArea) return;

    const handleMouseClick = (e: MouseEvent) =>
      recordEvent("click", e as unknown as ReactMouseEvent);
    const handleMouseEnter = (e: MouseEvent) =>
      recordEvent("enter", e as unknown as ReactMouseEvent);
    const handleMouseLeave = (e: MouseEvent) =>
      recordEvent("leave", e as unknown as ReactMouseEvent);
    const handleMouseOver = (e: MouseEvent) =>
      recordEvent("over", e as unknown as ReactMouseEvent);
    const handleMouseOut = (e: MouseEvent) =>
      recordEvent("out", e as unknown as ReactMouseEvent);
    const handleMouseDown = (e: MouseEvent) =>
      recordEvent("down", e as unknown as ReactMouseEvent);
    const handleMouseUp = (e: MouseEvent) =>
      recordEvent("up", e as unknown as ReactMouseEvent);

    // Only attach mousemove if trackMove === true
    const handleMouseMove = (e: MouseEvent) =>
      recordEvent("move", e as unknown as ReactMouseEvent);

    trackingArea.addEventListener("click", handleMouseClick);
    trackingArea.addEventListener("mouseenter", handleMouseEnter);
    trackingArea.addEventListener("mouseleave", handleMouseLeave);
    trackingArea.addEventListener("mouseover", handleMouseOver);
    trackingArea.addEventListener("mouseout", handleMouseOut);
    trackingArea.addEventListener("mousedown", handleMouseDown);
    trackingArea.addEventListener("mouseup", handleMouseUp);

    if (trackMove) {
      trackingArea.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      trackingArea.removeEventListener("click", handleMouseClick);
      trackingArea.removeEventListener("mouseenter", handleMouseEnter);
      trackingArea.removeEventListener("mouseleave", handleMouseLeave);
      trackingArea.removeEventListener("mouseover", handleMouseOver);
      trackingArea.removeEventListener("mouseout", handleMouseOut);
      trackingArea.removeEventListener("mousedown", handleMouseDown);
      trackingArea.removeEventListener("mouseup", handleMouseUp);

      if (trackMove) {
        trackingArea.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [trackMove]); // re-run effect if trackMove changes

  // Prepare data for the event count bar chart
  const eventCountData = Object.entries(eventCounts).map(([key, value]) => ({
    name: key,
    count: value,
  }));

  // Prepare data for the pie chart (event distribution)
  const pieChartData = Object.entries(eventCounts)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key,
      value,
    }));

  // Timeline data for click events
  const timelineData = clickEvents.map((click, index) => {
    const clickTime = new Date(click.time);
    // Calculate time since first click if we have multiple clicks
    const timeSinceStart = clickEvents.length > 0 
      ? (click.time - clickEvents[0].time) / 1000 
      : 0;
    
    return {
      name: `Click ${index + 1}`,
      timeSinceStart: parseFloat(timeSinceStart.toFixed(2)),
      timestamp: `${clickTime.getMinutes()}:${clickTime.getSeconds().toString().padStart(2, '0')}.${clickTime.getMilliseconds().toString().padStart(3, '0')}`
    };
  });

  // Stats data
  const totalEvents = Object.values(eventCounts).reduce((sum, count) => sum + count, 0);
  const avgEventsPerClick = clickEvents.length > 0 
    ? (totalEvents / clickEvents.length).toFixed(2) 
    : '0';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          width: "100%",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.light, 0.05)})`,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Box display="flex" alignItems="center">
                <DashboardIcon 
                  sx={{ 
                    fontSize: 40, 
                    color: "primary.main",
                    mr: 2,
                    p: 1,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }} 
                />
                <Box>
                  <Typography variant="h4" component="h1" fontWeight="bold">
                    Mouse Events Dashboard
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Interactive mouse event tracking and visualization
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={trackMove}
                      onChange={(e) => setTrackMove(e.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight={500}>
                      Track Mouse Move
                    </Typography>
                  }
                />
                <Tooltip title="Reset All Data">
                  <IconButton 
                    onClick={handleReset} 
                    color="primary"
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>

          {/* Statistics Cards */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="overline" color="text.secondary">
                      Total Events
                    </Typography>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      {totalEvents}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="overline" color="text.secondary">
                      Clicks
                    </Typography>
                    <Typography variant="h4" color="secondary.main" fontWeight="bold">
                      {eventCounts.click}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="overline" color="text.secondary">
                      Events per Click
                    </Typography>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      {avgEventsPerClick}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="overline" color="text.secondary">
                      Mouse Moves
                    </Typography>
                    <Typography variant="h4" color="info.main" fontWeight="bold">
                      {eventCounts.move}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Tracking area */}
          <Grid item xs={12}>
            <Paper
              ref={trackingAreaRef}
              elevation={3}
              sx={{
                height: 300,
                position: "relative",
                overflow: "hidden",
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "primary.light",
                borderRadius: 3,
                transition: "all 0.3s",
                boxShadow: theme.shadows[4],
                "&:hover": {
                  boxShadow: theme.shadows[8],
                  borderColor: "secondary.main",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
                  p: 1,
                  borderRadius: 2,
                  boxShadow: theme.shadows[1],
                }}
              >
                <TouchAppIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  Interaction Area - Click or hover here
                </Typography>
              </Box>

              {clickEvents.map((click, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "absolute",
                    left: click.x - 5,
                    top: click.y - 5,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: colors[index % colors.length],
                    boxShadow: `0 0 8px ${colors[index % colors.length]}`,
                    opacity: 0.7,
                    pointerEvents: "none",
                    transition: "transform 0.2s",
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                      "0%": {
                        transform: "scale(1)",
                        opacity: 0.7,
                      },
                      "50%": {
                        transform: "scale(1.3)",
                        opacity: 0.5,
                      },
                      "100%": {
                        transform: "scale(1)",
                        opacity: 0.7,
                      },
                    },
                  }}
                />
              ))}
            </Paper>
          </Grid>

          {/* Last Click Info */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <MouseIcon sx={{ color: "secondary.main", mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Last Click Information
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {lastClick ? (
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.secondary.main, 0.05),
                      border: `1px dashed ${theme.palette.secondary.light}`,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          X Position
                        </Typography>
                        <Typography variant="h5" fontWeight="medium" color="secondary.main">
                          {lastClick.x.toFixed(0)}px
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Y Position
                        </Typography>
                        <Typography variant="h5" fontWeight="medium" color="secondary.main">
                          {lastClick.y.toFixed(0)}px
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Time
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {new Date(lastClick.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.grey[500], 0.05),
                      border: `1px dashed ${theme.palette.grey[300]}`,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No click events recorded yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Click in the tracking area above to record data.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Event Distribution Pie Chart (New) */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PieChartIcon sx={{ color: "primary.main", mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Event Distribution
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {totalEvents > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={colors[index % colors.length]} 
                            stroke={theme.palette.background.paper}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value: any, name: any) => [`${value} events`, name]}
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.grey[200],
                          borderRadius: 8,
                          boxShadow: theme.shadows[3],
                        }}
                      />
                      <Legend 
                        layout={isSmallScreen ? "horizontal" : "vertical"}
                        verticalAlign={isSmallScreen ? "bottom" : "middle"}
                        align={isSmallScreen ? "center" : "right"}
                        wrapperStyle={{ 
                          fontSize: 12,
                          paddingLeft: isSmallScreen ? 0 : 20,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.grey[500], 0.05),
                      border: `1px dashed ${theme.palette.grey[300]}`,
                      textAlign: "center",
                      height: 250,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No events recorded yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Interact with the tracking area to generate data.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Event Counts Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <BubbleChartIcon sx={{ color: "success.main", mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Event Counts
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={eventCountData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme.palette.grey[200]}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.grey[300] }}
                      tickLine={{ stroke: theme.palette.grey[300] }}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        borderColor: theme.palette.grey[200],
                        borderRadius: 8,
                        boxShadow: theme.shadows[3],
                        color: theme.palette.text.primary,
                      }}
                      cursor={{ fill: alpha(theme.palette.primary.main, 0.1) }}
                      formatter={(value: any) => [`${value} events`, 'Count']}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: 12 }}
                      formatter={(value) => (
                        <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                          {value}
                        </span>
                      )}
                    />
                    <Bar 
                      dataKey="count" 
                      fill={colors[0]} 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                      barSize={25}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Click Timeline (New) */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <TimelineIcon sx={{ color: "info.main", mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Click Timeline
                  </Typography>
                  <Tooltip title="Shows seconds elapsed since first click">
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        ml: 1, 
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        color: "info.main",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 500
                      }}
                    >
                      Seconds Since First Click
                    </Typography>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {timelineData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[200]} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.grey[300] }}
                        tickLine={{ stroke: theme.palette.grey[300] }}
                      />
                      <YAxis 
                        label={{ 
                          value: 'Seconds Elapsed', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { 
                            textAnchor: 'middle',
                            fill: theme.palette.text.secondary,
                            fontSize: 12
                          } 
                        }}
                        tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.grey[300] }}
                        tickLine={{ stroke: theme.palette.grey[300] }}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.grey[200],
                          borderRadius: 8,
                          boxShadow: theme.shadows[3],
                          color: theme.palette.text.primary,
                          padding: '8px 12px',
                        }}
                        formatter={(value: any, name: any, props: any) => {
                          const { payload } = props;
                          return [
                            <span>
                              <strong>{value} seconds</strong><br/>
                              Timestamp: {payload.timestamp}
                            </span>, 
                            'Elapsed Time'
                          ];
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line 
                        type="monotone" 
                        dataKey="timeSinceStart" 
                        stroke={colors[3]} 
                        strokeWidth={3}
                        dot={{ 
                          stroke: colors[3], 
                          strokeWidth: 2, 
                          r: 6, 
                          fill: theme.palette.background.paper 
                        }}
                        activeDot={{ 
                          stroke: theme.palette.background.paper, 
                          strokeWidth: 2, 
                          r: 8, 
                          fill: colors[3] 
                        }}
                        name="Elapsed Time"
                      />
                      
                      {/* Add markers for seconds */}
                      {[...Array(Math.ceil(timelineData.length > 0 ? timelineData[timelineData.length - 1].timeSinceStart : 0) + 1)].map((_, second) => (
                        <ReferenceLine 
                          key={`sec-${second}`}
                          y={second} 
                          stroke={alpha(theme.palette.grey[500], 0.3)}
                          strokeDasharray="3 3" 
                          label={{ 
                            value: `${second}s`, 
                            position: 'insideRight',
                            style: { 
                              fontSize: 10,
                              fill: theme.palette.text.secondary,
                              fontWeight: second % 5 === 0 ? 'bold' : 'normal',
                            }
                          }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.grey[500], 0.05),
                      border: `1px dashed ${theme.palette.grey[300]}`,
                      textAlign: "center",
                      height: 250,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No click events recorded yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Click in the tracking area to generate timeline data.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Click Positions Scatter Chart */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <BubbleChartIcon sx={{ color: "warning.main", mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Click Positions
                  </Typography>
                  <Badge
                    badgeContent={clickEvents.length}
                    color="secondary"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[200]} />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="X Position"
                      unit="px"
                      label={{
                        value: "X Position (px)",
                        position: "insideBottom",
                        offset: -5,
                        fill: theme.palette.text.secondary,
                      }}
                      tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.grey[300] }}
                      tickLine={{ stroke: theme.palette.grey[300] }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Y Position"
                      unit="px"
                      label={{
                        value: "Y Position (px)",
                        angle: -90,
                        position: "insideLeft",
                        fill: theme.palette.text.secondary,
                      }}
                      domain={[0, 300]}
                      reversed
                      tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                      axisLine={{ stroke: theme.palette.grey[300] }}
                      tickLine={{ stroke: theme.palette.grey[300] }}
                    />
                    <RechartsTooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        borderColor: theme.palette.grey[200],
                        borderRadius: 8,
                        boxShadow: theme.shadows[3],
                        color: theme.palette.text.primary,
                      }}
                      formatter={(value: any, name: any) => [
                        `${value}px`,
                        name === "Y Position" ? "Y Position" : "X Position",
                      ]}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: 12 }}
                      formatter={(value) => (
                        <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                          {value}
                        </span>
                      )}
                    />
                    <Scatter
                      name="Click Position"
                      data={clickEvents}
                      fill={colors[3]}
                      shape={(props: any) => {
                        const { cx, cy } = props;
                        return (
                          <g>
                            <circle
                              cx={cx}
                              cy={cy}
                              r={8}
                              fill="transparent"
                              stroke={colors[3]}
                              strokeWidth={2}
                              strokeOpacity={0.8}
                            />
                            <circle
                              cx={cx}
                              cy={cy}
                              r={4}
                              fill={colors[3]}
                              fillOpacity={0.9}
                            />
                          </g>
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default MouseEventsDashboard;
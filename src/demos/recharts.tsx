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
} from "recharts";
import RefreshIcon from "@mui/icons-material/Refresh";
import MouseIcon from "@mui/icons-material/Mouse";

// Custom theme (light mode)
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

// Color palette
const colorPalette = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088fe",
  "#00C49F",
  "#FFBB28",
];

const MouseEventsDashboard = () => {
  const theme = lightTheme;
  const colors = colorPalette;

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          p: 3,
          width: "100%",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                <MouseIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Real-time Mouse Events Dashboard
              </Typography>

              <Box display="flex" alignItems="center" gap={2}>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={trackMove}
                      onChange={(e) => setTrackMove(e.target.checked)}
                    />
                  }
                  label="Track Mouse Move"
                />
                <Tooltip title="Reset Data">
                  <IconButton onClick={handleReset} color="primary">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
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
                bgcolor: "rgba(240, 240, 240, 0.8)",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 2,
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: 6,
                  borderColor: "secondary.main",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  color: "text.secondary",
                  pointerEvents: "none",
                }}
              >
                Tracking Area - Click or interact in this space
              </Typography>

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
                    opacity: 0.7,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </Paper>
          </Grid>

          {/* Last Click Info */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Last Click Information
                </Typography>
                {lastClick ? (
                  <>
                    <Typography variant="body1">
                      Position: {lastClick.x.toFixed(0)}px,{" "}
                      {lastClick.y.toFixed(0)}px
                    </Typography>
                    <Typography variant="body1">
                      Time:{" "}
                      {new Date(lastClick.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1">
                    No click events recorded yet.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Event Counts Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Event Counts Chart
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={eventCountData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      label={{ value: "Event Type", position: "insideBottom", offset: -5 }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      label={{ value: "Count", angle: -90, position: "insideLeft" }}
                      tick={{ fontSize: 12 }}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderColor: "#ccc",
                        color: "#333",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="count" fill={colors[0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Click Positions Scatter Chart */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="h6" gutterBottom>
                    Click Positions Scatter Chart
                  </Typography>
                  <Badge
                    badgeContent={clickEvents.length}
                    color="secondary"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="X Position"
                      unit="px"
                      label={{
                        value: "X Position (px)",
                        position: "insideBottom",
                        offset: -5,
                      }}
                      tick={{ fontSize: 12 }}
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
                      }}
                      domain={[0, 300]}
                      reversed
                      tick={{ fontSize: 12 }}
                    />
                    <RechartsTooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderColor: "#ccc",
                        color: "#333",
                      }}
                      formatter={(value, name) => [`${value}`, name]}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
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
                              r={6}
                              fill={colors[3]}
                              fillOpacity={0.7}
                            />
                            <circle cx={cx} cy={cy} r={3} fill={colors[6]} />
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

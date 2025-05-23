// main.ts
import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import { load } from "https://deno.land/std@0.220.0/dotenv/mod.ts";

// Set up router
const router = new Router();

// Store active WebSocket connections
const sockets = new Set<WebSocket>();
let connectedUsers = 0;
const activeUsers = new Map<WebSocket, string>();

// Interface for sentiment analysis response
interface SentimentResponse {
  score: number;
  label: string;
  confidence: number;
}

// HuggingFace API integration for sentiment analysis
// HuggingFace API integration for sentiment analysis
async function analyzeWithHuggingFace(
  text: string,
): Promise<SentimentResponse> {
  try {
    const env = await load();
    const HUGGINGFACE_API_KEY = env["HUGGINGFACE_API_KEY"];

    if (!HUGGINGFACE_API_KEY) {
      throw new Error("HUGGINGFACE_API_KEY environment variable not set");
    }

    // Make the API request
    const apiResponse = await fetch(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      },
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(
        `HuggingFace API error: ${apiResponse.status} ${errorText}`,
      );
    }

    const result = await apiResponse.json();
    console.log("HuggingFace API result:", result);

    // Handle nested array structure
    let sentiment;

    // Check if it's a nested array structure [[{...}, {...}]]
    if (Array.isArray(result) && Array.isArray(result[0])) {
      // Get the first entry (highest confidence)
      sentiment = result[0][0];
    } // Check if it's a simple array structure [{...}, {...}]
    else if (Array.isArray(result) && result[0]) {
      sentiment = result[0];
    } // Otherwise we don't recognize the format
    else {
      throw new Error("Unrecognized API response format");
    }

    if (sentiment && sentiment.label && sentiment.score !== undefined) {
      const { label, score } = sentiment;

      // Convert to our format
      const normalizedScore = label === "POSITIVE" ? score : -score;

      return {
        score: normalizedScore,
        label: label === "POSITIVE"
          ? (score > 0.8 ? "Very Positive" : "Positive")
          : (score > 0.8 ? "Very Negative" : "Negative"),
        confidence: score * 100,
      };
    } else {
      throw new Error("Missing expected fields in API response");
    }
  } catch (error) {
    console.error("Error in HuggingFace sentiment analysis:", error);
    return {
      score: 0,
      label: "Neutral",
      confidence: 0,
    };
  }
}

// Sentiment Analysis API endpoint
router.post("/api/analyze-sentiment", async (ctx) => {
  console.log("📬 Sentiment analysis request received", ctx);
  try {
    const text = await ctx.request.body.text();

    if (!text || typeof text !== "string") {
      ctx.response.status = 400;
      ctx.response.body = { error: "Text parameter is required" };
      return;
    }

    // Call HuggingFace API for sentiment analysis
    try {
      const result = await analyzeWithHuggingFace(text);
      ctx.response.body = result;
    } catch (error) {
      console.error("HuggingFace API error:", error);
      ctx.response.status = 500;
      ctx.response.body = {
        error: "Error connecting to sentiment analysis service",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  } catch (error) {
    console.error("Error in sentiment analysis endpoint:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Failed to analyze text" };
  }
});

// Add WebSocket route
router.get("/ws", (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.response.status = 400;
    ctx.response.body = "Cannot upgrade to WebSocket";
    return;
  }

  try {
    const ws = ctx.upgrade();
    console.log("🔌 WebSocket connection established");

    // Add socket to the set of active connections
    sockets.add(ws);
    connectedUsers++;

    // Send current user count immediately after connection
    try {
      ws.send(JSON.stringify({
        type: "users_online",
        data: connectedUsers,
      }));
    } catch (error) {
      console.error("Error sending initial user count:", error);
    }

    // Handle WebSocket messages
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log("📨 Received message:", data);

        if (data.type === "join") {
          // Handle user join
          const username = data.data;
          activeUsers.set(ws, username);
          console.log(`👤 User joined: ${username}`);

          try {
            // Send welcome message to the user
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: "message",
                data: {
                  text: `Welcome to the chat, ${username}!`,
                  user: "System",
                  time: new Date().toLocaleTimeString(),
                },
              }));
            }

            // Notify others that a user has joined
            broadcast(
              {
                type: "message",
                data: {
                  text: `${username} has joined the chat`,
                  user: "System",
                  time: new Date().toLocaleTimeString(),
                },
              },
              ws,
            );

            // Broadcast updated user count after successful join
            broadcastUserCount();
          } catch (error) {
            console.error("Error processing join:", error);
          }
        } else if (data.type === "message") {
          // Handle chat message
          console.log(`💬 Message from ${data.data.user}: ${data.data.text}`);

          // Broadcast message to all clients
          broadcast({
            type: "message",
            data: {
              text: data.data.text,
              user: data.data.user,
              time: new Date().toLocaleTimeString(),
            },
          });
        } else if (data.type === "typing") {
          // Handle typing indicator
          const username = activeUsers.get(ws);
          if (username) {
            broadcast(
              {
                type: "typing",
                data: username,
              },
              ws,
            );
          }
        }
      } catch (error) {
        console.error("💥 Error processing WebSocket message:", error);
      }
    };

    // Handle WebSocket close
    ws.onclose = () => {
      try {
        console.log("🔌 WebSocket connection closed");
        sockets.delete(ws);

        if (connectedUsers > 0) {
          connectedUsers--;
        }

        // If the user had joined with a username, notify others
        if (activeUsers.has(ws)) {
          const username = activeUsers.get(ws);
          activeUsers.delete(ws);

          // Notify others that a user has left
          if (username) {
            broadcast({
              type: "message",
              data: {
                text: `${username} has left the chat`,
                user: "System",
                time: new Date().toLocaleTimeString(),
              },
            });
          }
        }

        // Update user count
        broadcastUserCount();
      } catch (error) {
        console.error("Error handling WebSocket close:", error);
      }
    };

    // Handle WebSocket errors
    ws.onerror = (e) => {
      console.error("🚨 WebSocket error:", e);
    };
  } catch (error) {
    console.error("Error upgrading to WebSocket:", error);
    ctx.response.status = 500;
    ctx.response.body = "Failed to establish WebSocket connection";
  }
});

// Helper function to broadcast messages to all clients
function broadcast(data: any, exclude: WebSocket | null = null) {
  const message = JSON.stringify(data);
  for (const socket of sockets) {
    try {
      if (socket !== exclude && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    } catch (error) {
      console.error("Error sending message to client:", error);
      // Remove problematic socket
      sockets.delete(socket);
    }
  }
}

// Helper function to broadcast user count
function broadcastUserCount() {
  console.log(`📊 Broadcasting user count: ${connectedUsers}`);
  broadcast({
    type: "users_online",
    data: connectedUsers,
  });
}

// Create Oak application
const app = new Application();

// Global error listener
app.addEventListener("error", (evt) => {
  console.log("🚨 Global error:", {
    error: evt.error,
    message: evt.error.message,
    stack: evt.error.stack,
  });
});

// CORS middleware
app.use(oakCors({
  origin: [
    "http://localhost:5173",
    "https://localhost:5173",
    /^https:\/\/(.*\.)?mellow-yellow-portfolio-9a6mk551hk1d\.deno\.dev$/,
    "https://mellow-yellow-portfolio.deno.dev",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// API routes
app.use(router.routes());
app.use(router.allowedMethods());

// Static files handler
app.use(async (ctx, next) => {
  const path = ctx.request.url.pathname;
  console.log("🔍 Request path:", path);
  console.log(
    "💻 Environment:",
    Deno.env.get("DENO_DEPLOYMENT_ID") ? "Production" : "Local",
  );

  try {
    // If it looks like a static asset, try to serve it
    if (path.startsWith("/assets/") || path.includes(".")) {
      try {
        // Try multiple possible roots
        const roots = ["./dist", "dist", "/dist"];
        let served = false;

        for (const root of roots) {
          try {
            await ctx.send({
              root,
              path,
            });
            console.log("📦 Successfully served static file from", root + path);
            served = true;
            break;
          } catch (e) {
            console.log(`📁 Attempted ${root}, trying next...`);
          }
        }

        if (!served) {
          throw new Error("Could not serve from any root");
        }
        return;
      } catch (error) {
        console.error("❌ Static file error for path:", path, error);
        await next();
      }
    } else {
      await next();
    }
  } catch (error) {
    console.error("💥 Middleware error:", error);
    await next();
  }
});

// SPA handler
app.use(async (ctx) => {
  const path = ctx.request.url.pathname;
  console.log("🌐 SPA handler for path:", path);

  if (!path.startsWith("/api") && !path.startsWith("/ws")) {
    try {
      console.log("📝 Attempting to serve index.html for path:", path);
      // Try multiple possible roots
      const roots = ["./dist", "dist", "/dist"];
      let served = false;

      for (const root of roots) {
        try {
          await ctx.send({
            root,
            path: "index.html",
            index: "index.html",
          });
          console.log("✅ Successfully served index.html from", root);
          served = true;
          break;
        } catch (e) {
          console.log(`📁 Attempted ${root}, trying next...`);
        }
      }

      if (!served) {
        throw new Error("Could not serve index.html from any root");
      }
    } catch (error) {
      console.error("💥 Error serving index.html for path:", path);
      console.error("Error details:", {
        message: (error as Error).message,
        stack: (error as Error).stack,
      });
      ctx.response.status = 500;
      ctx.response.body = "Server error";
    }
  }
});

// Dynamically set port based on environment
const PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8000;

// Listen with a more flexible configuration
await app.listen({
  port: PORT,
  // Remove explicit hostname for Deno Deploy compatibility
});

console.log(
  `🚀 Server is running on ${
    Deno.env.get("DENO_DEPLOYMENT_ID")
      ? "Deno Deploy"
      : `http://localhost:${PORT}`
  }`,
);

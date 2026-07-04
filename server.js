const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { message, persona, userProfile } = req.body || {};
    const msg = String(message || "").trim();
    if (!msg) return res.status(400).json({ error: "Missing message" });

    const system = [
      "You are SOPHIA-like: friendly humanoid robot persona, articulate and warm.",
      "You answer like a helpful assistant with a playful robot tone.",
      "Keep responses practical and clear. Use short steps when asked for plans.",
      "Think the user is: curious, playful, and wants hands-on help."
    ].join(" ");

    const personaLine = persona ? `Additional persona: ${persona}` : "";
    const userLine = userProfile ? `User profile: ${userProfile}` : "";

    // NOTE: This backend is ready, but still needs an AI provider key
    // If you don’t add keys yet, it will return a placeholder.
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(200).json({
        reply: "I’m ready, but I need your OPENAI_API_KEY set in Vercel Environment Variables."
      });
    }

    // Call OpenAI Chat Completions
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.4-nano",
        messages: [
          { role: "system", content: system + (personaLine ? "\n" + personaLine : "") + (userLine ? "\n" + userLine : "") },
          { role: "user", content: msg }
        ],
        temperature: 0.7
      })
    });

    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content || "No response.";
    res.status(200).json({ reply: text });
  } catch (e) {
    res.status(500).json({ error: String(e?.message || e) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on", port));

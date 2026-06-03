import Anthropic from "@anthropic-ai/sdk";
import { generateResponse } from "../util/genRes.js";

/**
 * EnviGuide Help Centre AI assistant.
 *
 * Proxies chat messages to the Claude API so the Anthropic API key never
 * reaches the browser. If ANTHROPIC_API_KEY is not configured, the endpoint
 * gracefully falls back to lightweight canned replies so the widget keeps
 * working at zero cost until a key is added.
 */

const SYSTEM_PROMPT = `You are "EnviGuide AI", the in-app assistant for EnviGuide — an environmental management platform for Product Carbon Footprints (PCF), supplier sustainability questionnaires, and data-quality ratings.

Your job is to help users of the Help Centre with:
- Product Carbon Footprint (PCF) creation, calculation, and reporting workflows.
- Supplier questionnaires and resolving data-collection issues.
- Platform navigation: dashboards, manuals, API keys, team roles, metric reports.
- General ESG and carbon-accounting concepts (GHG Protocol, scopes 1/2/3, cradle-to-gate, etc.).

Style:
- Be warm, concise, and practical. Default to 2-4 short sentences; use a compact bullet list only when steps genuinely help.
- Speak as part of the product ("you can…", "in EnviGuide…"). Use the occasional tasteful emoji (🌱) but don't overdo it.
- When a request needs a human or account-specific action, point users to the Support form or info@enviguide.com.

Boundaries:
- Only advise on EnviGuide and general ESG/PCF topics. Politely decline unrelated requests.
- Never invent specific figures, emission factors, customer data, or features you're unsure exist. If you don't know, say so and suggest the manuals or Support.`;

let cachedClient: Anthropic | null = null;

function getClient(): Anthropic | null {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || !apiKey.trim()) return null;
    if (!cachedClient) cachedClient = new Anthropic({ apiKey });
    return cachedClient;
}

type ChatRole = "user" | "assistant";
interface ChatMessage {
    role: ChatRole;
    content: string;
}

/** Normalise the loosely-typed body the frontend sends into Anthropic message params. */
function normaliseMessages(raw: unknown): ChatMessage[] {
    if (!Array.isArray(raw)) return [];
    const mapped: ChatMessage[] = raw
        .map((m: any) => {
            const text = typeof m?.text === "string" ? m.text : typeof m?.content === "string" ? m.content : "";
            const role: ChatRole = m?.role === "user" ? "user" : "assistant";
            return { role, content: String(text).trim() };
        })
        .filter((m) => m.content.length > 0);

    // The Messages API requires the first turn to be from the user — drop the
    // leading AI greeting (and any other leading assistant turns).
    while (mapped.length && mapped[0].role !== "user") mapped.shift();
    return mapped;
}

/** Canned reply used when no API key is configured (mirrors the frontend fallback). */
function fallbackReply(text: string): string {
    const t = text.toLowerCase();
    if (/\b(hi|hello|hey|hii|yo)\b/.test(t)) {
        return "Hey! 👋 What would you like help with today — PCF reports, supplier questionnaires, or something else?";
    }
    if (t.includes("pcf") || t.includes("carbon") || t.includes("footprint") || t.includes("emission")) {
        return "For Product Carbon Footprints, the PCF Manuals walk you through every step. Want me to point you to the PCF guidance, or connect you with a Manufacturer Consultant?";
    }
    if (t.includes("questionnaire") || t.includes("supplier")) {
        return "Supplier questionnaire trouble? A Supplier Consultant can help directly — tap “Supplier Consultant” to get routed there.";
    }
    if (t.includes("api") || t.includes("key") || t.includes("token")) {
        return "You'll find API key setup under the API documentation. Need a hand generating one?";
    }
    if (t.includes("contact") || t.includes("human") || t.includes("agent") || t.includes("support") || t.includes("email")) {
        return "Of course — our team replies within 24 hours. You can use the Support form or email info@enviguide.com.";
    }
    if (t.includes("thank")) {
        return "You're very welcome! 🌿 Happy to help anytime.";
    }
    return "Got it! I can point you to the right place — pick a context below, or I can take you to our Support team for a detailed answer.";
}

export async function aiChat(req: any, res: any) {
    try {
        const messages = normaliseMessages(req.body?.messages);
        if (!messages.length) {
            return res.send(generateResponse(false, "No message provided", 400, null));
        }

        const client = getClient();

        // No key configured → free canned fallback so the widget still responds.
        if (!client) {
            const lastUser = [...messages].reverse().find((m) => m.role === "user");
            return res.send(
                generateResponse(true, "ok", 200, { reply: fallbackReply(lastUser?.content ?? ""), source: "fallback" })
            );
        }

        const response = await client.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 1024,
            // cache_control marks the (stable) system prompt as cacheable. Caching
            // only activates once the prefix exceeds the model minimum, so it costs
            // nothing now and pays off automatically as the prompt grows.
            system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
            messages,
        });

        const reply = response.content
            .filter((b): b is Anthropic.TextBlock => b.type === "text")
            .map((b) => b.text)
            .join("")
            .trim();

        return res.send(generateResponse(true, "ok", 200, { reply, source: "claude" }));
    } catch (err: any) {
        console.error("aiChat error:", err?.message || err);
        return res.send(generateResponse(false, "AI chat is temporarily unavailable", 500, null));
    }
}

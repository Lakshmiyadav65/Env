/**
 * Resolves the URL of the standalone Knowledge Base app (opened in a new tab).
 *
 * Priority:
 * 1) Vite env var (if present): import.meta.env.VITE_KNOWLEDGE_BASE_URL
 * 2) If running the frontend on localhost/127.0.0.1: assume the KB dev server on http://localhost:5174
 * 3) Fallback to the same host on port 5174
 */
export function getKnowledgeBaseUrl(): string {
  const envUrl = (import.meta as any)?.env?.VITE_KNOWLEDGE_BASE_URL as
    | string
    | undefined;
  if (envUrl && typeof envUrl === "string" && envUrl.trim()) {
    return envUrl.trim().replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:5174";
    }
    return `${window.location.protocol}//${host}:5174`;
  }

  return "http://localhost:5174";
}

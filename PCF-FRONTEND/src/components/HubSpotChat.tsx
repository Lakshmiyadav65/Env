import { useEffect } from "react";

/**
 * Loads HubSpot's chat widget (HubSpot Conversations) — the same drop-in
 * chat widget climatiq.io uses (they load `//js.hs-scripts.com/19883532.js`).
 *
 * Everything visible — the chat bubble, greeting, bot questions, live-agent
 * handoff, lead capture and tickets — is configured in the HubSpot dashboard
 * under Settings → Tools → Chatflows. This component only injects the loader
 * script; there is no other code to write.
 *
 * Set your own HubSpot Portal (Hub) ID via `VITE_HUBSPOT_PORTAL_ID` (see
 * .env.example). When it is not set the widget is simply disabled, so this is
 * safe to mount in every environment.
 */
const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const SCRIPT_ID = "hs-script-loader";

export default function HubSpotChat() {
  useEffect(() => {
    if (!PORTAL_ID) {
      if (import.meta.env.DEV) {
        console.info(
          "[HubSpotChat] VITE_HUBSPOT_PORTAL_ID is not set — HubSpot chat is " +
            "disabled. Add your Portal ID to .env.local to enable it.",
        );
      }
      return;
    }

    // Guard against double-injection (React StrictMode double-mount, HMR).
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `//js.hs-scripts.com/${PORTAL_ID}.js`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}

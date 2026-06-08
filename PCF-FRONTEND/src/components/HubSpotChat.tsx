import { useEffect } from "react";

/**
 * Loads HubSpot's chat widget (HubSpot Conversations) — the same drop-in
 * chat widget climatiq.io uses (they load `//js.hs-scripts.com/19883532.js`).
 *
 * Everything visible — the chat bubble, greeting, bot questions, live-agent
 * handoff, lead capture and tickets — is configured in the HubSpot dashboard
 * under Settings → Tools → Chatflows. This component only injects the loader
 * script and controls when the bubble is shown.
 *
 * Scope: mounted from the main app `Layout` only. The Knowledge Base keeps its
 * own "Eco AI" assistant, so this component shows the HubSpot bubble while a
 * main-app page is mounted and removes it on unmount (e.g. when navigating
 * into the Knowledge Base) so the two bubbles never overlap.
 *
 * Set your own HubSpot Portal (Hub) ID via `VITE_HUBSPOT_PORTAL_ID` (see
 * .env.example). When it is not set the widget is simply disabled, so this is
 * safe to mount in every environment.
 */

declare global {
  interface Window {
    hsConversationsSettings?: Record<string, unknown>;
    hsConversationsOnReady?: Array<() => void>;
    HubSpotConversations?: {
      widget: {
        load: (options?: { widgetOpen?: boolean }) => void;
        remove: () => void;
        open: () => void;
        close: () => void;
        refresh: () => void;
        status: () => { loaded: boolean };
      };
    };
  }
}

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

    // `active` guards against the ready-callback firing after we've already
    // navigated away (e.g. into the Knowledge Base) — in that case we must
    // NOT show the bubble.
    let active = true;

    // Don't auto-show on script load; we decide visibility per route below.
    window.hsConversationsSettings = {
      ...(window.hsConversationsSettings ?? {}),
      loadImmediately: false,
    };

    const showWidget = () => {
      if (active) window.HubSpotConversations?.widget.load();
    };

    // Inject the loader script once; it persists across SPA navigation.
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `//js.hs-scripts.com/${PORTAL_ID}.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Show now if the Conversations API is already available, otherwise wait
    // for HubSpot to signal readiness.
    if (window.HubSpotConversations) {
      showWidget();
    } else {
      window.hsConversationsOnReady = window.hsConversationsOnReady ?? [];
      window.hsConversationsOnReady.push(showWidget);
    }

    // Leaving the main app (e.g. into the Knowledge Base): remove the bubble
    // so it never overlaps the Eco AI assistant.
    return () => {
      active = false;
      window.HubSpotConversations?.widget.remove();
    };
  }, []);

  return null;
}

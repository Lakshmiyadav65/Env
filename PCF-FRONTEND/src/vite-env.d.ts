/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * HubSpot Portal (Hub) ID used to load the HubSpot chat widget
   * (HubSpot Conversations) — the same drop-in chat climatiq.io uses.
   * Leave unset to disable the widget. See .env.example.
   */
  readonly VITE_HUBSPOT_PORTAL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

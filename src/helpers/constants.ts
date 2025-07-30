// ================================================
// ✅ Constants: Fallbacks for App Runtime Values
// Description: Static fallback values if .env/hydrated values are unavailable
// Author: NimbusCore.OpenAI
// Company: CryoRio
// ================================================

import { getEnvVar } from "../config/envHydrator";

// 🔧 App Identity
export const APP_TITLE = getEnvVar("REACT_APP_NAME") || "SkyLynxs";
export const FOOTER_TEXT = `${new Date().getFullYear()} @Skylynx LLC`;

// 🔐 Auth + External Services
export const FIREBASE_APIKEY =
  getEnvVar("FIREBASE_APIKEY") || "AIzaSyC9q_8eQGjKTHcvV-QCjy8UK61jnqb5Tkw";
export const PLAID_CLIENT_ID =
  getEnvVar("PLAID_CLIENT_ID") || "608336c497bb9a00116921b3";
export const PLAID_SECRET =
  getEnvVar("PLAID_SECRET") || "4666cc684b82d97367074ff2520b1e";

// 🌐 Stellar (Test)
export const Stellar_IssuerAct =
  getEnvVar("Stellar_IssuerAct") ||
  "GBW3KKPZJXDWIQKMN6ZTM4PFK5K5NSAREQHIBWAYT6BRAFF6OTDF754N";
export const Stellar_DistAct =
  getEnvVar("Stellar_DistAct") ||
  "GDA5NSJ5AA4SD7DQ32ZE3XNRN5EDHW6P26OYRCZSUXWA5OJ6PABBAOEA";
export const StellarAnchorClient_SKEY =
  getEnvVar("StellarAnchorClient_SKEY") || "";

// 🌐 App URLs
export const AuthServer_URL =
  getEnvVar("AuthServer_URL") || "http://localhost:5001/api/auth/";
export const SkylynxServer_URL =
  getEnvVar("SkylynxServer_URL") || "http://localhost:5001/api";
export const SkylynxServer_TemplatesURL =
  getEnvVar("SkylynxServer_TemplatesURL") ||
  "http://localhost:5001/api/nimbus/templates/targets/";
export const app_URL = getEnvVar("app_URL") || "https://skylynxnet:5001/";

// 🆔 Internal Portal Resolution
export const SkylynxKey_APIKEY =
  getEnvVar("SKYLYNX_API_KEY") || "2EEBE1A1-23CD-4C16-96E7-567C02EF79EA";
export const SkylynxKey_HostPortal =
  getEnvVar("SKYLYNX_HOST_PORTAL") || "SkyLynxNet";

// 📐 UI Constants
export const Sketch_HEIGHT = 300;
export const Sketch_WIDTH = 500;
export const FOOTER_HEIGHT = 30;
export const HEADER_HEIGHT = 60;
export const DRAWER_WIDTH = 250;
export const PAGE_WIDTH = 500;

// 🧾 Page Titles
export const PAGE_TITLE_HOME = "Home";
export const PAGE_TITLE_AUTH = "Login/Signup";
export const PAGE_TITLE_AUTH_SIGNUP = "Signup";
export const PAGE_TITLE_AUTH_LOGIN = "Login/Signup";
export const PAGE_TITLE_DASHBOARD = "Dashboard";
export const PAGE_TITLE_ACCOUNTS = "Accounts";
export const SUBPAGE_TITLE_BANK = "Devices";
export const SUBPAGE_TITLE_ETH = "Network";
export const SUBPAGE_TITLE_XLM = "Wallet";
export const PAGE_TITLE_SETTINGS = "Settings";

// ❗ Error Window UI
export const ERRORWIN_TOP = `30vh`;
export const ERRORWIN_LEFT = `15rem`;
export const ERRORWIN_WIDTH = `30rem`;

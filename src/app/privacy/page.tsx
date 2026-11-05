import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy — StudioSpace",
  description:
    "What StudioSpace collects when you browse, list, or book a studio — how it is used, who it is shared with, and the control you have over it.",
}

const sections = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "This policy explains what StudioSpace collects, why we collect it, and the choices you have. It applies to everything on the platform — browsing listings, publishing a studio, requesting a booking, and managing your account.",
      "StudioSpace is a peer-to-peer marketplace for creative spaces. We connect hosts who list studios with creators who book them by the hour, and we only ask for the information needed to make that work.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: [
      "We collect information you give us directly, plus a small amount of technical data needed to run the service.",
    ],
    bullets: [
      "Account details: your name, email address, an optional profile photo URL, and your password. Passwords are hashed by our authentication provider before they are stored — we never keep them in plain text.",
      "Listing details: everything you enter when publishing a studio — title, category, description, location, hourly rate, security deposit, capacity, amenities, host name and email, and the image you link.",
      "Booking details: the studio you reserved, the date and the hours you chose, your name and email, the total calculated from the studio's hourly rate, and the booking's current status.",
      "Usage information: which pages you visit and basic device or browser details, used to keep the service reliable and to diagnose problems.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    paragraphs: ["Your information powers the marketplace itself:"],
    bullets: [
      "Publish your listings so creators searching by craft, city, or budget can find them, and route your bookings to the host of the studio you reserved.",
      "Keep you signed in between pages and protect accounts from unauthorized access.",
      "Show each side of a transaction only what they need — a host sees the booking request made for their studio; you see the bookings you made.",
      "Improve the product: fixing bugs, understanding which pages and filters people actually use, and planning what to build next.",
      "Notify you about service changes. We do not sell your personal information.",
    ],
  },
  {
    id: "sharing",
    title: "When your information is shared",
    paragraphs: [
      "Because StudioSpace is a marketplace, some information is shared by design. We keep that sharing to what the transaction requires.",
    ],
    bullets: [
      "Hosts and guests: when you request a booking, the host receives the details needed to handle it — your name, email, date, and hours.",
      "Public listings: everything you publish as a listing — photos, rates, amenities, and location — is visible to anyone browsing the site, with or without an account.",
      "Service providers: we rely on third parties for hosting, database storage, and authentication. They process data only to provide those services to us.",
      "Legal requirements: we may disclose information when required by law, or to protect the rights, property, and safety of our users.",
    ],
  },
  {
    id: "google-sign-in",
    title: "Signing in with Google",
    paragraphs: [
      "If you choose to continue with Google, Google shares your name, email address, and profile image with StudioSpace under its own privacy policy. We use those details only to create and identify your account.",
      "Linking Google is optional — email and password works on its own. Signing out of StudioSpace ends your session in this browser; it does not affect your Google account.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    paragraphs: [
      "StudioSpace uses a session cookie and browser storage, set by our authentication provider, to keep you signed in as you move between pages.",
      "This service does not load advertising trackers or third-party analytics pixels, so nothing here sets cookies for ad targeting. Clearing cookies and site data in your browser will sign you out.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    paragraphs: [
      "We keep account information for as long as your account is active. Deleting a listing removes it from the marketplace immediately, while booking records are retained so both sides keep a history of what was reserved.",
      "You can ask us to delete your account and the personal data attached to it at any time — see Your rights below.",
    ],
  },
  {
    id: "security",
    title: "How we protect it",
    paragraphs: [
      "Traffic between you and StudioSpace is encrypted in transit (HTTPS), passwords are stored hashed, and access to production data is limited to the people and systems that need it to operate the service.",
      "No online system is perfectly secure. If we ever learn of a breach that affects your data, we will notify you and the relevant authorities as required by law.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    paragraphs: [
      "You stay in control of your data throughout your time on StudioSpace.",
    ],
    bullets: [
      "Access a copy of the personal data we hold about you.",
      "Correct inaccurate account details directly from your profile.",
      "Delete your account together with the listings you own.",
      "Choose not to link Google and use email and password instead.",
      "Opt out of non-essential communication by not subscribing to the newsletter.",
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    paragraphs: [
      "StudioSpace is designed for professionals booking workspace, and it is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with information, contact us and we will remove it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy as the product evolves. The revision date at the top of this page always reflects the latest version, and material changes will be called out on this page before they take effect.",
      "Continuing to use StudioSpace after an update means you accept the revised policy.",
    ],
  },
]

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="A plain-language account of what StudioSpace collects, why we collect it, and the control you keep over it."
      updated="November 4, 2026"
      sections={sections}
      contactTitle="Questions about your data?"
      contactText="Access, correction, and deletion requests are handled by the StudioSpace team — reach us through the official channels linked in the footer of every page and we will get back to you."
    />
  )
}

export default PrivacyPage

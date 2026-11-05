import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms & Conditions — StudioSpace",
  description:
    "The rules that govern using StudioSpace — accounts, listings, bookings, cancellations, and what both hosts and guests can expect from each other.",
}

const sections = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    paragraphs: [
      "These Terms & Conditions govern your use of StudioSpace. By creating an account, publishing a listing, or requesting a booking, you accept them in full.",
      "If you do not agree with any part of these terms, do not use the service. We may ask you to review an updated version of these terms when you sign in.",
    ],
  },
  {
    id: "the-service",
    title: "What StudioSpace is",
    paragraphs: [
      "StudioSpace is a marketplace that connects hosts who offer creative spaces — photography studios, sound stages, podcast rooms, music suites, and art workshops — with creators who want to book those spaces by the hour.",
      "StudioSpace is not the owner, operator, or insurer of any listing. Every rental arrangement is a direct agreement between the host and the guest, and StudioSpace is not a party to it. We provide the tools to discover spaces, request hours, and track bookings; what happens in the room is between the two parties.",
    ],
  },
  {
    id: "accounts",
    title: "Your account",
    paragraphs: [
      "You may browse the marketplace without an account, but listing a studio or requesting a booking requires one.",
    ],
    bullets: [
      "Provide accurate, current information — a name and email we can actually reach you at.",
      "Keep your password confidential and tell us right away if you believe your account has been accessed by someone else.",
      "You are responsible for everything that happens under your account, including bookings and listings made through it.",
      "You must be at least 18 years old to publish a listing or request a booking.",
      "One person may not maintain multiple accounts to circumvent these terms or another user's actions.",
    ],
  },
  {
    id: "listings",
    title: "Publishing a listing",
    paragraphs: [
      "Hosts decide what they publish: title, category, description, location, hourly rate, security deposit, capacity, amenities, and a photo for the listing.",
    ],
    bullets: [
      "Only list spaces you own or are authorized to rent out, and make sure you have the permissions, licenses, and insurance your local rules require.",
      "Descriptions, rates, photos, and availability must be accurate and kept up to date — guests book based on what you publish.",
      "Rates are stated per hour, and any security deposit you set is shown on your listing.",
      "You remain responsible for your listing and for the bookings it receives.",
    ],
  },
  {
    id: "bookings",
    title: "How bookings work",
    paragraphs: [
      "When you pick a date and hours on a studio page, StudioSpace sends a booking request to the host. The request starts as Pending and appears immediately in your My Bookings page.",
      "A request that overlaps a booking already confirmed for that studio is rejected automatically, so the same hours are never sold twice. The total shown on a booking is the studio's hourly rate multiplied by the hours you selected.",
      "Payments are not processed through StudioSpace in this release. Any payment or deposit arrangement is made directly between the host and the guest, and StudioSpace does not hold funds on either side's behalf.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations and changes",
    paragraphs: [
      "Plans change, so a Pending booking can be cancelled by you at any time from the My Bookings page — no approval needed while the request is still waiting.",
      "Once a booking has been Confirmed, changes and cancellations are agreed directly with the host. Cancellation terms beyond that are set by each host and should be settled between the parties before the session starts.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    paragraphs: ["StudioSpace is a working marketplace. In return for using it, you agree not to:"],
    bullets: [
      "Post listings or content that are false, misleading, infringing, unlawful, or that advertise a space you cannot actually provide.",
      "Use the platform to harass, impersonate, or defraud other users, or to move a transaction off-platform to avoid these terms.",
      "Scrape, mine, or reproduce the marketplace, or interfere with the service, its security, or other users' access to it.",
      "Circumvent booking, cancellation, or pricing mechanics, or manipulate ratings and availability.",
      "Use StudioSpace for any purpose that violates applicable law.",
    ],
  },
  {
    id: "host-responsibilities",
    title: "Host responsibilities",
    paragraphs: [
      "Hosts are responsible for delivering the space as described, at the hours confirmed, and for the safety and legality of everything that happens in it.",
      "This includes keeping the space in working order, providing accurate access instructions, respecting neighbours and local regulations, and resolving issues with guests professionally.",
      "Hosts are not employees or agents of StudioSpace, and do not act on our behalf.",
    ],
  },
  {
    id: "guest-responsibilities",
    title: "Guest responsibilities",
    paragraphs: [
      "Guests are responsible for using the space within its described capacity and purpose, arriving during the confirmed hours, and leaving the studio as they found it.",
      "Damage to the space, equipment, or property beyond normal use is the guest's responsibility and should be settled directly with the host.",
      "Guests must follow the host's house rules shared with the booking confirmation.",
    ],
  },
  {
    id: "content-and-ip",
    title: "Your content",
    paragraphs: [
      "You keep ownership of everything you publish on StudioSpace — listing copy, photos, and profile details. By publishing it, you grant StudioSpace a worldwide, non-exclusive licence to host, display, and adapt that content purely to operate and promote the marketplace.",
      "You confirm that you have the rights to the content and images you upload, and that publishing them does not violate anyone else's intellectual property or privacy rights.",
      "The StudioSpace name, logo, and site design belong to StudioSpace and may not be used without permission.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers and liability",
    paragraphs: [
      "StudioSpace is provided on an “as is” and “as available” basis. We work to keep listings accurate and the service reliable, but we do not guarantee that every listing is available, every description is error-free, or the service will be uninterrupted.",
      "To the fullest extent permitted by law, StudioSpace is not liable for indirect, incidental, or consequential damages arising from your use of the platform, including disputes between hosts and guests, loss of belongings, or damage occurring during a booking.",
      "Nothing in these terms limits liability that cannot be limited by law, or your statutory rights as a consumer.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and termination",
    paragraphs: [
      "You can stop using StudioSpace and ask us to delete your account at any time.",
      "We may suspend or close accounts that violate these terms, create risk for other users, or engage in fraudulent or unlawful activity. Where appropriate, we will give you notice and a chance to respond.",
      "Sections of these terms that by their nature should survive termination — including content licences and disclaimers — will continue to apply.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms as the service evolves. The date at the top of this page always reflects the latest revision, and material changes will be announced on this page or in the app before they take effect.",
      "Using StudioSpace after a revision means you accept the updated terms. If you do not accept them, stop using the service and ask us to close your account.",
    ],
  },
]

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="The ground rules for using StudioSpace — for creators booking hours, and for hosts opening their doors."
      updated="November 4, 2026"
      sections={sections}
      contactTitle="Not sure how a rule applies?"
      contactText="If anything here is unclear for your situation, reach the StudioSpace team through the official channels linked in our footer before you list or book — we are happy to walk you through it."
    />
  )
}

export default TermsPage

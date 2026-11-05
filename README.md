# StudioSpace

**Peer-to-Peer Creative Workspace & Production Studio Sharing Platform**

🌐 **Live Website:** `https://YOUR-LIVE-URL.vercel.app`

StudioSpace is a platform that connects creative professionals with workspace and production studio owners. Users can explore studios, view detailed information, list their own creative spaces, and book suitable studios.

## ✨ Key Features

- **Explore Studios:** Browse available creative workspaces and production studios.
- **Studio Details:** View studio descriptions, facilities, amenities, pricing, and availability.
- **User Authentication:** Register and log in using email/password or Google authentication.
- **Studio Management:** Add, edit, and delete your own studio listings.
- **Booking System:** Book studios and manage booking requests.
- **Double Booking Prevention:** Prevent conflicting bookings for the same studio and time slot.
- **My Bookings:** View booking history, check booking status, and cancel pending bookings.
- **My Listings:** Manage your own listed studios.
- **Protected Routes:** Secure private pages and backend operations using authentication and JWT verification.
- **Dark/Light Theme:** Switch between light and dark modes.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- **Notifications:** User-friendly feedback and confirmation dialogs.

## 🛠️ Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- next-themes
- Sonner

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth MongoDB Adapter
- JWT verification with JOSE

## ⚙️ Local Setup

### Prerequisites
- Node.js
- npm
- MongoDB Atlas account or local MongoDB instance
- Git

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/afrinnesa05-wq/studiospace.git
cd studiospace
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend root directory and configure the required environment variables.

Use the variable names from your project's environment configuration. Do not commit real credentials or secret keys.

### 4. Run the Frontend

```bash
npm run dev
 

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Clone the Backend Repository

Open another terminal:

```bash
git clone https://github.com/afrinnesa05-wq/studiospace-server.git
cd studiospace-server
```

### 6. Install Backend Dependencies

```bash
npm install
```

### 7. Configure Backend Environment Variables

Create a `.env` file in the backend root directory and add the required MongoDB connection string, authentication secrets, and other environment variables used by the backend.

Never publish actual secrets in GitHub.

### 8. Run the Backend

Use the development script configured in the backend's `package.json`.

## 🔐 Examiner Test Credentials

Use the following dedicated test account to evaluate the application.

- **Website URL:** `https://YOUR-LIVE-URL.vercel.app`
- **Email:** `YOUR-EXAMINER-TEST-EMAIL`
- **Password:** `YOUR-EXAMINER-TEST-PASSWORD`

> Replace these placeholders with a working test account before submission. Do not use your personal account password.

## 👩‍💻 Developer

**Foyjun Nesa Afrin**

GitHub: [afrinnesa05-wq](https://github.com/afrinnesa05-wq)

---

Built with ❤️ for creative professionals and workspace owners.
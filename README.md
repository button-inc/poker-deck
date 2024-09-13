# 🃏 GitHub Issue Estimate Tool

A **Next.js 14** project utilizing **Auth.js** with **GitHub OAuth** and **shadcn/ui** to create a seamless, async tool for estimating GitHub issues.

## 📑 Overview

This tool allows users to log in via **GitHub OAuth** and asynchronously estimate issues in their repositories. The UI is built using **shadcn/ui** components for a clean and modern experience. State management is efficiently handled using **signals-react-safe**.

## 🎯 Features

- **🧑‍💻 Next.js 14**: Fast and optimized server-side rendering.
- **🔐 GitHub OAuth**: Secure login using **Auth.js** with GitHub OAuth provider.
- **📦 GitHub API Integration**: Fetch and display issues directly from your GitHub repositories.
- **💅 shadcn/ui**: Elegant, responsive components for a modern interface.
- **🔔 signals-react-safe**: Simple and efficient state management with reactivity and safety in Next.js.
- **🔄 Async Estimates**: (TBD) Perform asynchronous estimations for GitHub issues.

## 🛠️ Tech Stack

- **Next.js 14** ⚡
- **Auth.js** 🔑 (GitHub OAuth)
- **shadcn/ui** 🎨
- **signals-react-safe** 📊 (State Management)
- **GitHub REST API** 🐙

## 🔑 Authentication

This project leverages **Auth.js** to manage authentication using GitHub OAuth, allowing users to securely log in and interact with their GitHub repositories.

- Once authenticated, users can view and manage issues from their GitHub repositories directly in the app.
- The GitHub OAuth access token is securely stored in the session to allow fetching and manipulating GitHub issues on behalf of the user.

### Setting up GitHub OAuth Application

To enable GitHub OAuth authentication in this project, follow these steps:

1. **Log in to GitHub**  
   Visit [GitHub](https://github.com) and log in with your account.

2. **Create a New OAuth Application**  
   Head over to the [GitHub Developer Settings](https://github.com/settings/developers) page, and click **"New OAuth App"**.

3. **Register the OAuth Application**  
   Fill out the registration form with the following details:

   - **Application Name**: Enter a descriptive name for your app.
   - **Homepage URL**: Provide the main URL of your app (e.g., `https://yourapp.com`).
   - **Authorization Callback URL**: Specify the callback URL that GitHub should use after a successful OAuth authentication (e.g., `https://yourapp.com/auth/callback`).

4. **Obtain Client ID and Client Secret**  
   After registering, GitHub will generate a **Client ID** and **Client Secret** for your app. These credentials will be used to integrate GitHub OAuth with your application.

5. **Configure GitHub OAuth in Your App**  
   In your project, add the **Client ID** and **Client Secret** to your configuration or environment variables to complete the GitHub OAuth setup.

For additional guidance, refer to the official [GitHub OAuth documentation](https://docs.github.com/en/developers/apps/building-oauth-apps).

## 🎨 UI with shadcn/ui

We’re using **[shadcn/ui](https://ui.shadcn.dev/)** to build a clean and intuitive interface.

### Key Features:

- **Responsive Design** 📱: The UI is fully responsive, ensuring an optimal experience on both desktop and mobile devices.
- **Customizable Components** ⚙️: Each component is designed to be easily styled and customized to fit your specific requirements.

### Installing shadcn/ui Components

You can add components to your project in two ways: via the CLI or by manually copying the component code.

### Option 1: Install Components via CLI

1. Install the **shadcn/ui** CLI:

   ```bash
   npm install shadcn-cli
   ```

2. Add components using the CLI:

   ```bash
   npx shadcn add button
   ```

   Replace `button` with the component you'd like to install. For a full list of available components, refer to the [shadcn/ui documentation](https://ui.shadcn.dev/docs/components).

### Option 2: Copy & Paste Component Code

If you'd prefer, you can manually copy and paste the component code into your project:

1. Visit the [shadcn/ui components page](https://ui.shadcn.dev/docs/components).
2. Find the component you need and copy its code.
3. Paste the code into your project, making any necessary adjustments to fit your design and setup.

### Customizing Components

- Each component is designed to be fully customizable with CSS or any preferred styling solution.
- You can extend or modify the components to match your project’s branding and UI needs.

## 📊 State Management with signals-react-safe

We are using **signals-react-safe** for state management, which is a simple and reactive state management library for **React**. It ensures safety in **Next.js** applications by managing reactivity without causing memory leaks or stale state.

## 📂 Folder Structure

```bash
.
src
├── actions         # Next.js server actions
└── api
    ├── api
    │   └── auth    # Auth.js API routes
├── auth            # Auth.js configuration
├── components      # UI Components (built with shadcn/ui)
├── constants       # Constants used across the application
├── data            # Data used across the application
├── hooks           # Custom React hooks
├── lib             # Common functions and services
├── signals         # State management with signals-react-safe
├── .env            # Environment variables
├── .env.local      # Environment secrets
└── README.md       # You're reading it now!
```

## 🔄 Current Functionality

- Login page
- Dashboard page
- Sidebar
- User profile with `Log Out` button
- Team selector to filter GitHub isues by team label
- View issues needing estimates per team
- Navigate issues, view details, and allow for user estimate

## ✨ Future Enhancements

- **📦 DevOpsy Stuff**: Implement CI\CD and the like...
- **💬 Estimations**: Capture user estimates per issue
- **📊 Progress Tracking**: Track estimation progress for issues
- **🔔 Notifications**: Get notified when estimates are completed

💻 Built with 🤸 by team **Button'eers**

## 🏁 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2️⃣ Set Up Environment Variables

Create a `.env` file, as per `.env.example`, and add your environment variables:

```
AUTH_URL=http://localhost:3000
API_URL=https://api.github.com/

```

Create a `.env.local` file, as per `.env.local.example`, and add your GitHub OAuth credentials:

```
AUTH_SECRET=find-in-one-password-PokerDeck.env.local
AUTH_GITHUB_ID=find-in-one-password-PokerDeck.env.local
AUTH_GITHUB_SECRET=find-in-one-password-PokerDeck.env.local
```

### 3️⃣ Run the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The app will be available at `http://localhost:3000`.

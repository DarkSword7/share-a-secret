# Share a Secret

A secure web application for sharing sensitive information with automatic expiration and one-time viewing capabilities.

## 🌟 Features

- **🔐 Secure Encryption**: All secrets are encrypted using AES encryption before storage
- **⏰ Auto-Expiration**: Configure secrets to expire after 1 hour, 24 hours, 7 days, or custom duration
- **👁️ One-Time View**: Secrets can be set to delete automatically after first view
- **🔒 Password Protection**: Optional password protection for additional security
- **👤 User Authentication**: Sign in with Google or GitHub to manage your secrets
- **📋 Dashboard**: View and manage all your created secrets
- **📱 Responsive Design**: Beautiful Material UI interface that works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (React + TypeScript) + Material UI
- **Backend**: tRPC for type-safe API calls
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google & GitHub providers
- **State Management**: React Query (via tRPC)
- **Encryption**: CryptoJS for AES encryption
- **Deployment**: Ready for Vercel deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use the provided Neon database)
- Google OAuth credentials (optional, for authentication)
- GitHub OAuth credentials (optional, for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd share-a-secret
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.local` or create your own with these variables:

   ```bash
   # Database
   DATABASE_URL="your-postgresql-connection-string"
   POSTGRES_URL="your-postgresql-connection-string"

   # NextAuth.js
   AUTH_SECRET="your-auth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-auth-secret"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   ```

4. **Set up the database**

   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Creating a Secret

1. Go to the homepage
2. Enter your secret message
3. Configure security options:
   - **One-time view**: Delete after first view
   - **Expiry time**: Set when the secret expires
   - **Password protection**: Require a password to view
4. Click "Create Secret"
5. Share the generated URL with the intended recipient

### Viewing a Secret

1. Open the shared secret URL
2. If password protected, enter the password
3. Click "Reveal Secret" to view the content
4. If it's a one-time secret, it will be deleted after viewing

### Managing Secrets (Requires Authentication)

1. Sign in using Google or GitHub
2. Visit the Dashboard to see all your secrets
3. Monitor status, copy URLs, or delete secrets
4. Search and filter your secrets

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🏗️ Project Structure

```
share-a-secret/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── secret/[token]/    # Secret viewing page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── crypto.ts         # Encryption utilities
│   ├── prisma.ts         # Prisma client
│   └── trpc.ts           # tRPC setup
├── prisma/               # Database schema
├── server/               # tRPC server and routers
└── utils/                # Client-side utilities
```

## 🔐 Security Features

- **AES Encryption**: All secret content is encrypted before database storage
- **Secure Token Generation**: Uses cryptographically secure random tokens
- **Password Hashing**: Passwords are hashed using SHA-256
- **Automatic Cleanup**: Expired and viewed secrets are properly marked
- **No Content Logging**: Secret content never appears in logs
- **HTTPS Ready**: Secure transport in production

## 🚀 Deployment

The app is ready for deployment on Vercel:

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

For other platforms, build the app:

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Material-UI](https://mui.com/)
- Database ORM by [Prisma](https://prisma.io/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)
- Type-safe APIs with [tRPC](https://trpc.io/)

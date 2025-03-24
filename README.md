# CivicVoice

CivicVoice is a **community-driven grievance voicing platform** that enables residents to raise and track local issues while allowing locality admins to address and resolve concerns efficiently. Built with **Next.js** and **PostgreSQL (Prisma ORM)**, it provides a seamless experience for residents and authorities to collaborate on improving local governance.

## 🚀 Features

- 🏛 **Local Administration** – Government and NGO admins oversee and address issues within their localities, ensuring timely resolutions.  
- 🏷 **Categorized Reporting** – Users can report issues under specific tags and subtags, providing detailed descriptions and images for clarity.  
- 📸 **Resolution Proof** – Admins upload images as proof upon resolving issues, maintaining transparency and accountability.  
- 📧 **Email Notifications** – Users receive email alerts when their reported issues are resolved, keeping them informed.  
- 👍 **Upvote System** – Community members can upvote issues, helping prioritize those that matter most.  
- 👤 **User Profiles** – Manage your reports and track the status of your submissions through personalized profiles.  
- 🌍 **Local Community** – View issues in your neighborhood and stay informed to form a better-informed society.  
- 🔒 **Secure Registration & Authentication** – User accounts are protected with secure authentication methods to ensure privacy and safety.  
- 📱 **Mobile Accessibility** – Report and track issues on-the-go with our mobile-friendly platform.  
 

## 🛠 Tech Stack

- **Frontend & Backend**: Next.js (Full-stack)  
- **Database**: PostgreSQL with Prisma ORM  
- **Authentication**: NextAuth  
- **File Storage**: Cloudinary  
- **AI content checks**: Gemini
- **Email alerts**: Resend


## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/amlansarangi23/civicvoice.git
cd civicvoice
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and configure the following:
```bash

DATABASE_URL="your_database_url"
NEXTAUTH_URL="your_nextauth_url"
NEXTAUTH_SECRET="your_nextauth_secret"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

GOOGLE_API_KEY="your_google_api_key"
```

### 4️⃣ Run Database Migrations
```bash
npx prisma migrate dev
```

### 5️⃣ Start the Development Server
```bash
npm run dev
```

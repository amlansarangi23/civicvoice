# CivicVoice

CivicVoice is a **community-driven grievance voicing platform** that enables residents to raise and track local issues while allowing locality admins to address and resolve concerns efficiently. Built with **Next.js** and **PostgreSQL (Prisma ORM)**, it provides a seamless experience for residents and authorities to collaborate on improving local governance.

## 🚀 Features

- 🏙 **Resident Complaints** – Users can post grievances about their locality.  
- ✅ **Admin Resolution Panel** – Locality admins can manage and resolve issues.  
- 📷 **Image Uploads** – Attach images to complaints using Cloudinary.  
- 🔑 **Secure Authentication** – Powered by NextAuth.  
- 🔍 **Google API Integration** – Geolocation support for better issue tracking.  
- 📊 **Real-time Status Updates** – Track progress of submitted complaints.  

## 🛠 Tech Stack

- **Frontend & Backend**: Next.js (Full-stack)  
- **Database**: PostgreSQL with Prisma ORM  
- **Authentication**: NextAuth  
- **File Storage**: Cloudinary  
- **AI content checks**: Gemini


## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/civicvoice.git
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

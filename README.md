# 💬 Chit Chat App

The **Chit Chat App** is a warm and inviting social chatting platform designed to help people connect, communicate, and share in a secure and user-friendly way.  
It focuses on **real-time conversations**, **privacy**, and **community-building**, with a simple, modern, and approachable design.

---

## ✨ Features

### 👤 Member User
- 🔐 Clerk authentication & profile setup
- 📸 Upload images with optimized image processing using **Sharp.js**
- 🔎 Filter application members
- 💬 **Private Conversations** – 1-on-1 chats between members
- 🔔 Unread message toast notifications
- 🚨 Report member (message and/or photo)
- 📜 Scroll/continue personal conversation
- ❤️ Like / bookmark members, with:
  - View **who liked me**
  - View **mutual likes**
- ⚙️ Preferences setting for better matching with other members - matching algorithm

---

### 🛡️ Admin User
- 🔐 Clerk authentication
- 📝 Resolve reported content
- ⛔ Ban members
- 📂 Monitor previous bans
- 🚫 Manage forbidden words (chat filter)
- 👀 Monitor all conversations with delete message option
- 🖼️ Manage uploaded photos with **approval system**

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/)  
- **UI Library**: [React 19+](https://react.dev/)  
- **Authentication**: [Clerk 6+](https://clerk.dev/)  
- **ORM & Database**: [Prisma 6+](https://www.prisma.io/) + [Supabase](https://supabase.com/)  
- **Real-Time**: [Pusher API](https://pusher.com/)  
- **Validation**: [Zod](https://zod.dev/)  
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)  
- **Image Handling**: [Sharp.js](https://sharp.pixelplumbing.com/) (resize & compression)  
- **UI Components**: [Shadcn](https://ui.shadcn.com/)  
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/bojan-ski/next-chit-chat
cd chit-chat-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Accounts
[Clerk 6+](https://clerk.dev/)

[Supabase](https://supabase.com/) 

[Pusher API](https://pusher.com/)

### 4. Environment Setup - .env
```env
# Database
SUPABASE_PASSWORD=
DATABASE_URL=
DIRECT_URL=

# Supabase Storage
SUPABASE_BUCKET_NAME=
SUPABASE_URL=
SUPABASE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Pusher
PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_KEY=
PUSHER_SECRET=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

### 5. Run the Development Server
```bash
npm run dev
```

---

## 👨‍💻 Author
Developed with ❤️ by BPdevelopment (bojan-ski)
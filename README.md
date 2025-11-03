# 🚀 Strapi CMS — Blog Content Management System

A modern **Strapi v4** setup for managing a blog backend, complete with a **TypeScript seeder**, **webhook integration** to Next.js, and **production deployment** via Railway.

---

## 🧠 Overview

This repository contains the **Strapi CMS** that powers your blog.  
It includes:

- 🧑‍💻 Author, Category, Tag, Post, Comment & Newsletter content types
- 🌱 Seeder script with full markdown demo content
- 🔗 Webhook integration for automatic frontend rebuilds
- ☁️ Deployment-ready setup for Railway & Vercel

---

## 🧭 Data Model Diagram

![Data Model Diagram](./public/data-model-diagram.png)

### Entity Relationships

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Author    │         │     Tag     │         │  Category   │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ name        │         │ name        │         │ name        │
│ slug        │         │ slug        │         │ slug        │
│ email       │         └──────┬──────┘         └──────┬──────┘
└──────┬──────┘                │                       │
       │ 1                     │ 1..*                  │ 1
       │                       │                       │
       │ 1..          ┌────────┴────────┐             │
       └──────────────┤      Post       ├─────────────┘
                      ├─────────────────┤
                      │ title           │
                      │ slug            │
                      │ content         │
                      │ published_at    │
                      └────────┬────────┘
                               │ 1
                               │
                               │ 1..*
                      ┌────────┴────────┐
                      │    Comment      │
                      ├─────────────────┤
                      │ content         │
                      │ author_name     │
                      │ author_email    │
                      └─────────────────┘

┌─────────────┐
│ Newsletter  │  ← Guest subscribes via website form
├─────────────┤
│ email       │
│ subscribed  │
│ status      │
└─────────────┘
```

### Data Model Summary

| Entity | Fields | Relationships |
|--------|--------|---------------|
| **Author** | name, slug, email | 1 → Many Posts |
| **Category** | name, slug | 1 → Many Posts |
| **Tag** | name, slug | Many ↔ Many Posts |
| **Post** | title, slug, content, published_at | Belongs to Author, Category; Has Many Tags, Comments |
| **Comment** | content, author_name, author_email | Belongs to Post |
| **Newsletter** | email, subscribed, status | Standalone (Guest subscriptions from website) |

---

## ⚙️ Installation & Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-strapi-cms.git
cd your-strapi-cms
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file at the root using `.env.example`:

```env
HOST=0.0.0.0
PORT=1337

# 🔐 Security & Secrets
ADMIN_JWT_SECRET=your_admin_jwt_secret_here
API_TOKEN_SALT=your_api_token_salt_here
JWT_SECRET=your_jwt_secret_here
APP_KEYS=your_app_key_1,your_app_key_2,your_app_key_3,your_app_key_4

# 🌐 Database (if using PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=your_database_host
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
```

### 4. Run the Strapi server

**Development mode** (Auto-reload enabled):

```bash
npm run develop
# or
yarn develop
```

**Production mode** (Auto-reload disabled):

```bash
npm run start
# or
yarn start
```

**Build admin panel:**

```bash
npm run build
# or
yarn build
```

---

## 🌱 Strapi Seeder Script (TypeScript)

Populate your database with demo content.

### ▶️ Run with:

```bash
npx ts-node seed.ts
```

Or add this to your `package.json`:

```json
"scripts": {
  "seed": "ts-node seed.ts"
}
```

### 🧩 Seeder Content

| Type | Count | Description |
|------|-------|-------------|
| 👩‍💻 Authors | 2 | Full bio + slug + email |
| 📚 Categories | 3 | Tech, Design, Business |
| 🏷️ Tags | 5 | JavaScript, React, Next.js, etc. |
| 📝 Posts | 8 | Full markdown content + images |
| 💬 Comments | Many | Linked to posts and users |
| 📬 Newsletter | Many | Simple subscription model |

---

## 🌍 Hosted Links

| Resource | URL |
|----------|-----|
| 🏠 Strapi Admin | [https://opus-production-3e99.up.railway.app/admin](https://opus-production-3e99.up.railway.app/admin) |
| 🔌 GraphQL Playground | [https://opus-production-3e99.up.railway.app/graphql](https://opus-production-3e99.up.railway.app/graphql) |
| 🌐 API Endpoint | [https://opus-production-3e99.up.railway.app/api](https://opus-production-3e99.up.railway.app/api) |

---

## 🔁 Webhook Configuration (Strapi → Next.js)

Set up a webhook to automatically rebuild your frontend whenever content changes.

### 📡 Steps

1. Go to **Settings → Webhooks → Create Webhook**
2. Fill in the details below:

| Field | Value |
|-------|-------|
| **Name** | Rebuild Frontend |
| **URL** | `https://opus-lab-take-home-assignment-front-taupe.vercel.app/api/revalidate` |
| **Events** | Entry publish, update, unpublish (Posts, Categories, Tags, Authors) |
| **Headers** | `x-webhook-secret: REBUILD_TOKEN_123` |

3. Save the webhook

💡 **Important:** Make sure your Next.js app has this same secret in its `.env` file:

```env
NEXT_PUBLIC_REVALIDATE_SECRET=REBUILD_TOKEN_123
```

### 🔄 How It Works

```
Strapi CMS (Content Updated)
         ↓
   Webhook Triggered
         ↓
Next.js API Route (/api/revalidate)
         ↓
  Static Pages Regenerated
         ↓
   Fresh Content Served
```

---

## 🚀 Deployment

### Railway (Recommended)

1. **Connect your GitHub repository** to Railway
2. **Add environment variables** in Railway dashboard
3. **Deploy automatically** on every push

```bash
# Or deploy using Strapi CLI
yarn strapi deploy
```

### Environment Variables for Production

Make sure to set these in your Railway/hosting platform:

- `HOST=0.0.0.0`
- `PORT=1337`
- `ADMIN_JWT_SECRET`
- `API_TOKEN_SALT`
- `JWT_SECRET`
- `APP_KEYS`
- Database credentials (if applicable)

---

## 📚 Learn More

- 📖 [Strapi Documentation](https://docs.strapi.io)
- 🎓 [Tutorials](https://strapi.io/tutorials)
- 📰 [Strapi Blog](https://strapi.io/blog)
- 🧩 [Changelog](https://strapi.io/changelog)
- 💡 [Resource Center](https://strapi.io/resource-center)

---

## ✨ Community & Contribution

- 💬 [Discord](https://discord.strapi.io) — Join the Strapi community
- 💡 [Forum](https://forum.strapi.io) — Ask questions and share ideas
- 🌟 [Awesome Strapi](https://github.com/strapi/awesome-strapi) — Curated resources

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Strapi CMS**

<sub>🤫 Psst… [Strapi is hiring!](https://strapi.io/careers)</sub>

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

## ⚙️ Installation & Development

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/your-strapi-cms.git
cd your-strapi-cms
2. Install dependencies
bash
Copy code
npm install
# or
yarn install
3. Run the Strapi server
Development mode
Auto-reload enabled.

bash
Copy code
npm run develop
# or
yarn develop
Production mode
Auto-reload disabled.

bash
Copy code
npm run start
# or
yarn start
Build admin panel
bash
Copy code
npm run build
# or
yarn build


🌱 Strapi Seeder Script (TypeScript)
Populate your database with demo content.

▶️ Run with:
bash
Copy code
npx ts-node seed.ts
Or add this to your package.json:

json
Copy code
"scripts": {
  "seed": "ts-node seed.ts"
}


🧩 Seeder Content
Type	Count	Description
👩‍💻 Authors	2	Full bio + slug + email
📚 Categories	3	Tech, Design, Business
🏷️ Tags	5	JavaScript, React, Next.js, etc.
📝 Posts	8	Full markdown content + images
💬 Comments	Many	Linked to posts and users
📬 Newsletter	Many	Simple subscription model

⚙️ Environment Variables (.env)
env
Copy code
HOST=0.0.0.0
PORT=1337
ADMIN_JWT_SECRET=Q2l9r9hf0E1uA3gRZ1j+f7Ls5tC6yD8x
API_TOKEN_SALT=F8h6X1g5L9p0V3q2B7nY4k2J6sR8T1w
TRANSFER_TOKEN_SALT=W3k9Z5d8P1m4Q7r2H0j6X9n5B8s2A3b
JWT_SECRET=M7K4J2L8D3S0P5V1Q9N6H7X2R4Y3C8T0
APP_KEYS=U1d2G3h4J5k6L7m8,N9O0P1Q2R3S4T5U6,V7W8X9Y0Z1A2B3C4,D5E6F7G8H9I0J1K2

🟢 Hosted Admin Panel:
https://opus-production-3e99.up.railway.app/admin

🔁 Webhook Configuration (Strapi → Next.js)
Set up a webhook to automatically rebuild your frontend whenever content changes.

📡 Steps
Go to Settings → Webhooks → Create Webhook

Fill in the details below:

Field	Value
Name	Rebuild Frontend
URL	https://opus-lab-take-home-assignment-front-taupe.vercel.app/api/revalidate
Events	Entry publish, update, unpublish (Posts, Categories)
Secret Header	x-webhook-secret
Secret Value	REBUILD_TOKEN_123

💡 Make sure your Next.js app has this same secret in its .env file.

🧭 Data Model Diagram
The system includes the following entities:

Author

Category

Tag

Post

Comment

User

Newsletter

Entity Relationships
Author → Post → 1..*

Category → Post → 1..*

Post ↔ Tag → *..*

Post → Comment → 1..*

User → Comment → 1..*

Newsletter → standalone

🖼️ Visual Data Model (ERD)
(Add your generated diagram image here)

md
Copy code
![Data Model Diagram](./path-to-your-diagram.png)
🚀 Deployment
Strapi supports multiple deployment methods.

Railway (Recommended)
bash
Copy code
yarn strapi deploy
📘 Learn more: Deployment Docs

📚 Learn More
📖 Strapi Documentation

🎓 Tutorials

📰 Strapi Blog

🧩 Changelog

💡 Resource Center

✨ Community & Contribution
💬 Discord — Join the Strapi community

💡 Forum — Ask questions and share ideas

🌟 Awesome Strapi — Curated resources

<sub>🤫 Psst… Strapi is hiring!</sub>

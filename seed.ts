import fs from "fs";
import path from "path";

// ✅ Interface Types
interface AuthorData {
  name: string;
  slug: string;
  email: string;
  bio?: string;
}

interface CategoryData {
  name: string;
  slug: string;
  description?: string;
}

interface TagData {
  name: string;
  slug: string;
}

interface PostData {
  title: string;
  slug: string;
  content: string;
  coverImageUrl?: string;
  published_date?: string;
  category: string;
  author: string;
  tags: string[];
}

// ✅ Helper to load JSON
const loadJSON = (filePath: string) => {
  const abs = path.resolve(filePath);
  return JSON.parse(fs.readFileSync(abs, "utf8"));
};

async function seed() {
  console.log("🌱 Starting Strapi seed...");

  const strapiFactory = require("@strapi/strapi");

  async function seed() {
    const strapi = await strapiFactory().load();
    await strapi.start();

    console.log("✅ Strapi is running!");
    await strapi.destroy();
  }

  seed();
  const data = loadJSON(path.join(__dirname, "data/seed-data.json"));

  // Clear existing data (optional)
  console.log("🧹 Clearing existing entries...");
  await Promise.all([
    strapi.db.query("api::post.post").deleteMany({}),
    strapi.db.query("api::author.author").deleteMany({}),
    strapi.db.query("api::category.category").deleteMany({}),
    strapi.db.query("api::tag.tag").deleteMany({}),
  ]);

  // Insert Authors
  console.log("👤 Creating authors...");
  for (const author of data.authors as AuthorData[]) {
    await strapi.db.query("api::author.author").create({ data: author });
  }

  // Insert Categories
  console.log("📚 Creating categories...");
  for (const category of data.categories as CategoryData[]) {
    await strapi.db.query("api::category.category").create({ data: category });
  }

  // Insert Tags
  console.log("🏷️ Creating tags...");
  for (const tag of data.tags as TagData[]) {
    await strapi.db.query("api::tag.tag").create({ data: tag });
  }

  // Insert Posts
  console.log("📝 Creating posts...");
  for (const post of data.posts as PostData[]) {
    // Get related entities by slug
    const author = await strapi.db.query("api::author.author").findOne({
      where: { slug: post.author },
    });

    const category = await strapi.db.query("api::category.category").findOne({
      where: { slug: post.category },
    });

    const tags = await Promise.all(
      post.tags.map(async (slug) =>
        strapi.db.query("api::tag.tag").findOne({ where: { slug } })
      )
    );

    await strapi.db.query("api::post.post").create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        published_date: post.published_date,
        publishedAt: new Date(),
        author: author ? author.id : null,
        category: category ? category.id : null,
        tags: tags.filter(Boolean).map((t) => t!.id),
      },
    });
  }

  console.log("✅ Seed completed successfully!");
  await strapi.destroy();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

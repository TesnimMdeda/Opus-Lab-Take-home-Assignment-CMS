/**
 * Strapi Database Seeder - TypeScript Version
 * File: /seed.ts
 * Run with: npm run seed or ts-node seed.ts
 */

const strapiFactory = require("@strapi/strapi");

interface PostData {
  title: string;
  slug: string;
  coverImageUrl: string;
  content: string;
  published_date: string;
  author: number;
  category: number;
  tags: number[];
}

async function seed() {
  const strapi = await strapiFactory().load();

  console.log("🌱 Starting database seeding...");

  try {
    // Check if data already exists
    const existingPosts = await strapi.entityService.findMany(
      "api::post.post",
      {
        limit: 1,
      }
    );

    if (
      existingPosts &&
      Array.isArray(existingPosts) &&
      existingPosts.length > 0
    ) {
      console.log("⚠️  Database already seeded. Skipping...");
      console.log("💡 To re-seed, delete existing data first.");
      await strapi.destroy();
      return;
    }

    // 1. Create Authors
    console.log("👤 Creating authors...");
    const authors = await Promise.all([
      strapi.entityService.create("api::author.author", {
        data: {
          name: "John Doe",
          slug: "john-doe",
          Email: "john@example.com",
          bio: "Full-stack developer and technical writer",
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create("api::author.author", {
        data: {
          name: "Jane Smith",
          slug: "jane-smith",
          Email: "jane@example.com",
          bio: "UX designer and content strategist",
          publishedAt: new Date(),
        },
      }),
    ]);
    console.log(`✅ Created ${authors.length} authors`);

    // 2. Create Categories
    console.log("📁 Creating categories...");
    const categories = await Promise.all([
      strapi.entityService.create("api::category.category", {
        data: {
          name: "Technology",
          slug: "technology",
          description: "Latest tech trends and tutorials",
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create("api::category.category", {
        data: {
          name: "Design",
          slug: "design",
          description: "UI/UX and visual design articles",
          publishedAt: new Date(),
        },
      }),
      strapi.entityService.create("api::category.category", {
        data: {
          name: "Business",
          slug: "business",
          description: "Startup and entrepreneurship content",
          publishedAt: new Date(),
        },
      }),
    ]);
    console.log(`✅ Created ${categories.length} categories`);

    // 3. Create Tags
    console.log("🏷️  Creating tags...");
    const tagData = [
      { name: "JavaScript", slug: "java-script" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "type-script" },
      { name: "Next.js", slug: "next-js" },
      { name: "css", slug: "css" },
    ];

    const tags = await Promise.all(
      tagData.map((tag) =>
        strapi.entityService.create("api::tag.tag", {
          data: {
            ...tag,
            publishedAt: new Date(),
          },
        })
      )
    );
    console.log(`✅ Created ${tags.length} tags`);

    // 4. Create Posts with cover images and relationships
    console.log("📝 Creating posts...");
    const posts: PostData[] = [
      {
        title: "Modern CSS Techniques for 2024",
        slug: "modern-css-techniques",
        coverImageUrl: "/uploads/css_55e24b692f.png",
        content: `# Modern CSS Techniques for 2024

CSS has evolved dramatically. Let's explore the modern techniques every developer should know.

## CSS Grid

CSS Grid has transformed layout design. Unlike Flexbox, Grid allows you to work in two dimensions:
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
\`\`\`

## Container Queries

Container queries allow components to respond to their container's size:
\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

## CSS Custom Properties

Make your stylesheets more maintainable with variables:
\`\`\`css
:root {
  --primary-color: #3b82f6;
  --spacing: 1rem;
}
\`\`\`

## The :has() Selector

This powerful pseudo-class allows parent selection:
\`\`\`css
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}
\`\`\`

## Conclusion

Modern CSS provides powerful tools for creating beautiful, responsive websites. Stay updated with these techniques!`,
        published_date: "2025-09-25",
        author: authors[1].id,
        category: categories[1].id,
        tags: [tags[4].id],
      },
      {
        title: "Getting Started with Next.js 14",
        slug: "getting-started-nextjs-14",
        coverImageUrl: "/uploads/nextjs_7084db26e3.png",
        content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features that make building React applications faster and more efficient than ever before.

## What's New

Next.js 14 introduces several game-changing features:

- **Turbopack**: The new bundler that's significantly faster than Webpack
- **Server Actions**: Simplified data mutations without API routes
- **Partial Prerendering**: Combine static and dynamic content seamlessly
- **Improved Image Optimization**: Better performance with native lazy loading

## Quick Setup

Getting started is incredibly simple:
\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## The App Router

The App Router introduces a new way to structure your application with the **app/** directory. All components are Server Components by default, which means better performance and less JavaScript sent to the client.

## Conclusion

Next.js 14 represents a major leap forward in web development. Start building today and experience the future of React!`,
        published_date: "2025-10-29",
        author: authors[0].id,
        category: categories[0].id,
        tags: [tags[0].id, tags[3].id, tags[1].id],
      },
      {
        title: "TypeScript Best Practices for React Developers",
        slug: "typescript-best-practices-react",
        coverImageUrl: "/uploads/typ_04f4420b5a.webp",
        content: `# TypeScript Best Practices for React

TypeScript has become the standard for modern React development. Here's how to use it effectively.

## Why TypeScript?

- **Type Safety**: Catch errors before runtime
- **Better IDE Support**: Autocomplete and suggestions
- **Improved Refactoring**: Confidently restructure code
- **Self-Documenting**: Types serve as documentation

## Typing Props

Always define explicit types for component props:
\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

## Event Handlers

Use proper event types:
\`\`\`typescript
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value);
}
\`\`\`

## Utility Types

Leverage TypeScript's built-in utilities:
\`\`\`typescript
type UserPreview = Pick<User, 'id' | 'name'>;
type UserWithoutPassword = Omit<User, 'password'>;
type PartialUser = Partial<User>;
\`\`\`

## Avoid 'any'

Use \`unknown\` instead of \`any\` for better type safety.

## Conclusion

TypeScript might seem overwhelming at first, but these practices will help you write better, safer code.`,
        published_date: "2024-08-13",
        author: authors[0].id,
        category: categories[0].id,
        tags: [tags[0].id, tags[2].id, tags[1].id],
      },
      {
        title: "Building Responsive Layouts with Tailwind CSS",
        slug: "building-responsive-layouts",
        coverImageUrl: "/uploads/tailwind_58f54783cf.webp",
        content: `# Building Responsive Layouts with Tailwind CSS

Tailwind CSS makes building responsive layouts incredibly efficient with its utility-first approach.

## Mobile-First Design

Tailwind uses a mobile-first breakpoint system:
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Content -->
</div>
\`\`\`

## Breakpoints

- \`sm\`: 640px and up
- \`md\`: 768px and up
- \`lg\`: 1024px and up
- \`xl\`: 1280px and up
- \`2xl\`: 1536px and up

## Flexbox Utilities

Create flexible layouts easily:
\`\`\`html
<div class="flex flex-col md:flex-row justify-between items-center">
  <div>Logo</div>
  <nav>Menu</nav>
</div>
\`\`\`

## Grid Layouts

Build complex grids with simple classes:
\`\`\`html
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-8">Main</div>
  <div class="col-span-12 md:col-span-4">Sidebar</div>
</div>
\`\`\`

## Spacing and Sizing

Use consistent spacing with Tailwind's scale:
\`\`\`html
<div class="p-4 md:p-8 space-y-4">
  <h1 class="text-2xl md:text-4xl">Title</h1>
  <p class="text-base md:text-lg">Content</p>
</div>
\`\`\`

## Conclusion

Tailwind CSS simplifies responsive design with its intuitive utility classes. Start building responsive layouts faster!`,
        published_date: "2024-07-22",
        author: authors[0].id,
        category: categories[1].id,
        tags: [tags[3].id, tags[1].id, tags[4].id],
      },
      {
        title: "React Performance Optimization Tips",
        slug: "react-performance-optimization",
        coverImageUrl:
          "/uploads/React_Performance_Optimization_Techniques_0bf4828f5a_7c741bde17.jpg",
        content: `# React Performance Optimization Tips

Learn how to make your React applications blazingly fast with these optimization techniques.

## Use React.memo

Prevent unnecessary re-renders of functional components:
\`\`\`typescript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data.title}</div>;
});
\`\`\`

## useMemo for Expensive Calculations

Cache expensive computations:
\`\`\`typescript
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);
\`\`\`

## useCallback for Functions

Memoize callback functions:
\`\`\`typescript
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
\`\`\`

## Code Splitting

Split your code into smaller chunks:
\`\`\`typescript
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

## Virtualize Long Lists

Use libraries like react-window for long lists:
\`\`\`typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={500}
  itemCount={1000}
  itemSize={35}
>
  {Row}
</FixedSizeList>
\`\`\`

## Conclusion

These optimization techniques will significantly improve your React app's performance. Apply them wisely!`,
        published_date: "2025-10-04",
        author: authors[1].id,
        category: categories[0].id,
        tags: [tags[0].id, tags[1].id],
      },
      {
        title: "Essential UI/UX Design Principles",
        slug: "essential-ui-ux-design-principles",
        coverImageUrl: "/uploads/1710764333477_666750b866.jpeg",
        content: `# Essential UI/UX Design Principles

Great design is invisible. Here are the principles that make interfaces intuitive and delightful.

## Consistency

Maintain consistency throughout your design:
- Use the same button styles
- Keep spacing uniform
- Maintain consistent typography
- Use a cohesive color palette

## Visual Hierarchy

Guide users' attention with hierarchy:
- Size: Larger elements draw attention
- Color: Contrast highlights importance
- Position: Top and left are noticed first
- Spacing: White space creates focus

## Feedback

Always provide feedback for user actions:
- Button states (hover, active, disabled)
- Loading indicators
- Success/error messages
- Form validation

## Accessibility

Design for everyone:
- Sufficient color contrast (WCAG AA: 4.5:1)
- Keyboard navigation support
- Screen reader compatibility
- Clear focus indicators

## Mobile-First

Start with mobile constraints:
- Prioritize essential content
- Design for touch targets (44x44px minimum)
- Consider one-handed use
- Optimize for slower connections

## White Space

Don't fear empty space:
- Improves readability
- Creates visual breathing room
- Emphasizes important elements
- Makes interfaces feel premium

## Conclusion

These principles form the foundation of great UI/UX design. Apply them consistently for better user experiences.`,
        published_date: "2025-09-30",
        author: authors[1].id,
        category: categories[1].id,
        tags: [tags[4].id],
      },
      {
        title: "JavaScript ES2024 Features You Should Know",
        slug: "javascript-es2024-features",
        coverImageUrl:
          "/uploads/Amazing_new_Javascript_features_in_ES_15_af4d32ecf9.webp",
        content: `# JavaScript ES2024 Features You Should Know

ES2024 brings exciting new features to JavaScript. Let's explore what's new!

## Array Grouping

Group array elements easily:
\`\`\`javascript
const products = [
  { name: 'Laptop', category: 'electronics' },
  { name: 'Shirt', category: 'clothing' },
  { name: 'Phone', category: 'electronics' }
];

const grouped = Object.groupBy(products, item => item.category);
// { electronics: [...], clothing: [...] }
\`\`\`

## Promise.withResolvers()

Cleaner promise creation:
\`\`\`javascript
const { promise, resolve, reject } = Promise.withResolvers();

// Later...
resolve('Success!');
\`\`\`

## Array findLast Methods

Find elements from the end:
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const lastEven = numbers.findLast(n => n % 2 === 0); // 4
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0); // 3
\`\`\`

## Temporal API (Stage 3)

Modern date/time handling:
\`\`\`javascript
const now = Temporal.Now.instant();
const date = Temporal.PlainDate.from('2024-11-01');
const duration = Temporal.Duration.from({ hours: 2, minutes: 30 });
\`\`\`

## Top-Level Await

Use await at the module level:
\`\`\`javascript
const data = await fetch('/api/data').then(r => r.json());
export default data;
\`\`\`

## Conclusion

ES2024 continues to improve JavaScript with developer-friendly features. Start using them in your projects today!`,
        published_date: "2025-11-01",
        author: authors[0].id,
        category: categories[0].id,
        tags: [tags[0].id],
      },
      {
        title: "Proven Startup Growth Strategies for 2024",
        slug: "startup-growth-strategies-2024",
        coverImageUrl: "/uploads/Organic_growth_chart_e26ccef016.jpg",
        content: `# Proven Startup Growth Strategies for 2024

Growing a startup requires strategy, execution, and persistence. Here are proven approaches that work.

## Product-Led Growth

Let your product drive acquisition:
- Freemium models that showcase value
- Self-service onboarding
- Viral loops and referral programs
- In-product upgrade prompts

## Content Marketing

Build authority and organic traffic:
- Educational blog posts
- SEO-optimized content
- Video tutorials and demos
- Case studies and success stories

## Community Building

Create engaged user communities:
- Discord or Slack channels
- Reddit communities
- LinkedIn groups
- Regular webinars and events

## Strategic Partnerships

Leverage complementary businesses:
- Integration partnerships
- Co-marketing campaigns
- Referral agreements
- Joint webinars

## Data-Driven Iteration

Make decisions based on metrics:
- Track key metrics (CAC, LTV, churn)
- A/B test everything
- User feedback loops
- Regular cohort analysis

## Customer Success

Turn customers into advocates:
- Proactive support
- Regular check-ins
- Success milestones
- Customer spotlights

## Conclusion

Successful startups combine multiple growth strategies and iterate based on what works. Start with one channel and expand from there.`,
        published_date: "2024-11-06",
        author: authors[0].id,
        category: categories[2].id,
        tags: [tags[0].id, tags[1].id],
      },
    ];

    let createdCount = 0;
    for (const post of posts) {
      // Find the existing uploaded image by URL
      const existingImage = await strapi.db
        .query("plugin::upload.file")
        .findOne({
          where: { url: post.coverImageUrl },
        });

      await strapi.entityService.create("api::post.post", {
        data: {
          title: post.title,
          slug: post.slug,
          content: post.content,
          published_date: post.published_date,
          author: post.author,
          category: post.category,
          tags: post.tags,
          coverImage: existingImage ? existingImage.id : null,
          publishedAt: new Date(),
        },
      });
      createdCount++;
      console.log(`  ✓ Created: ${post.title}`);
    }
    console.log(`✅ Created ${createdCount} posts`);

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("📊 Summary:");
    console.log(`   - ${authors.length} authors`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${tags.length} tags`);
    console.log(`   - ${createdCount} posts`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await strapi.destroy();
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("✅ Seed script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seed script failed:", error);
    process.exit(1);
  });

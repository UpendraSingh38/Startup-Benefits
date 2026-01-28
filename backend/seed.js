import "dotenv/config.js";
import mongoose from "mongoose";
import Deal from "./models/Deal.js";
import User from "./models/User.js";

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing data
    await Deal.deleteMany({});
    await User.deleteMany({});

    // Create sample deals
    const deals = await Deal.insertMany([
      {
        title: "Figma Pro - 50% Off",
        description: "Get 50% off Figma Pro for the first 6 months",
        category: "Design",
        locked: false,
        partner: "Figma"
      },
      {
        title: "Stripe - $500 Credit",
        description: "Get $500 in free Stripe processing credits",
        category: "Payments",
        locked: false,
        partner: "Stripe"
      },
      {
        title: "AWS - $1000 Credit",
        description: "Get $1000 in AWS credits for first year",
        category: "Cloud",
        locked: true,
        partner: "AWS"
      },
      {
        title: "GitHub Pro - Free for 1 Year",
        description: "Free GitHub Pro subscription for 12 months",
        category: "Development",
        locked: false,
        partner: "GitHub"
      },
      {
        title: "Notion - Team Plan Discount",
        description: "20% off Notion Team plan",
        category: "Productivity",
        locked: false,
        partner: "Notion"
      },
      {
        title: "Slack - Free Credits",
        description: "$100 credit towards Slack Pro",
        category: "Communication",
        locked: false,
        partner: "Slack"
      }
    ]);

    console.log(`✅ Seeded ${deals.length} deals`);

    // Create sample user
    const user = await User.create({
      email: "demo@startup.com",
      password: "hashed_password_here",
      name: "Demo User"
    });

    console.log("✅ Seeded 1 user");
    console.log("✅ Database seeding complete!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedData();

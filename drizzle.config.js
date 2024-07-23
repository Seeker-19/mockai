/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://interview_owner:wYEO6gMjZ0TW@ep-summer-heart-a5xqw6r9.us-east-2.aws.neon.tech/interview?sslmode=require",
  },
};

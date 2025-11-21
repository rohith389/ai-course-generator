/** @type { import("drizzle-kit").Config } */
import dotenv from 'dotenv';
dotenv.config();
export default {
  schema: "./configs/Schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://ai-course-creation_owner:npg_98mAtxLeIHTp@ep-young-cake-a5xf8209.us-east-2.aws.neon.tech/ai-course-creation?sslmode=require"
    
  }
};
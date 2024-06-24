import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv"
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    }
  },
  bucket: process.env.S3_BUCKET_NAME!,
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, Orders],
  routes:{
    admin: '/sell'
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Market",
      favicon: "/favicon.ico",
      ogImage: "/favicon.ico",
    },
  },
  rateLimit: {
    max: 2000,
  },

  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-type.ts"),
  },
  plugins: [
    cloudStorage({
        collections: { 
          'media': {
            adapter: storageAdapter,
          },
        },
      }),
    ],
})
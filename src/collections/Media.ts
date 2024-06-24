import { User } from "../payload-type";
import { Access, CollectionConfig } from "payload/types";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3"
import payload from "payload";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function deleteFileFromS3(fileKey: string) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileKey,
  };

  try {
    await s3.send(new DeleteObjectCommand(params)); 
  } catch (err) {
  }
}

const isAdminOrHasAccessToImages = (): Access => async ({
  req
}) => {
  const user = req.user as User | undefined

  if(!user) return false
  if(user.role === 'admin') return true

  return {
    user:{
      equals: req.user.id,
    }
  }
}

export const Media: CollectionConfig = {
  slug: "media",
  hooks: {
    beforeChange: [({ req, data }) => {
      return { ...data, user: req.user.id }
    }],
    beforeDelete: [async ({ id }) => {
      try {
        const mediaToDelete = await payload.findByID({
          collection: 'media',
          id,
        });

        if (mediaToDelete && 'file' in mediaToDelete) {
          const fileData = mediaToDelete.file as { filename: string };
          if (fileData && fileData.filename) {
            await deleteFileFromS3(fileData.filename);
          }
        }
      } catch (error) {
        console.error(`Error fetching media document with ID ${id}: `, error);
      }
    }],
  },
  access: {
    read: async ({req}) => {
      const referer = req.headers.referer

      if(!req.user || !referer?.includes("sell")){
        return true
      }

      return await isAdminOrHasAccessToImages()({ req })
    },
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  admin: {
    hidden: ({user}) => user.role !== "admin"
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false
      }
    }
  ]
}
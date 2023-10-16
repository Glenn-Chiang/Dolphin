import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const bucketName = process.env.S3_BUCKET_NAME as string
const bucketRegion = process.env.S3_BUCKET_REGION as string
const accessKey = process.env.S3_ACCESS_KEY as string
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string

const s3 = new S3Client({credentials: {
  accessKeyId: accessKey, 
  secretAccessKey
}, region: bucketRegion})

const uploadImage = async (imageData: File) => {
  const arrayBuffer = await imageData.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const command = new PutObjectCommand({
    Bucket: bucketName, Key: imageData.name, Body: buffer
  })
  const res = await s3.send(command)
  
}

export { uploadImage }

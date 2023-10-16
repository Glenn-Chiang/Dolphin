import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import crypto from 'crypto'

const bucketName = process.env.S3_BUCKET_NAME as string
const bucketRegion = process.env.S3_BUCKET_REGION as string
const accessKey = process.env.S3_ACCESS_KEY as string
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string
const baseUrl = process.env.S3_BASE_URL as string

const s3 = new S3Client({credentials: {
  accessKeyId: accessKey, 
  secretAccessKey
}, region: bucketRegion})

const generateImageKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex') // generates unique string for image keys to prevent images with the same name from overwriting each other

const uploadImage = async (imageData: File) => {
  const arrayBuffer = await imageData.arrayBuffer()
  const imageBuffer = Buffer.from(arrayBuffer)

  const imageName = generateImageKey()

  const command = new PutObjectCommand({
    Bucket: bucketName, Key: imageName, Body: imageBuffer
  })
  await s3.send(command)
  
  const imageUrl = `${baseUrl}/${imageName}`
  return imageUrl
}

export { uploadImage }

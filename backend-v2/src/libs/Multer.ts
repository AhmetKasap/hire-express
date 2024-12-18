import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import APIError from "../shared/utils/APIError";

// Supported file types
const allowedMimeTypes = [".jpg", ".jpeg", ".png"]

// root directory
const createUploadDir = (pathName: string): string => {
  const rootDir = path.dirname(require.main?.filename || "")
  const uploadDir = path.join(rootDir, `/public/uploads/${pathName}`)
  fs.mkdirSync(uploadDir, { recursive: true })
  return uploadDir
}

//avatar storage
const avatarStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, createUploadDir("avatars"))
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const originalName = file.originalname
    const ext = path.extname(originalName)


    if (!allowedMimeTypes.includes(ext)) {
      cb(new APIError("the type of avatar you are trying to upload is not supported", 400), "")
    }

    const url = `avatar-${uniqueSuffix}${ext}`
    cb(null, url)


  }
})

//host storage
const hostStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, createUploadDir("hosts"))
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const originalName = file.originalname
    const ext = path.extname(originalName)

    if (!allowedMimeTypes.includes(ext)) {
      cb(new APIError("Invalid file type for images.", 400), "") 
    }

    req.savedImages =  req.savedImages || []
    const url = `images-${uniqueSuffix}${ext}`
    req.savedImages.push(url)


    cb(null, url)

  }
})

const avatar = multer({ storage: avatarStorage }).single("avatar") 
const images = multer({ storage: hostStorage }).array("images", 7) 

declare global {
  namespace Express {
    interface Request {
      savedImages: string[]
    }
  }
}

export { avatar, images }

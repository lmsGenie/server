import fs from "fs";

import CONFIG from "@/configs";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

import AppErr from "@/helpers/appErr";
import HTTP_STATUS from "@/utils/httpStatus";

const client = new S3Client({
  region: CONFIG.S3_BUCKET_REGION,
});

cloudinary.config({
  cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLOUDINARY_API_KEY,
  api_secret: CONFIG.CLOUDINARY_SECRET_KEY,
  secure: true,
});

// Read file from server
const readFile = (sourcePath: string) => {
  //read the file
  const filePath: fs.PathOrFileDescriptor = sourcePath;
  const file = fs.readFileSync(filePath);

  return file;
};

// Uploads an image file
export const uploadImage = async (
  filePath: string,
  options: PutObjectCommandInput | UploadApiOptions,
  service: "CLOUDINARY" | "S3" = "CLOUDINARY",
) => {
  if (service === "CLOUDINARY") {
    //define uploadOptions
    const uploadOptions = {
      ...options,
    } as UploadApiOptions;

    //upload file
    const res = await cloudinary.uploader.upload(filePath, uploadOptions);

    return res;
  } else {
    //check required parameters for S3 PutObjectCommand
    if (!options.Key || !options.Bucket) {
      throw new AppErr(
        "Required parameters are missing options.Key, options.Bucket",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    //read file as stream
    const file = readFile(filePath);

    //define commandOptions
    const commandOptions = {
      Body: file,
      ...options,
    } as PutObjectCommandInput;

    //upload file
    const command = new PutObjectCommand(commandOptions);

    const res = await client.send(command);

    return res;
  }
};

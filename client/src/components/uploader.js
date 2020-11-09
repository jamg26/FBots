import { message } from "antd";

import S3 from "aws-s3";
import config from "../config/s3";

export const uploader = async (blob) => {
  const S3Client = new S3(config);
  const img = await S3Client.uploadFile(blob);
  message.info(`Image attached.`);
  return img;
};

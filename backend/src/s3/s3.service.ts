import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: process.env.AWS_CREDENTIAL_REGION,
    credentials: {
      accessKeyId: process.env.AWS_CREDENTIAL_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_CREDENTIAL_SECRET_ACCESS_KEY as string,
    },
  });

  async upload(Body: PutObjectCommand['input']['Body'], Key: string) {
    try {
      const res = await this.s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_CREDENTIAL_S3_BUCKET,
          Key,
          Body,
        }),
      );
      if (res.$metadata.httpStatusCode !== 200)
        throw new Error('Upload failed!');

      return {
        url: `https://${process.env.AWS_CREDENTIAL_S3_BUCKET}.s3.${process.env.AWS_CREDENTIAL_REGION}.amazonaws.com/${Key}`,
      };
    } catch (error) {
      return { error };
    }
  }

  async delete(Key: string) {
    try {
      const res = await this.s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_CREDENTIAL_S3_BUCKET,
          Key,
        }),
      );
      if (
        res.$metadata.httpStatusCode > 299 &&
        res.$metadata.httpStatusCode < 200
      )
        throw new Error('Delete failed!');
    } catch (error) {
      return error;
    }
  }
}

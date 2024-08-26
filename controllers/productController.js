import { Product } from "../models/productModel.js";
import { s3 } from "../config/awsConfig.js";
import fs from "fs";
import path from "path";

export const createProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = files.map((file) => {
      const fileContent = fs.readFileSync(file.path);
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: fileContent,
        ContentType: file.mimetype,
      };

      return s3
        .upload(params)
        .promise()
        .then((data) => {
          fs.unlinkSync(file.path); // Delete the file after upload
          return data.Location; // Return the S3 URL
        })
        .catch((err) => {
          fs.unlinkSync(file.path); // Delete on error as well
          throw err;
        });
    });

    const imageUrls = await Promise.all(uploadPromises);

    const product = await Product.create({
      title,
      price,
      description,
      images: imageUrls,
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error creating product", error });
  }
};

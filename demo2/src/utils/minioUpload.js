const multer = require("multer");
const Minio = require("minio");

// Multer: no disk storage → buffer in memory
const upload = multer({ storage: multer.memoryStorage() });
const MINIO_PUBLIC_URL = "http://localhost:9000";

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_HOST ?? "minio",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY ?? "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY ?? "minioadmin",
});

// Bucket must exist
const BUCKET_NAME = "item-pictures";

async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) await minioClient.makeBucket(BUCKET_NAME);
}
ensureBucket();

// Main middleware wrapper
const uploadToMinio = (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  let uploadedUrls = [];

  let uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const fileName = Date.now() + "_" + file.originalname;

      minioClient.putObject(
        BUCKET_NAME,
        fileName,
        file.buffer,
        file.size,
        (err, etag) => {
          if (err) return reject(err);

          const url = `${MINIO_PUBLIC_URL}/${BUCKET_NAME}/${fileName}`;
          uploadedUrls.push(url);
          resolve();
        }
      );
    });
  });

  Promise.all(uploadPromises)
    .then(() => {
      req.body.item_pictures = uploadedUrls; // IMPORTANT
      next();
    })
    .catch((err) => {
      console.log("MinIO Upload Error:", err);
      return res.status(500).json({ error: "File upload failed" });
    });
};

module.exports = { upload, uploadToMinio };

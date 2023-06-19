const AWS = require("aws-sdk");
const fs = require("node:fs");
const dotenv = require("dotenv");
const minify = require("babel-minify");
dotenv.config();

const creds = new AWS.Credentials({
  accessKeyId: process.env.S3AccessKeyId,
  secretAccessKey: process.env.S3SecretAccessKey,
});

const S3 = new AWS.S3({
  credentials: creds,
  region: process.env.REGION,
  httpOptions: { timeout: 4000 },
  tls: false,
});

const filesToUpload = [
  // "quote",
  // "swag-store",
  // "cart",
  // "my-cart",
  // "checkout",
  // "thank-you",
  // "admin",
  // "announcement",
  "user-management",
  // "signup",
  // "auth",
  // "login",
];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "steel-croissant-static-assets",
        Key: `fontaine/dealer/${file}.js`,
        Body: fs.createReadStream(`dist/${file}.js`),
        ACL: "public-read",
        ContentType: "text/javascript",
        CacheControl: "no-cache",
      },
      (err, data) => {
        if (err) rej(err);
        else {
          console.log(`uploaded: ${file}.js\t`);
          console.log(`link: ${data.Location}\n`);
          res(null);
        }
      }
    );
  });
};

for (const file of filesToUpload) {
  (async () => {
    const inputCode = fs.readFileSync(`js/${file}.js`, {
      encoding: "utf8",
    });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`dist/${file}.min.js`, outputCode, {
      encoding: "utf8",
    });
    try {
      await returnPromise(file + ".min");
    } catch (error) {
      console.error(error);
    }
  })();
}

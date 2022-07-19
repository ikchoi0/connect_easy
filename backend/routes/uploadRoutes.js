const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const aws = require('aws-sdk');

const auth = require('../middleware/auth');

aws.config.update({
  signatureVersion: 'v4',
});

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
  region: process.env.region,
});

/**
 * NO CONTROLLER FILES IN THIS ROUTE FOR NOW
 */
router.get('/', auth(['consultant']), (req, res) => {
  const key = `${req.user.id}/${uuid()}.jpeg`;

  // get the signed url from S3 before sending the file:
  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'connect-easy-images',
      ContentType: 'image/*',
      Key: key,
    },
    // send presigned url:
    (err, url) => res.send({ key, url })
  );
});
module.exports = router;

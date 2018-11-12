'use strict';

const AWS = require('aws-sdk');
const fileType = require('file-type');

class Uploader {
  constructor(bucketName, options = {}) {
    if (typeof bucketName === 'undefined') throw new Error('bucketName is required.');

    this.bucketName = bucketName;
    this.options = options;
  }

  upload(image) {
    this.setupImage(image);
  }

  setupImage(image) {
    let buffer = Buffer.from(image, 'base64');
    let fileMime = fileType(buffer);
    this.validateImage(fileMime);
  }

  validateImage(fileMime) {
    if (fileMime === null) {
      throw new Error('Invalid file type.');
    }
  }
};

module.exports = Uploader;

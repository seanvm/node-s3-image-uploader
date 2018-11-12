'use strict';

const AWS = require('aws-sdk');
const fileType = require('file-type');

class Uploader {
  constructor(bucketName, options = {}) {
    if (typeof bucketName === 'undefined') throw new Error('bucketName is required.');

    this.bucketName = bucketName;
    this.options = options;

    this.buffer = null;
    this.fileExt = null;
    this.fileType = null;
    this.payload = {};
    this.fileName = '';
  }

  upload(image) {
    this.setupImage(image);
  }

  setupImage(image) {
    this.buffer = Buffer.from(image, 'base64');
    this.fileMime = fileType(this.buffer);
    this.validateImage();
  }

  validateImage() {
    if (this.fileMime === null) {
      throw new Error('Invalid file type.');
    }
  }
  getFilePath() {
    return typeof this.options.filePath === 'undefined' ? '/' : this.options.filePath;
  }

};

module.exports = Uploader;

'use strict';

const AWS = require('aws-sdk');
const fileType = require('file-type');
const randomstring = require('randomstring');

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
    this.buildPayload();
  }

  setupImage(image) {
    this.buffer = Buffer.from(image, 'base64');
    this.fileMime = fileType(this.buffer);
    this.validateImage();
    this.setFileInformation();
  }

  validateImage() {
    if (this.fileMime === null) {
      throw new Error('Invalid file type.');
    }
  }

  buildPayload() {

  }

  getFilePath() {
    return typeof this.options.filePath === 'undefined' ? '/' : this.options.filePath;
  }

  setFileInformation() {
    this.fileExt = this.fileMime.ext;
    this.fileType = this.fileMime.mime;

    this.fileName = randomstring.generate() + '.' + this.fileExt;
    this.fileSize = this.buffer.toString('ascii').length;
  }
};

module.exports = Uploader;

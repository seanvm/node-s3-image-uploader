'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
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
    this.fileName = '';
  }

  upload(image, callback) {
    this.setupImage(image);

    s3.putObject(this.payload(), function(err, data) {
      if (err) {
        return console.log(err);
      }

      callback(data);
    });
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

  payload() {
    return {
      Bucket: this.bucketName,
      Key: this.getFileInformation().fullPath,
      Body: this.buffer
    };
  }

  getFilePath() {
    return typeof this.options.filePath === 'undefined' ? '' : this.options.filePath;
  }

  getFileInformation() {
    return {
      size: this.fileSize,
      type: this.fileType,
      name: this.fileName,
      fullPath: this.getFilePath() + this.fileName
    };
  }

  generateFileName() {
    // TODO: Allow for this to be passed via options
    // TODO: Allow for a timestamp to be attached to the filename
    return randomstring.generate() + '.' + this.fileExt;
  }

  setFileInformation() {
    this.fileExt = this.fileMime.ext;
    this.fileType = this.fileMime.mime;

    this.fileName = this.generateFileName();
    this.fileSize = this.buffer.toString('ascii').length;
  }
};

module.exports = Uploader;

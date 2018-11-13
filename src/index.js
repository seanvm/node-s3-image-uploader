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
    return {
      'fileInformation': this.getFileInformation()
    };
  }

  getFilePath() {
    return typeof this.options.filePath === 'undefined' ? '/' : this.options.filePath;
  }

  getFileInformation() {
    return {
      size: this.fileSize,
      type: this.fileType,
      name: this.fileName,
      full_path: this.getFilePath() + this.fileName + '.' + this.fileExt
    };
  }

  generateFileName() {
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

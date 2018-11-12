'use strict';

const AWS = require('aws-sdk');

class Uploader {
  constructor(bucketName, options) {
    if (typeof bucketName === 'undefined') throw new Error('bucketName is required');

    this.bucketName = bucketName;
    this.options = options;
  }
};

module.exports = Uploader;

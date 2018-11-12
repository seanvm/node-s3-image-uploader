import Uploader from '../src/index.js';

import statics from './resources/statics';

const expect = require('chai').expect;

describe('Uploader', () => {
  describe('constructor', () => {
    it('should throw an error for missing bucketName parameter', () => {
      var newUploaderFcn = () => new Uploader();
      expect(newUploaderFcn).to.throw('bucketName is required.');
    });
  });

  describe('upload()', () => {
    it('should throw an error for an invalid file type', () => {
      var uploader = new Uploader('xyz.com');
      expect(() => uploader.upload(statics.invalidImage)).to.throw('Invalid file type.');
    });
  });
});

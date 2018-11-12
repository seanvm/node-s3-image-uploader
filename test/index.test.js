import Uploader from '../src/index.js';

const expect = require('chai').expect;

describe('Uploader', () => {
  describe('constructor', () => {
    it('should throw an error for missing bucketName parameter', () => {
      var newUploaderFcn = () => new Uploader();
      expect(newUploaderFcn).to.throw('bucketName is required');
    });
  });
});

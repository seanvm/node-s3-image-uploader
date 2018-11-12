const Uploader = require('../index.js');

const expect = require('chai').expect;

describe('Uploader', () => {
  describe('constructor', () => {
    it('should throw an error for missing bucketName parameter', () => {
      var newUploaderFcn = () => new Uploader(null, null);
      expect(newUploaderFcn).to.throw('bucketName is required');
    });
  });
});

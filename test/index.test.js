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

  describe('getFilePath()', () => {
    it('should return the user specified path', () => {
      let options = { filePath: '/img' };
      var uploader = new Uploader('xyz.com', options);
      expect(uploader.getFilePath()).to.equal('/img');
    });

    it('should default to root if no user specified path', () => {
      var uploader = new Uploader('xyz.com');
      expect(uploader.getFilePath()).to.equal('/');
    });
  });
});

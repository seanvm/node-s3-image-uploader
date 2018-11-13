import Uploader from '../src/index.js';

import statics from './resources/statics';

const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

// set up the middleware
chai.use(chaiAsPromised);

describe('Uploader', () => {
  describe('constructor', () => {
    it('should throw an error for missing bucketName parameter', () => {
      var newUploaderFcn = () => new Uploader();
      expect(newUploaderFcn).to.throw('bucketName is required.');
    });
  });

  describe('upload()', () => {
    it('should throw an error for an invalid file type', async() => {
      var uploader = new Uploader('xyz.com');
      await expect(
        uploader.upload(statics.invalidImage)
      ).to.be.rejectedWith('Invalid file type.');
    });
  });

  describe('getFilePath()', () => {
    it('should return the user specified path', () => {
      let options = { filePath: 'img/' };
      var uploader = new Uploader('xyz.com', options);
      expect(uploader.getFilePath()).to.equal('img/');
    });

    it('should default to root if no user specified path', () => {
      var uploader = new Uploader('xyz.com');
      expect(uploader.getFilePath()).to.equal('');
    });
  });

  describe('getFileInformation()', () => {
    it('should return the correct file information', () => {
      let options = { filePath: 'directory/' };
      let uploader = new Uploader('xyz.com', options);

      let generateFileNameStub = function() {
        return 'file1.jpg';
      };
      sinon.stub(uploader, 'generateFileName').callsFake(generateFileNameStub);

      let expectedFileInformation = {
        size: 3883,
        type: 'image/jpeg',
        name: 'file1.jpg',
        fullPath: 'directory/file1.jpg'
      };

      uploader.setupImage(statics.validImage);
      expect(uploader.getFileInformation()).to.deep.equal(expectedFileInformation);
    });
  });
});

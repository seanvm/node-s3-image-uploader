/* eslint-disable no-unused-expressions */

import Uploader from '../src/index.js';

import statics from './resources/statics';

const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

describe('Uploader', () => {
  describe('constructor', () => {
    it('should throw an error for missing bucketName parameter', () => {
      let newUploaderFcn = () => new Uploader();
      expect(newUploaderFcn).to.throw('bucketName is required.');
    });
  });

  describe('upload()', () => {
    it('should throw an error for an invalid file type', async() => {
      let uploader = new Uploader('xyz.com');
      await expect(
        uploader.upload(statics.invalidImage)
      ).to.be.rejectedWith('Invalid file type.');
    });
  });

  describe('setupImage()', function() {
    before(function() {
      this.uploader = new Uploader('xyz.com');
      this.uploader.setupImage(statics.validImage);
    });

    it('should create a valid buffer', function() {
      let isBuffer = Buffer.isBuffer(this.uploader.buffer);
      expect(isBuffer).to.be.true;
    });

    it('should set the fileMime', function() {
      let fileMime = { ext: 'jpg', mime: 'image/jpeg' };
      expect(this.uploader.fileMime).to.deep.equal(fileMime);
    });
  });

  describe('getFilePath()', () => {
    it('should return the user specified path', () => {
      let options = { filePath: 'img/' };
      let uploader = new Uploader('xyz.com', options);
      expect(uploader.getFilePath()).to.equal('img/');
    });

    it('should default to root if no user specified path', () => {
      let uploader = new Uploader('xyz.com');
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

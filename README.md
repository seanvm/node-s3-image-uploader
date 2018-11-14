# Node.js S3 Image Uploader
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fce975cfdd5e4ceabe55350542398c87)](https://app.codacy.com/app/sean_13/node-s3-image-uploader?utm_source=github.com&utm_medium=referral&utm_content=seanvm/node-s3-image-uploader&utm_campaign=Badge_Grade_Dashboard) [![npm version](https://badge.fury.io/js/node-s3-image-uploader.svg)](https://www.npmjs.com/package/node-s3-image-uploader)

A simple Node.js wrapper of the [AWS SDK](https://aws.amazon.com/sdk-for-node-js/) for uploading images to S3. This was originally created to assist with uploading images from serverless applications on AWS Lambda to s3.

## Installation

Install the package with NPM and add it to your dependencies.

```bash
$ npm install node-s3-image-uploader --save
```

## Basic Usage

Include the module.

```javascript
const Uploader = require('node-s3-image-uploader');
```

Instantiate the uploader

```javascript
var uploader = new Uploader(bucketName, options);
```

The `bucketName` parameter is a required string containing your DNS-compliant S3 bucket name. The Uploader can also take an optional `options` object as a param. For example:

```javascript
var options = {
    filePath: 'images/'
}

var uploader = new Uploader('bucketname.com', options);
```

You can then call the `upload(image, callback)` function:

```javascript
var image = // Must be in base64 format;
var uploader.upload(image, callback);
```

## API

##### Uploader(`string` bucketName, `{}` options)

  * **string** `bucketName` - DNS-compliant S3 bucket name (**required**)
  * **object** `options` - configurable upload options  (**optional**)
    * **string** `filePath` - folder path to place the image (e.g. `'images/'`). This defaults to the root directory of the bucket. There must not be a preceding `/`. The trailing `/` is required.
 

## Note
For this package to work correctly, it is assumed that your environment (e.g. AWS Lambda function) is configured with the correct roles to access s3 and perform a `putObject` action.

## License

This package is released under the MIT license. It is simple and easy to understand and places almost no restrictions on what you can do with the code. More Information
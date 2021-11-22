// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
   keyPath: "./certs/private.pem.key",
  certPath: "./certs/certificate.pem.crt",
    caPath: "./certs/AmazonRootCA1.pem",
  clientId: "TestDeviceWeb",
      host: "a2upl3efg7dvex-ats.iot.eu-central-1.amazonaws.com"
});


device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('topic_1');
    device.publish('topic_2', JSON.stringify({ test_data: 1}));
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
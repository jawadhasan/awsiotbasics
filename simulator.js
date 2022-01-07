var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: "./certs/private.pem.key",
   certPath: "./certs/certificate.pem.crt",
     caPath: "./certs/AmazonRootCA1.pem",
   clientId: "TestDeviceWeb",
       host: "a2upl3efg7dvex-ats.iot.eu-central-1.amazonaws.com"
 });

const initialCoordinates = {
    lat: 46.6314609,
    lon: -99.34467
};

const endingCoordinates = {
    lat: 46.6302106,
    lon: -96.8319174
};

const driveTime = 2 * 60; // 2 hours in minutes
let counter = 0;
let endTime = new Date();
let rideId = Math.floor(Math.random() * 1000);

while (counter < driveTime) {
    let currentCoordinates = {
        lat: initialCoordinates.lat + (endingCoordinates.lat - initialCoordinates.lat) * (counter / driveTime),
        lon: initialCoordinates.lon + (endingCoordinates.lon - initialCoordinates.lon) * (counter / driveTime)
    };

    counter++;
    let message = {
        rideId: rideId,
        temperature: 77.2 + 0.02 * counter,
        ts: Math.floor(new Date(endTime.getTime() - (driveTime - counter) * 60 * 1000).getTime()),
        lat: currentCoordinates.lat,
        lon: currentCoordinates.lon
    };
    device.publish('truck_sensor', JSON.stringify(message));
}
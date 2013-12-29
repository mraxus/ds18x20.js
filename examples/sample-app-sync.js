'use strict';

var sensor = require('../index'),
    out = console.log;

out('Welcome to the sample app for sync handling of the ds18x20 driver.');
out('');
out('Before we start: PLEASE NOTE THE FOLLOWING:');
out('    This sample is executing everything in sync.');
out('    That means that ALL operations are blocked until a sync operation is completed.');
out('    In other words, if you are building a server app or other device that handles incoming requests');
out('      don\'t use the operations as synchronous used in this sample. Use the operations async instead.');
out('');
out('First off, let\'s see if the ds18x20 driver is loaded.');
out('This we do by calling "sensor.isDriverLoaded()":');
out('...');

var isLoaded = sensor.isDriverLoaded();

if (!isLoaded) {

    out('The driver is not loaded.');
    out('This means we want to load the driver to be able to continue.');
    out('To do so, we need to be super-user root... Let\'s try!');
    out('"sensor.loadDriver()":');

    try {
        sensor.loadDriver();
    } catch (err) {
        out('Seems like we are not running this script as a super-user...');
        out('Sorry to say, but we will shut down since we cannot continue with the show.');
        out('try to run "sudo node examples/sample-app-sync" to continue.');
        out('or load the driver manually by running: "sudo modprobe w1-gpio && sudo modprobe w1-therm"');
        out('');
        out('Bye bye for now =-)');
        process.exit(0);
    }

    out('Alright. The driver is now loaded. Then let\'s continue. Maybe you have some sensors connected...?');

} else {

    out('Alright, the driver was already loaded. Let\'s see if you have some sensors hooked up.');
}

out('So, first we want to list all sensors you have: "sensor.list()":');
out('...');

var listOfDeviceIds = sensor.list();

if (listOfDeviceIds.length === 0) {

    out('Too bad. You don\'t seem to have any sensors hooked up to your raspberry...');
    out('Please do so you can continue with this awesome sample app.');
    out('Bye bye for now =-)');
    process.exit(0);
}

out('Woohoo, you seem to have some sensors we can play with =-D.');
out('These devices were found:', listOfDeviceIds, '');
out('');
out('Not only can you list the devices.');
out('You can also measure the temperature of all sensors: "sensor.getAll()":');
out('Each sensor that is hooked up to this raspberry pi is now probed in sequence for their temperature.');

out('...');

var result = sensor.getAll();

out('The result:', result);
out('');
out('All results are presented in Celsius degrees and are rounded to one decimal place.');
out('');
out('');

var oneId = listOfDeviceIds[listOfDeviceIds.length - 1];

out('If you want to check a specific sensor, say:', oneId);
out('Then you call: "sensor.get(\'' + oneId + '\')"');

out('...');

var oneResult = sensor.get(oneId);

out('The result:', oneResult);
out('');

var arrayOfIds = [listOfDeviceIds[0], oneId];

out('There is also the possibility to request several measurements in one request:');
out('Then you call: "sensor.get(', arrayOfIds, ')"');

if (listOfDeviceIds.length === 1) {
    out('...since you only had one sensor connected, it will be probed twice!');
}


out('...');

var arrayOfResults = sensor.get(arrayOfIds);

out('And here is the result:', arrayOfResults);
out('Note that the result is presented in the same order as the input array');
out('');
out('And that\'s it. Remember to think if you want to use sync or async operations in your app (see top note)');
out('Hope you find this sample app and the sensor library useful!');

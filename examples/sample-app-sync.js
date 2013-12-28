'use strict';

var driver = require('../index'),
    log = console.log;

log('Welcome to the sample app for sync handling of the ds18x20 driver.\n');

log('First off, let\'s see if the ds18x20 driver is loaded.');
log('This we do by calling "driver.isDriverLoaded()":');
log('...');

var isLoaded = driver.isDriverLoaded();

if (!isLoaded) {

log('The driver is not loaded.');
log('This means we want to load the driver to be able to continue.');
log('To do so, we need to be super-user root... Let\'s try!');

try {
driver.loadDriver();
} catch (err) {
log('Seems like we are not running this script as a super-user...');
log('Sorry to say, but we will shut down since we cannot continue with the show.');
log('try to run "sudo node examples/sample-app-sync" to continue.');
log('or load the driver manually by running: "sudo modprobe w1-gpio && sudo modprobe w1-therm"\n');

log('Bye bye for now =-)');
process.exit(0);
}

log('Alright. The driver was loaded. Let\'s continue. Maybe you have some sensors connected...');


} else {

log('Alright, the driver was already loaded. Let\'s see if you have some sensors hooked up.');

}

log('So, first we want to list all sensors you have: "driver.list()":');
log('...');

var listOfDeviceIds = driver.list();

if (listOfDeviceIds.length === 0) {

log('Too bad. You don\'t seem to have any sensors hooked up to your raspberry...');
log('Please do so you can continue with this awesome sample app.');
log('Bye bye for now =-)');
process.exit(0);

}

log('Woohoo, you seem to have some sensors we can play with =-D.');
log('These devices were found:', listOfDeviceIds, '\n');

log('Not only can you list the devices.');
log('You can also measure the temperature of all sensors: "driver.getAll()":');
log('...');

var result = driver.getAll();

log('Each sensor that is hooked up to this raspberry pi is now probed in sequence for their temperature.');

log('The result:', result);


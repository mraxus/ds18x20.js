'use strict';

var driver = require('../index'),
    out = console.log;

out('Welcome to the sample app for sync handling of the ds18x20 driver.\n');

out('First off, let\'s see if the ds18x20 driver is loaded.');
out('This we do by calling "driver.isDriverLoaded()":');
out('...');

var isLoaded = driver.isDriverLoaded();

if (!isLoaded) {

    out('The driver is not loaded.');
    out('This means we want to load the driver to be able to continue.');
    out('To do so, we need to be super-user root... Let\'s try!');

    try {
        driver.loadDriver();
    } catch (err) {
        out('Seems like we are not running this script as a super-user...');
        out('Sorry to say, but we will shut down since we cannot continue with the show.');
        out('try to run "sudo node examples/sample-app-sync" to continue.');
        out('or load the driver manually by running: "sudo modprobe w1-gpio && sudo modprobe w1-therm"\n');

        out('Bye bye for now =-)');
        process.exit(0);
    }

    out('Alright. The driver is loaded. Then let\'s continue. Maybe you have some sensors connected...?');

} else {

    out('Alright, the driver was already loaded. Let\'s see if you have some sensors hooked up.');

}

out('So, first we want to list all sensors you have: "driver.list()":');
out('...');

var listOfDeviceIds = driver.list();

if (listOfDeviceIds.length === 0) {

    out('Too bad. You don\'t seem to have any sensors hooked up to your raspberry...');
    out('Please do so you can continue with this awesome sample app.');
    out('Bye bye for now =-)');
    process.exit(0);

}

out('Woohoo, you seem to have some sensors we can play with =-D.');
out('These devices were found:', listOfDeviceIds, '\n');

out('Not only can you list the devices.');
out('You can also measure the temperature of all sensors: "driver.getAll()":');
out('Each sensor that is hooked up to this raspberry pi is now probed in sequence for their temperature.');

out('...');

var result = driver.getAll();

out('The result:', result);


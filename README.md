ds18x20.js
==========

A node.JS implementation for using the DS1820, DS18S20 and/or DS18B20 temperature sensor with Raspberry Pi.


[![NPM](https://nodei.co/npm/ds18x20.png?downloads=true)](https://nodei.co/npm/ds18x20/)

## Description

This package is to be used by [Raspberry Pi](http://www.raspberrypi.org/) installed with [node.JS](http://blog.rueedlinger.ch/2013/03/raspberry-pi-and-nodejs-basic-setup/ "How to install node on RPi") to interact with the awesome temperature sensors [DS1820](http://www.maximintegrated.com/datasheet/index.mvp/id/2795), [DS18S20](http://www.maximintegrated.com/datasheet/index.mvp/id/2815) and [DS18B20](http://www.maximintegrated.com/datasheet/index.mvp/id/2812) made by [Maxim integrated](http://www.maximintegrated.com/).

At time of writing only the DS18B20 sensor have been tested out with this package. Please tell me if you get the chance to test it with the other sensors.

## Installation

    $ npm install ds18x20

## Usage

Each function in this library can be used sync or async. The same functions are used. The only difference is that if the last argument have a callback function, then it's an async function. There will be examples below for each function, both as sync and async.


### Declaring the sensor library

```js
var sensor = require('ds18x20');
```

### Check if driver is loaded

To be able to probe the sensors, the temperature driver needs to be loaded in your Raspberry pi (done with the command ```sudo modprobe w1-gpio && sudo modprobe w1-therm```).

#### async

```js
sensor.isDriverLoaded(function (err, isLoaded) {
    console.log(isLoaded);
});
```

#### sync

```js
var isLoaded = sensor.isDriverLoaded();
console.log(isLoaded);
```

#### output

```js
true / false
```


### Load the driver

Should the driver not be loaded you can use the command below. However, to run this command you need to be root (```sudo node```).
Instead of loading the driver through node, I recommend loading the driver at startup through shell script: ```sudo modprobe w1-gpio && sudo modprobe w1-therm```.

#### async

```js
sensor.loadDriver(function (err) {
    if (err) console.log('something went wrong loading the driver:', err)
    else console.log('driver is loaded');
});
```

#### sync

```js
try {
    sensor.loadDriver();
    console.log('driver is loaded');
} catch (err) {
    console.log('something went wrong loading the driver:', err)
}
```


### List all available sensors

#### async

```js
sensor.list(function (err, listOfDeviceIds) {
    console.log(listOfDeviceIds);
});
```

#### sync

```js
var listOfDeviceIds = sensor.list();
console.log(listOfDeviceIds);
```

#### output

```js
[ '28-00000574c791', '28-00000574f4f3' ]
```


### Get the temperature from all avaiable sensors

The temperature is requested from each sensor. The result is returned in Celsius degrees and rounded to in decimal place.

#### async

```js
sensor.getAll(function (err, tempObj) {
    console.log(tempObj);
});
```

#### sync

```js
var tempObj = sensor.getAll();
console.log(tempObj);
```

#### output

Temperature in x° C
```js
{ '28-00000574c791': 22.9, '28-00000574f4f3': 22.8 }
```


### Get the temperature from one or several sensors

The result is returned in Celsius degrees and rounded to in decimal place.

#### async

```js
sensor.get('28-00000574c791', function (err, temp) {
    console.log(temp);
});
```

#### sync

```js
var temp = sensor.get('28-00000574c791');
var listOfTemps = sensor.get(['28-00000574c791', '28-00000574f4f3']);
console.log(temp);
console.log(listOfTemps);
```

#### output

Temperature in x° C
```js
23.1
[ 23.1, 23.2 ]
```

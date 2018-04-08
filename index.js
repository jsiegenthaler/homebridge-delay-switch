var Service, Characteristic, Accessory;

module.exports = function(homebridge) {
 
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-delay-switch", "DelaySwitch", DelaySwitch);
}

function DelaySwitch(log, config) {
  this.log = log;
  this.name = config['name'];
  this.delayTime = config['delay'];
  this.Timer;
}

DelaySwitch.prototype.getServices = function() {
 var informationService = new Service.AccessoryInformation();

        informationService
                .setCharacteristic(Characteristic.Manufacturer, "Delay Manufacturer")
                .setCharacteristic(Characteristic.Model, "Delay Model")
                .setCharacteristic(Characteristic.SerialNumber, "Delay Serial Number");

 this.service = new Service.Switch(this.name);
 
 this.service.getCharacteristic(Characteristic.On)
     .on('set', this.setOn.bind(this));
 
  return [this.service];
}

DelaySwitch.prototype.setOn = function(on, callback) {
 this.log("Setting switch to " + on);
 var self = this;
 if (on) {
    clearTimeout(self.Timer);
    self.Timer = setTimeout(function() {
      self.service.getCharacteristic(Characteristic.On).updateValue(false);
    }, self.delayTime);
  } else clearTimeout(self.Timer);
  
  callback();
}

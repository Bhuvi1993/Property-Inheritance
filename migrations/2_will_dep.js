const WillDigitalAsset = artifacts.require("WillDigitalAsset");

module.exports = function(deployer) {
  deployer.deploy(WillDigitalAsset);
};
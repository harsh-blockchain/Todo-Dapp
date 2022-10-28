var TaskContract = artifacts.require("todo");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TaskContract);
};
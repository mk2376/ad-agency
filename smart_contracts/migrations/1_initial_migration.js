const Migrations = artifacts.require("./Migrations.sol");
const Advertisements = artifacts.require("./Advertisements.sol");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Advertisements);
};

const Migrations = artifacts.require("./Migrations.sol");
const Advertisements = artifacts.require("./Advertisements.sol");
const Websites = artifacts.require("./Websites.sol");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Advertisements);
    deployer.deploy(Websites);
};

pragma solidity '0.5.16';

contract IPFSStorage {
    string ipfsHash;

    function set(string memory hash) public {
        ipfsHash = hash;
    }

    function get() public view returns (string memory) {
        return ipfsHash;
    }
}
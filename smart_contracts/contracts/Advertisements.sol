pragma solidity >=0.4.22 <0.9.0;

contract Advertisements {
    uint256 id;

    constructor() {
      id = 0;
    }

    struct Advertisement {
        address owner;
        uint256 budget;
        string ipfsHash;
        string tag;
        uint256 id;
    }

    mapping(uint256 => Advertisement) idToAdvertisement;

    function submitAdvertisement(string memory ipfsHash, string memory tag, uint256 budget) public payable {
        require(msg.value >= budget, "Budget goal not met!");
        idToAdvertisement[id] = Advertisement(msg.sender, budget, ipfsHash, tag, id);
        id++;
    }

    function getAdvertisements() public view returns(Advertisement[] memory) {
        Advertisement[] memory advertisements = new Advertisement[](id);
        for(uint256 i = 0; i < id; i++) {
            Advertisement memory ad = idToAdvertisement[i];
            advertisements[i] = Advertisement(ad.owner, ad.budget, ad.ipfsHash, ad.tag, ad.id);
        }
        return advertisements;
    }
}
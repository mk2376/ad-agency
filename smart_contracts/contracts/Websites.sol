pragma solidity >=0.4.22 <0.9.0;

contract Websites {
    uint256 id;

    constructor() {
        id = 0;
    }

    struct Website {
        address owner;
        string url;
        uint256 id;
    }

    mapping(uint256 => Website) idToWebsite;

    function submitWebsite(string memory url) public {
        idToWebsite[id] = Website(msg.sender, url, id);
        id++;
    }

    function getWebsites() public view returns(Website[] memory) {
        Website[] memory websites = new Website[](id);
        for(uint256 i = 0; i < id; i++) {
            Website memory website = idToWebsite[i];
            websites[i] = Website(website.owner, website.url, website.id);
        }
        return websites;
    }

    function getWebsiteWithId(uint256 websiteID) public view returns(Website memory) {
        Website memory website = idToWebsite[websiteID];
        return website;
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

    function getWebsiteIdFromURL(string memory url) public view returns(int256) {
        for(uint256 i = 0; i < id; i++) {
            Website memory website = idToWebsite[i];
            if (compareStrings(website.url, url)) {
                return int256(website.id);
            }
        }
        return -1;
    }
}
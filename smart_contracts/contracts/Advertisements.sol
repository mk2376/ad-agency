pragma solidity >=0.4.22 <0.9.0;

contract Advertisements {
    uint256 id;

    constructor() {
      id = 0;
    }

    struct Advertisement {
        address payable owner;
        uint256 budget;
        string ipfsHash;
        string tag;
        uint256 id;
        bool isChecked;
        bool isAppropriate;
        address payable[] visitors;
        int256 websiteId;
    }
    mapping(uint256 => Advertisement) idToAdvertisement;

    function submitAdvertisement(string memory ipfsHash, string memory tag, uint256 budget) public payable {
        require(msg.value >= budget, "Budget goal not met!");
        address payable[] memory visitors = new address payable[](0);
        idToAdvertisement[id] = Advertisement(payable(msg.sender), budget, ipfsHash, tag, id, false, false, visitors, -1);
        id++;
    }

    function getAdvertisements() public view returns(Advertisement[] memory) {
        Advertisement[] memory advertisements = new Advertisement[](id);
        for(uint256 i = 0; i < id; i++) {
            Advertisement memory ad = idToAdvertisement[i];
            advertisements[i] = Advertisement(ad.owner, ad.budget, ad.ipfsHash, ad.tag, ad.id, ad.isChecked, ad.isAppropriate, ad.visitors, ad.websiteId);
        }
        return advertisements;
    }

    function getAdvertisementWithId(uint256 adID) public view returns(Advertisement memory){
        Advertisement memory ad = idToAdvertisement[adID];
        return ad;
    }

    function updateAdvertisementWithAIKnowledge(uint256 adID, bool appropriate) public {
        Advertisement storage ad = idToAdvertisement[adID];
        ad.isChecked = true;
        ad.isAppropriate = appropriate;
    }

    function getCountOfAdvertisementsWithoutWebsite() public view returns(uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < id; i++) {
            Advertisement memory ad = idToAdvertisement[i];
            if(ad.websiteId == -1 && ad.isAppropriate) {
                count++;
            }
        }
        return count;
    }

    function getAdvertisementForWebsite(int256 websiteID) public view returns(Advertisement memory) {
        Advertisement memory ad;
        for(uint256 i = 0; i < id; i++) {
            Advertisement memory tempAd = idToAdvertisement[i];
            if (tempAd.websiteId == websiteID) {
                ad = Advertisement(tempAd.owner, tempAd.budget, tempAd.ipfsHash, tempAd.tag, tempAd.id, tempAd.isChecked, tempAd.isAppropriate, tempAd.visitors, tempAd.websiteId);
            }
        }
        return ad;
    }

    function getAdvertisementsWithoutWebsite() public view returns(Advertisement[] memory) {
        uint256 countOfAdsWithoutWebsite = getCountOfAdvertisementsWithoutWebsite();
        Advertisement[] memory advertisements = new Advertisement[](countOfAdsWithoutWebsite);

        uint256 j = 0;
        for(uint256 i = 0; i < id; i++) {
            Advertisement memory ad = idToAdvertisement[i];
            if (ad.websiteId == -1 && ad.isAppropriate) {
                advertisements[j] = Advertisement(ad.owner, ad.budget, ad.ipfsHash, ad.tag, ad.id, ad.isChecked, ad.isAppropriate, ad.visitors, ad.websiteId);
                j++;
            }
        }
        return advertisements;
    }

    function updateAdvertisementWebsite(uint256 adID, int256 websiteID) public {
        for(uint256 i = 0; i < id; i++) {
            Advertisement storage tempAd = idToAdvertisement[i];
            if (tempAd.websiteId == websiteID) {
                tempAd.websiteId = -1;
            }
        }
        Advertisement storage ad = idToAdvertisement[adID];
        ad.websiteId = websiteID;
    }

    function appendVisitorToAdvertisement(uint256 adID) public {
        Advertisement storage ad = idToAdvertisement[adID];
        ad.visitors.push(payable(msg.sender));
    }

    function closeAdvertisementAndSplitTheRewards(uint256 adID, address payable websiteOwner) public {
        Advertisement storage ad = idToAdvertisement[adID];
        uint256 numberVisitors = ad.visitors.length + 1;
        uint256 rewardPerVisitor = (ad.budget / 2) / numberVisitors;
        uint256 rewardForWebsiteOwner = ad.budget / 4;
        uint256 rewardForAdvertiser = ad.budget / 4;
        for (uint256 i = 0; i < ad.visitors.length; i++) {
            address payable visitor = ad.visitors[i];
            visitor.transfer(rewardPerVisitor);
        }
        websiteOwner.transfer(rewardForWebsiteOwner);
        ad.owner.transfer(rewardForAdvertiser);
    }
}
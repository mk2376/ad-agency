/* Only if user has ethereum provider */
var web3Provider;
if (window.ethereum) {
    // Modern browsers
    web3Provider = window.ethereum;
    try {
        // Request user's account access
        window.ethereum.enable();
    } catch (error) {
        console.error("User denied account access!");
    }
} else if (window.web3) {
    // Legacy browsers
    web3Provider = window.web3.currentProvider;
} else {
    // Use local client
    web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
}

/* Create web3 instance */
web3 = new Web3(web3Provider);

/* Read the contract */
fetch("./../smart_contracts/build/contracts/Advertisements.json")
    .then((advertisementResponse) => advertisementResponse.json())
    .then((advertisementJSON) => {
        fetch("./../smart_contracts/build/contracts/Websites.json")
            .then((websiteResponse) => websiteResponse.json())
            .then((websiteJSON) => {
                /* Contract Address */
                const advertisementContractAddress =
                    "0x11765A9B10E49506217076ec3b93839Aa7d0789b";
                const websiteContractAddress =
                    "0x66652E59a7dDfBFF019f55aD8b8a3CA332B33aBB";

                /* Advertisements Smart Contract */
                const advertisementsContract = new web3.eth.Contract(
                    advertisementJSON.abi,
                    advertisementContractAddress
                );

                /* Websites Smart Contract */
                const websitesContract = new web3.eth.Contract(
                    websiteJSON.abi,
                    websiteContractAddress
                );

                websitesContract.methods
                    .getWebsiteIdFromURL(window.origin)
                    .call()
                    .then((websiteID) => {
                        if (websiteID != -1) {
                            advertisementsContract.methods
                                .getAdvertisementForWebsite(websiteID)
                                .call()
                                .then((advertisement) => {
                                    if (advertisement.ipfsHash) {
                                        web3.eth
                                            .getAccounts()
                                            .then((accounts) => {
                                                advertisementsContract.methods
                                                    .appendVisitorToAdvertisement(
                                                        advertisement.id
                                                    )
                                                    .send({
                                                        from: accounts[0],
                                                    })
                                                    .then((receipt) => {
                                                        var div =
                                                            document.getElementById(
                                                                "web3_ad"
                                                            );
                                                        // Style the div
                                                        div.style.display =
                                                            "flex";
                                                        div.style.flexDirection =
                                                            "column";
                                                        div.style.alignItems =
                                                            "center";
                                                        div.style.justifyContent =
                                                            "center";
                                                        div.style.border =
                                                            "2px solid black";
                                                        // Create header
                                                        var h3 =
                                                            document.createElement(
                                                                "h3"
                                                            );
                                                        h3.innerText =
                                                            "Advertisement provided by Web3 Advertising Agency";
                                                        div.appendChild(h3);
                                                        var img =
                                                            document.createElement(
                                                                "img"
                                                            );
                                                        img.src =
                                                            "https://ipfs.io/ipfs/" +
                                                            advertisement.ipfsHash;
                                                        div.appendChild(img);
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                            });
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    });
            });
    });

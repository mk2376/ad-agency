export default class Advertisement {
    owner;
    budget;
    ipfsHash;
    tag;
    id;

    constructor(data) {
        this.owner = data[0];
        this.budget = data[1];
        this.ipfsHash = data[2];
        this.tag = data[3];
        this.id = data[4];
    }
}
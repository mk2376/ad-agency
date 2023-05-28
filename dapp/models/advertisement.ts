export default class Advertisement {
    owner: string;
    budget: any;
    ipfsHash: string;
    tag: string;
    id: string;

    constructor(data: any) {
        this.owner = data[0];
        this.budget = data[1];
        this.ipfsHash = data[2];
        this.tag = data[3];
        this.id = data[4];
    }
}

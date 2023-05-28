export default class Advertisement {
    owner: string;
    budget: any;
    ipfsHash: string;
    tag: string;
    id: any;
    isChecked: boolean;
    isAppropriate: boolean;
    visitors: string[];
    websiteId: any;

    constructor(data: any) {
        this.owner = data[0];
        this.budget = data[1];
        this.ipfsHash = data[2];
        this.tag = data[3];
        this.id = data[4];
        this.isChecked = data[5];
        this.isAppropriate = data[6];
        this.visitors = data[7];
        this.websiteId = data[8];
    }
}

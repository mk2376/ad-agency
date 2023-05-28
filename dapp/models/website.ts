export default class Website {
    owner: string;
    url: string;
    id: any;

    constructor(data: any) {
        this.owner = data[0];
        this.url = data[1];
        this.id = data[2];
    }
}

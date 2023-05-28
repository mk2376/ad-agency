/*
import { Component, setState } from 'react';
import Web3 from 'web3'
import { IPFSHTTPClient, create } from 'ipfs-http-client';
import getWeb3 from './utils/getWeb3';
import IPFSStorageContract from '../../../../smart_contracts/build/contracts/IPFSStorage.json';
import { API_KEY, API_KEY_SECRET } from './secret';

type CurrentState = {
    ipfsHash: string,
    web3: Web3 | null,
    buffer: Buffer | null,
    account: null,
    ipfsStorageInstance: any,
}


// DO NOT USE!! //

// didn't finish .ts rewrite as I am not sure how exactly are things //

export default class IPFS extends Component {

    private currentState: CurrentState;
    private ipfs: IPFSHTTPClient;

    constructor(props: any) {
        super(props)

        this.currentState = {
            ipfsHash: '',
            web3: null,
            buffer: null,
            account: null,
            ipfsStorageInstance: null,
        }

        this.ipfs = create({
            host: "ipfs.infura.io", 
            port: 5001, protocol: "https", 
            headers: {
                authorization: 'Basic ' + Buffer.from(API_KEY + ':' + API_KEY_SECRET).toString('base64')
            }
        })

        // Necessary bindings
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.initializeWeb3()
    }

    initializeWeb3() {
        getWeb3().then((result) => {
            this.currentState.web3 = result.web3
            this.instantiateContract()
        })
        .catch((exception: any) => {
            console.log(exception)
            console.log("Error finding Web3.")
        })
    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const ipfsStorage = contract(IPFSStorageContract)
        ipfsStorage.setProvider(this.currentState.web3!.currentProvider)

        // Get accounts.
        this.currentState.web3!.eth.getAccounts((error, accounts) => {
            ipfsStorage.deployed()
                .then((instance: any) => {
                    this.setState({ ipfsStorageInstance: instance })
                    this.setState({ account: accounts[0] })
                    // Get the value from the contract to prove it worked.
                    return instance.get.call({ from: accounts[0] })
                })
                .then((ipfsHash: string) => {
                    // Update state with the result.
                    this.setState({ ipfsHash: ipfsHash })
                    return ipfsHash
                })
        })
    }

    captureFile(event: any) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.currentState.buffer = Buffer.from(reader.result as string)
        }
    }

    async onSubmit(event: any) {
        event.preventDefault()
        const res = await this.ipfs.add(this.currentState.buffer!)
        this.currentState.ipfsStorageInstance!.set(res.path, { from: this.currentState.account })
            .then((r) => {
                this.setState({ ipfsHash: res.path })
                return res.path
            }
        )
    }
    render() {
        return (
            <div className="container mx-auto py-4">
                <nav className="">
                    <a href="#" className="text-3xl">IPFS File Upload DApp</a>
                </nav>

                <main className="">
                    <div className="">
                        <div className="">
                            <p className="text-xl">Your Image</p>
                            <p className="py-3">This image is stored on IPFS & The Ethereum Blockchain!</p>
                            <p>{this.state.ipfsHash}</p>
                            <img src={`https://ipfs.io/ipfs/${this.currentState.ipfsHash}`} alt=""/>
                            <p className="text-2xl py-3">Upload Image</p>
                            <form onSubmit={this.onSubmit} >
                                <input type='file' onChange={this.captureFile} className="hover:cursor-pointer"/>
                                <input type='submit' className="bg-slate-100 text-black rounded-md px-2 py-1 hover:cursor-pointer"/>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
*/
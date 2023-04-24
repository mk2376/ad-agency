import React, { Component, setState } from 'react';
import { create } from 'ipfs-http-client';
import getWeb3 from './utils/getWeb3';
import IPFSStorageContract from '../../../../smart_contracts/build/contracts/IPFSStorage.json';
import { API_KEY, API_KEY_SECRET } from './secret';

class IPFS extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ipfsHash: '',
            web3: null,
            buffer: null,
            account: null,
            ipfsStorageInstance: null,
        }
        this.ipfs = create({ host: "ipfs.infura.io", port: "5001", protocol: "https", headers: { authorization: 'Basic ' + Buffer.from(API_KEY + ':' + API_KEY_SECRET).toString('base64')} })
        // Necessary bindings
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.initializeWeb3()
    }

    initializeWeb3() {
        getWeb3
        .then(result => {
            this.setState({ web3: result.web3 }, () => { this.instantiateContract() })
        })
        .catch((exception) => {
            console.log(exception)
            console.log("Error finding Web3.")
        })
    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const ipfsStorage = contract(IPFSStorageContract)
        ipfsStorage.setProvider(web3.currentProvider)

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            ipfsStorage.deployed()
                .then((instance) => {
                    this.setState({ ipfsStorageInstance: instance })
                    this.setState({ account: accounts[0] })
                    // Get the value from the contract to prove it worked.
                    return instance.get.call({ from: accounts[0] })
                })
                .then((ipfsHash) => {
                    // Update state with the result.
                    this.setState({ ipfsHash: ipfsHash })
                    return ipfsHash
                })
        })
    }

    captureFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) })
        }
    }

    async onSubmit(event) {
        event.preventDefault()
        const res = await this.ipfs.add(this.state.buffer)
        this.state.ipfsStorageInstance.set(res.path, { from: this.state.account })
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
                            <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
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

export default IPFS
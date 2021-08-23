import Config from './config.json';
import Web3 from 'web3';

export default class Contract {
    constructor(network, callback) {

        var config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.initialize(callback);
        this.owner = null;
        this.airlines = [];
        this.passengers = [];
    }

    initialize(callback) {
        /*if (typeof web3 !== 'undefined') {
            console.log("current provider ", web3.currentProvider);
            web3 = new Web3(web3.currentProvider);
        } else {
            console.log("local ganache provider");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        }*/
        // Modern DApp Browsers -  it s a new way to connect metamask on web3 cause It's deprecated 
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try { 
            window.ethereum.enable().then(function() {
                // User has allowed account access to DApp...
            });
            } catch(e) {
            // User has denied account access to DApp...
            }
        }
        // Legacy DApp Browsers
        else if (window.web3) {
            web3 = new Web3(web3.currentProvider);
        }
        // Non-DApp Browsers
        else {
            alert('You have to install MetaMask !');
        }

        this.web3.eth.net.isListening()
        .then(() => console.log('is connected'))
        .catch(e => console.log('Failed connection: '+ e));
        
        console.log("this.web3 : ", this.web3);

        (async () => {
            const accounts = await this.web3.eth.getAccounts();
            console.log(accounts);
        });
    }
}
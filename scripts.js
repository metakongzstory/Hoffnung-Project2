// Constants
// ========================================================

// To keep track of the connected wallet throughout the app
let WALLET_CONNECTED = '';

// Local storage key for the wallet connection preference
const WALLET_CONNECTION_PREF_KEY = 'WC_PREF';

// Object to store the current chain id and name
const CHAIN_CONNECTED = {
    id: null,
    name: null
};

// Dictionary of chain ids and names
const CHAIN_DICTIONARY = {
    5: 'Goerli Testnet'
};

// Required chain id to interact with the contract
const CHAIN_ID_REQUIRED = 5;

// Object to store the contract addresses on each network
const CONTRACT_ON_CHAINS = {
    5: '0x27a0663D2AE8925F814073D81ef54EF182AD5ed9'
};

// Object to store all blockchain explorers
const BLOCKCHAIN_EXPLORERS = {
    5: 'https://goerli.etherscan.io'
};

// ABI needed to interact with the contract
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "ReadYourStory",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "txt",
                "type": "string"
            }
        ],
        "name": "WriteYourStory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Functions
// ========================================================

/**
 * Helper function to convert hex values to strings
 * @param {string} hex
 * @returns {string}
 */
const hex2ascii = (hex) => {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        const v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
};

/**
 * Function to handle changes in the chain id
 * @param {string|null} chainId
 */
const onChainChanged = (chainId) => {
    // Get the element that displays the wallet network
    const preWalletNetwork = document.getElementById('pre-wallet-network');

    if (!chainId) {
        // Clear the connected chain information
        CHAIN_CONNECTED.name = null;
        CHAIN_CONNECTED.id = null;
        preWalletNetwork.innerHTML = '';
    } else {
        // Update the connected chain information
        const parsedChainId = parseInt(chainId, 16);
        CHAIN_CONNECTED.name = CHAIN_DICTIONARY

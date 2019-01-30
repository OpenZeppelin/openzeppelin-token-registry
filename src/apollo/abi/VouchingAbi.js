export default [
    {
      "constant": true,
      "inputs": [],
      "name": "ANSWER_WINDOW",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "accept",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "getChallenge",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "uint8"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_entryID",
          "type": "uint256"
        },
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_entryID",
          "type": "uint256"
        },
        {
          "name": "_fee",
          "type": "uint256"
        },
        {
          "name": "_metadataURI",
          "type": "string"
        },
        {
          "name": "_metadataHash",
          "type": "bytes32"
        }
      ],
      "name": "challenge",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "affirmAppeal",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "overseer",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_entryID",
          "type": "uint256"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "unvouch",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "appealFee",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "appeal",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "getAppeal",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_entryID",
          "type": "uint256"
        },
        {
          "name": "_voucher",
          "type": "address"
        }
      ],
      "name": "getVouched",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_minimumStake",
          "type": "uint256"
        },
        {
          "name": "_appealFee",
          "type": "uint256"
        },
        {
          "name": "_overseer",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "reject",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "confirm",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_entryID",
          "type": "uint256"
        }
      ],
      "name": "getEntry",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MAX_CHALLENGE_FEE",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_entryID",
          "type": "uint256"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "vouch",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_metadataURI",
          "type": "string"
        },
        {
          "name": "_metadataHash",
          "type": "bytes32"
        }
      ],
      "name": "register",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "minimumStake",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "APPEAL_WINDOW",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "dismissAppeal",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "PCT_BASE",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Vouched",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Unvouched",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "minimumStake",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "metadataURI",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "metadataHash",
          "type": "bytes32"
        }
      ],
      "name": "Registered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "challenger",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "metadataURI",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "metadataHash",
          "type": "bytes32"
        }
      ],
      "name": "Challenged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        }
      ],
      "name": "Accepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        }
      ],
      "name": "Rejected",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        }
      ],
      "name": "Confirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "appealer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Appealed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "overseer",
          "type": "address"
        }
      ],
      "name": "AppealAffirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "overseer",
          "type": "address"
        }
      ],
      "name": "AppealDismissed",
      "type": "event"
    }
  ]

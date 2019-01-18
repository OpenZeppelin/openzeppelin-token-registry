export default [
  {
    'constant': false,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'accept',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'challengeMetadata',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      },
      {
        'name': '',
        'type': 'bytes32'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_id',
        'type': 'uint256'
      }
    ],
    'name': 'vouched',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_id',
        'type': 'uint256'
      },
      {
        'name': '_amount',
        'type': 'uint256'
      },
      {
        'name': '_metadataURI',
        'type': 'string'
      },
      {
        'name': '_metadataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'challenge',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_id',
        'type': 'uint256'
      },
      {
        'name': '_voucher',
        'type': 'address'
      }
    ],
    'name': 'vouchedAmount',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'overrule',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      },
      {
        'name': '_amount',
        'type': 'uint256'
      }
    ],
    'name': 'appeal',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_id',
        'type': 'uint256'
      },
      {
        'name': '_amount',
        'type': 'uint256'
      }
    ],
    'name': 'unvouch',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_id',
        'type': 'uint256'
      }
    ],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'reject',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'confirm',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'challenger',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_id',
        'type': 'uint256'
      },
      {
        'name': '_amount',
        'type': 'uint256'
      }
    ],
    'name': 'vouch',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_minimumStake',
        'type': 'uint256'
      },
      {
        'name': '_token',
        'type': 'address'
      }
    ],
    'name': 'initialize',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'challengeTarget',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'challengeStake',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_vouched',
        'type': 'address'
      },
      {
        'name': '_amount',
        'type': 'uint256'
      },
      {
        'name': '_metadataURI',
        'type': 'string'
      },
      {
        'name': '_metadataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'register',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'minimumStake',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'challengeState',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_challengeID',
        'type': 'uint256'
      }
    ],
    'name': 'sustain',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_id',
        'type': 'uint256'
      }
    ],
    'name': 'totalVouched',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'token',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'sender',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'Vouched',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'sender',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'Unvouched',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'vouched',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'metadataURI',
        'type': 'string'
      },
      {
        'indexed': false,
        'name': 'metadataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'Registered',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': '_challengeID',
        'type': 'uint256'
      },
      {
        'indexed': true,
        'name': 'challenger',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': 'challengeURI',
        'type': 'string'
      },
      {
        'indexed': false,
        'name': 'challengeHash',
        'type': 'bytes32'
      }
    ],
    'name': 'Challenged',
    'type': 'event'
  }
]

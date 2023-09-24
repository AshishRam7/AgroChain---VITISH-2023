
  export const abi=[
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "pending_addressp",
          "type": "address[]"
        },
        {
          "internalType": "uint16",
          "name": "qtyp",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "pricep",
          "type": "uint16"
        },
        {
          "internalType": "uint16[]",
          "name": "inflationp",
          "type": "uint16[]"
        },
        {
          "internalType": "string",
          "name": "product_namep",
          "type": "string"
        },
        {
          "internalType": "address[]",
          "name": "verified_addressp",
          "type": "address[]"
        },
        {
          "internalType": "string[]",
          "name": "placep",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "namep",
          "type": "string[]"
        }
      ],
      "name": "initiate_order",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "idp",
          "type": "uint256"
        },
        {
          "internalType": "uint16",
          "name": "new_inflation",
          "type": "uint16"
        }
      ],
      "name": "to_verify",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "a",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "idp",
          "type": "uint256"
        }
      ],
      "name": "get_index",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idp",
          "type": "uint256"
        }
      ],
      "name": "get_order",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "item_owner",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "pending_address",
              "type": "address[]"
            },
            {
              "internalType": "string[]",
              "name": "names",
              "type": "string[]"
            },
            {
              "internalType": "string[]",
              "name": "places",
              "type": "string[]"
            },
            {
              "internalType": "uint16",
              "name": "qty",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "price",
              "type": "uint16"
            },
            {
              "internalType": "uint16[]",
              "name": "inflation",
              "type": "uint16[]"
            },
            {
              "internalType": "string",
              "name": "product_name",
              "type": "string"
            },
            {
              "internalType": "address[]",
              "name": "verified_address",
              "type": "address[]"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct agro.item",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
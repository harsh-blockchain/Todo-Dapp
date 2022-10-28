export const ContractAddress = '0xF635b42749C327674B8c9bD2aB0dF68b95eFB6E7'

export const ContractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      }
    ],
    "name": "AddTask",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isDeleted",
        "type": "bool"
      }
    ],
    "name": "DeleteTask",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "taskText",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isDeleted",
        "type": "bool"
      }
    ],
    "name": "addTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyTasks",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "taskText",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isDeleted",
            "type": "bool"
          }
        ],
        "internalType": "struct todo.Task[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isDeleted",
        "type": "bool"
      }
    ],
    
      "name": "deleteTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
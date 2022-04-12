# hardhat-sourcify
I just want to be able to use sourcify, don't want to use it with hardhat-deploy stuff,
So I modified it to make it works solely with hardhat buildInfo file

rightnow it's a simple version works for single contract.

plan to improve it to:
 
    1. simplify the inputs
    2. support verify multiple contracts 

## usage
task name `sourcify` is already used by hardhat-deploy  :/ 

so I have to change to a new task name. may change to a simpler task name if i can come up with one :D

Install it with 
```
yarn add -D hardhat-sourcify 
```

example:
```
yarn hardhat sourcifySubmit --contract-name "Greeter" --source-name "contracts/Greeter.sol" --address 0xxxxxxxxx --chain-id 3
```

use `yarn hardhat help sourcifySubmit` to see the help for the task

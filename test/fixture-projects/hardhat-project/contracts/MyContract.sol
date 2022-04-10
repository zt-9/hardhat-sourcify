//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract MyContract {
    string public name;
    address public owner;

    constructor(string memory name_) {
        name = name_;
        owner = msg.sender;
    }

    function setName(string memory name_) public {
        name = name_;
    }
}
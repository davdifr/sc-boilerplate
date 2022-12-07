// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Foo {
    string public message;
    
    constructor(string memory defaultMessage) {
        message = defaultMessage;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
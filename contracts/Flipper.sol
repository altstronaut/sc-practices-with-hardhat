pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Flipper {
    bool private value;

    constructor(bool initValue) {
        console.log("Initial value is " ,  initValue);
        value = initValue;
    }

    function flip() public {
        value = !value;
        console.log("value was flipped to: ", value);
    }

    function get() public view returns (bool) {
        return value;
    }
}
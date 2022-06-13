const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Flipper", function() {
    it("Should flip the value stored in the sc", async function(){
        //Create shadow copy of Flipper contract
        const Flipper = await ethers.getContractFactory("Flipper");
        //Create an instance of the flipper contract and pass original value
        //This should create a contract with value "false"
        const flipperSC = await Flipper.deploy(false);
        //We wait (async) for the sc to be deployed and get the callback
        await flipperSC.deployed();

        //Set the expectations to false, if it is not false, test will fail
        expect(await flipperSC.get()).to.equal(false);

        //Let's change the current value from false to true
        const setFlipperValue = await flipperSC.flip();
        //Wait for the transaction to be confirmed
        await setFlipperValue.wait();

        //As the transaction was already flipped we could expect true
        //instead of false
        //logs from view function were removed to avoid spam and confussion
        expect(await flipperSC.get()).to.equal(true);
    });
});
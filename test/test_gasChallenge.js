const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      const optimizedFunctionTx = await gas_contract.optimizedFunction();
      const optimizedFunctionReceipt = await optimizedFunctionTx.wait();
      console.log("Optimized Function Gas Used:", optimizedFunctionReceipt.gasUsed);

      const notOptimizedFunctionTx = await gas_contract.notOptimizedFunction();
      const notOptimizedFunctionReceipt = await notOptimizedFunctionTx.wait();
      console.log("Not Optimized Function Gas Used:", notOptimizedFunctionReceipt.gasUsed);

      expect(optimizedFunctionReceipt.gasUsed).to.be.lessThan(notOptimizedFunctionReceipt.gasUsed);
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      await gas_contract.optimizedFunction();
      const sum = await gas_contract.getSumOfArray();
      expect(sum).to.equal(0);
    });
  });
});

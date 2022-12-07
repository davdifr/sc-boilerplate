const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

let accounts;
let foo;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  foo = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["This is a real foo contract, not smart at all."],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Foo", () => {
  it("Contract deployed successfully.", () => {
    assert.ok(foo.options.address);
  });
  it("Default message correctly setted.", async () => {
    const message = await foo.methods.message().call();
    assert.equal(message, "This is a real foo contract, not smart at all.");
  });
  it("setMessage function works properly.", async () => {
    await foo.methods
      .setMessage("The foo has been changed.")
      .send({ from: accounts[0] });
    const message = await foo.methods.message().call();
    assert.equal(message, "The foo has been changed.");
  });
});

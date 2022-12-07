const path = require("path");
const fs = require("fs");
const solc = require("solc");

const fooPath = path.resolve(__dirname, "contracts", "Foo.sol");
const source = fs.readFileSync(fooPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Foo.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Foo.sol"
].Foo;

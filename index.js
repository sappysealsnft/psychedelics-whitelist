var fs = require("fs");
var seedrandom = require("seedrandom");

function WinterBearsWhitelist() {
  // Read Winter Bears snapshot
  var erc721data = fs.readFileSync("WB.csv").toLocaleString();
  var erc20data = fs.readFileSync("BEARHolderSnapshot.csv").toLocaleString();
  erc20data = erc20data.replace(/['"]+/g, "");

  // Convert strings to arrays and scrub padded lines
  var erc721rows = erc721data.split("\n");
  var erc20rows = erc20data.split("\n");
  erc721rows.pop();
  erc721rows.shift();
  erc20rows.pop();
  erc20rows.shift();

  const bearAddresses = new Set();

  // Add Winter Bear holders
  erc721rows.forEach((row) => {
    columns = row.split(",");
    if (columns[2] === "wallet") {
      bearAddresses.add(columns[0].toLowerCase());
    }
  });

  // Add BEAR NFTX stakers
  erc20rows.forEach((row) => {
    columns = row.split(",");
    if (parseFloat(columns[1]) >= 1) {
      bearAddresses.add(columns[0].toLowerCase());
    }
  });

  // Manually scrub contracts
  bearAddresses.delete("0xa8bd8e8c9949ab9eded28a248be1282e30265ca4"); // Contract
  bearAddresses.delete("0x4502293a1e421d26da1605f997a32b6ea6f24187"); // SushiSwap

  return bearAddresses;
}

function StakeSealWhitelist() {
  // Read Seal Staker snapshot
  var erc721data = fs.readFileSync("StakeSealsSnapshot.csv").toLocaleString();
  erc721data = erc721data.replace(/['"]+/g, "");

  // Convert string to array and scrub padded lines
  var erc721rows = erc721data.split("\n");
  erc721rows.pop();
  erc721rows.shift();

  const sealAddresses = new Set();

  erc721rows.forEach((row) => {
    columns = row.split(",");
    if (parseInt(columns[1]) < 13634705 && columns[15] === "Deposit") {
      sealAddresses.add(columns[4].toLowerCase());
    }
  });

  return sealAddresses;
}

function PixelWhitelist() {
  var erc721data = fs
    .readFileSync("24PXConfirmedWhitelist.csv")
    .toLocaleString();

  const pixelAddresses = new Set();

  // Convert string to array and scrub padded lines
  var erc721rows = erc721data.split("\n");
  erc721rows.pop();

  erc721rows.forEach((row) => {
    pixelAddresses.add(row);
  });

  return pixelAddresses;
}

// Returns a random number in the range [0, max]
function randomIntegerRange(generator, max = 1) {
  return Math.round(generator() * max);
}

function PickWinners(bearAddresses, sealAddresses, pixelAddresses, seed) {
  var generator = new seedrandom(seed);
  const bearArray = [...bearAddresses];
  const sealArray = [...sealAddresses];
  const winners = new Set();

  // 24px are already confirmed so no need to randomly select
  pixelAddresses.forEach((e) => winners.add(e));

  const maxSize1 = bearAddresses.size - 1;
  while (winners.size < 100) {
    const roll = randomIntegerRange(generator, maxSize1);
    winners.add(bearArray[roll]);
  }

  const maxSize2 = sealAddresses.size - 1;
  while (winners.size < 200) {
    const roll = randomIntegerRange(generator, maxSize2);
    winners.add(sealArray[roll]);
  }

  return winners;
}

const bearAddresses = WinterBearsWhitelist();
const sealAddresses = StakeSealWhitelist();
const pixelAddresses = PixelWhitelist();

const winners = PickWinners(
  bearAddresses,
  sealAddresses,
  pixelAddresses,
  "psychedelics"
);

const finalResults = [...winners].join("\r\n");

console.log(finalResults);

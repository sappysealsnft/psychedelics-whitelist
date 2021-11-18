# psychedelics-whitelist
This repository contains all of the code to recreate the whitelist selection process.  
The seed "psychedelics" is used for the random number generator to ensure it is repeatable and provably random.  

# CSV
24PXConfirmedWhitelist.csv = The 50 24px members whitelisted through their giveaway  
WB.csv = A snapshot of Winter Bears holders taken at 7PM UTC 17/11/21  
BEARHolderSnapshot.csv = A snapshot of $BEAR token holders  
StakeSealsSnapshot.csv = A snapshot of transactions within the Sappy Seals staking contract  
FinalWhitelist.csv = The output of the script with the final 200 whitelist members  

# Instructions
Make sure you have npm installed

`npm install`

To create a snapshot of Winter Bear holders, use the config file and package `erc721-snapshot`  
Globally install it as per their instructions and run `erc721-snapshot` with this directory open  
This will generate the csv

`node index.js`

Will then execute the script and spit out the whitelist addresses

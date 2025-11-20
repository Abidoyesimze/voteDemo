import hre from "hardhat";

async function main() {
  const contractAddress = "0x0c8cF958759f547a9Cc53Edceb428a8244aF4586";
  
  console.log(`Verifying contract at ${contractAddress} on ${hre.network.name}...`);
  
  const provider = hre.ethers.provider;
  const code = await provider.getCode(contractAddress);
  
  if (code === "0x") {
    console.log("❌ Contract not found at this address");
    return;
  }
  
  console.log("✅ Contract found! Bytecode length:", code.length);
  
  // Try to call owner function
  const abi = [
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  
  try {
    const contract = new hre.ethers.Contract(contractAddress, abi, provider);
    const owner = await contract.owner();
    console.log("✅ Contract owner:", owner);
    console.log("✅ Contract is accessible and functional!");
  } catch (error: any) {
    console.log("⚠️  Could not call contract:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


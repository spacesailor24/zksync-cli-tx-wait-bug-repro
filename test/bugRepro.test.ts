import { getWallet, LOCAL_RICH_WALLETS } from '../deploy/utils';
import { parseEther } from "ethers";

describe("BugRepro", function () {
    const wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey);

    it("Should transfer 1 ETH", async function() {
        const receiver = '0xAf0C73483AeD5C2029aB1dF32F3D6B75bA479088';
        console.log(await wallet.provider.getBalance(receiver));
    
        const tx = await wallet.sendTransaction({ value: parseEther('1'), to: receiver });
        const receipt = await tx.wait();

        // console.log(receipt);
    
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
        console.log(await wallet.provider.getBalance(receiver));
      });
});

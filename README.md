# zksync-cli `tx.wait()` Bug

I created this repo using: `npx zksync-cli create demo --template hardhat_solidity`

## Reproduction Steps

- `git clone git@github.com:spacesailor24/zksync-cli-tx-wait-bug-repro.git`
- `pnpm i`
- `pnpm test`

## The Bug

In [bugRepro.test.ts](./test/bugRepro.test.ts), I have the following:

```typescript
import { getWallet, LOCAL_RICH_WALLETS } from '../deploy/utils';
import { parseEther } from "ethers";

describe("BugRepro", function () {
    const wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey);

    it("Should transfer 1 ETH", async function() {
        const receiver = '0xAf0C73483AeD5C2029aB1dF32F3D6B75bA479088';
        console.log(await wallet.provider.getBalance(receiver));
    
        const tx = await wallet.sendTransaction({ value: parseEther('1'), to: receiver });
        const receipt = await tx.wait();
        console.log(receipt);
    
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
```

My expectation is that after `await tx.wait();`, the balance of `receiver` should be updated to `1 ETH`. However, it seems that after the `tx.wait` promise is resolved, the account state for `receiver` isn't actually updated

The `console.log(receipt);` returns something akin to:

```json
TransactionReceipt {
  provider: Provider { _contractAddresses: {} },
  to: '0xAf0C73483AeD5C2029aB1dF32F3D6B75bA479088',
  from: '0x36615Cf349d7F6344891B1e7CA7C72883F5dc049',
  contractAddress: null,
  hash: '0x251b6507d72d62ad2bda3f11b9494099c6a324edcdd8fbc8a971cd0baa9535f6',
  index: 0,
  blockHash: '0x200135b8f8aaace042f84902a7be3fca0494f0c34d75e47b0a38bcb72e514e31',
  blockNumber: 1,
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  gasUsed: 1236210n,
  blobGasUsed: undefined,
  cumulativeGasUsed: 0n,
  gasPrice: 100000000n,
  blobGasPrice: undefined,
  type: 0,
  status: 1,
  root: '0x0000000000000000000000000000000000000000000000000000000000000000',
  l1BatchNumber: 1,
  l1BatchTxIndex: undefined,
  l2ToL1Logs: [],
  _logs: [...]
}
```

which implies the transaction has actually been mined, but the balance of `receiver` doesn't show the `1 ETH` until last couple of `console.log(await wallet.provider.getBalance(receiver));`:

```bash
> zksync-hardhat-template@ test /Users/whyit/code/spacesailor24/demo
> hardhat test --network hardhat



  BugRepro
0n
0n
0n
0n
0n
0n
0n
0n
0n
0n
0n
1000000000000000000n
1000000000000000000n
1000000000000000000n
1000000000000000000n
1000000000000000000n
1000000000000000000n
    ✔ Should transfer 1 ETH (325ms)


  1 passing (328ms)
```
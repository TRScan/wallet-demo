/**
 * 构造签名交易
 */
const muta_sdk = require('muta-sdk');
const Muta = muta_sdk.Muta;
const utils = require('muta-sdk/build/main/utils');
const random_bytes = require("random-bytes");


const CHAIN_CONFIG = {
    chainId: "0xa0689c223fa2b49648b574561586ec919ea2af8d709812dde03992d1c6872cd5",//链唯一 id
    timeoutGap: 1500,//表示一笔交易发出后，最多允许几个块的延迟.如果随着链的进行, block 超出了timeout_gap 的设置但是交易仍然没有上链,那么这笔交易就被认为无效了.
};
const TRANSFER_CONFIG = {
    assetId: "fc785b61468d3c27d6b976cda679a1e8901b2917c266c4391fa723602cacf816",//需要转账的资产id
    mnemonic: 'lock donate happy pipe runway design figure mobile transfer used current resource',//转出账户的助记词
    accountIndex: 0,//通过助记词初始化的钱包中的第几个账户
    toAddress: "0xb6f6cae2efad8b55c0627f3f986df00c13cee64a",//转入资产的地址
    amount: 5,//转入资产的数量
};

/**
 *
 * @param height 区块当前高度，用于跟timeoutGap一起计算timeOut。
 * @returns {Promise<void>}
 */
async function main(height) {
    if (height === undefined)
        throw new Error("必须输入当前高度");
    const wallet = new Muta.hdWallet(TRANSFER_CONFIG.mnemonic);
    let fromAccount = wallet.deriveAccount(TRANSFER_CONFIG.accountIndex);

    const payload = {
        asset_id: TRANSFER_CONFIG.assetId,
        to: TRANSFER_CONFIG.toAddress,
        value: TRANSFER_CONFIG.amount
    };

    let tx = {
        chainId: CHAIN_CONFIG.chainId,
        cyclesLimit: '0xffff',
        cyclesPrice: '0x1',
        method: 'transfer',
        serviceName: 'asset',
        nonce: utils.toHex(random_bytes.sync(32).toString('hex')),//随机数
        payload: JSON.stringify(payload),
        timeout: utils.toHex(parseInt(height) + CHAIN_CONFIG.timeoutGap)
    };
    let signedTx = fromAccount.signTransaction(tx);
    const query = {
        query:
            'mutation sendTransaction($inputRaw: InputRawTransaction!, $inputEncryption: InputTransactionEncryption!) {\n  sendTransaction(inputRaw: $inputRaw, inputEncryption: $inputEncryption)\n}\n',
        variables: {
            inputEncryption: {
                pubkey: signedTx.pubkey,
                signature: signedTx.signature,
                txHash: signedTx.txHash,
            },
            inputRaw: {
                chainId: signedTx.chainId,
                cyclesLimit: signedTx.cyclesLimit,
                cyclesPrice: signedTx.cyclesPrice,
                method: signedTx.method,
                nonce: signedTx.nonce,
                payload: signedTx.payload,
                serviceName: signedTx.serviceName,
                timeout: signedTx.timeout,
            },
        },
    };
    console.log(JSON.stringify(query));

}


main(process.argv[2]);

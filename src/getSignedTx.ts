import muta = require('@mutadev/muta-sdk');
import { Account } from '@mutadev/account';
import { toHex, randomNonce } from '@mutadev/utils';
import { getAccount, getToAddress } from './getAddress';
import config from '../config.json';

/**
 * 构造交易并签名，得到的交易可以直接到https://testnet.huobichain.com/tools/send发送上联。
 * @param height 区块当前高度，用于跟timeoutGap一起计算timeOut。
 * @returns {string}
 */
const getSignedTx = () => {
    if (!config.assetId) {
        throw new Error("请输入assetId");
    }

    const signedTx = getSignedTransaction();

    console.log("\n\n签名交易: \n\n", JSON.stringify(signedTx, null, 4));
}

/**
 * 获取发送账户
 */
const getFromAccount = () => {
    if (config.privateKey) {
        const account = new Account(config.privateKey);
        return account;
    }
    console.log('没有私钥，即将根据助记词获取账户...\n');
    // 自动生成助记词、地址、公钥，返回地址
    return getAccount(false);
}



/**
 * 获取交易签名
 */
const getSignedTransaction = () => {
    const lastHeight = process.argv[2] || config.lastHeight;
    
    const account = getFromAccount() as muta.Account;

    const payload = {
        asset_id: config.assetId,
        to: getToAddress(),
        value: config.amount
    };
    
    const tx = {
        chainId: config.chainId,
        cyclesLimit: '0xffff',
        cyclesPrice: '0x1',
        method: 'transfer',
        serviceName: 'asset',
        nonce: randomNonce(),//随机数
        payload: JSON.stringify(payload),
        timeout: toHex(Number(lastHeight) + config.timeoutGap),
        sender: account.address
    };
    return account.signTransaction(tx);
}

getSignedTx();

import muta = require('@mutadev/muta-sdk');
import { HDWallet } from '@mutadev/wallet';
import { encodeAddress } from '@mutadev/utils';
import config from '../config.json';

// 自定义地址前缀
muta.setDefaultVariables('MUTA_ADDRESS_HRP', 'hb');

interface SrvAddress {
    Mnemonic: string;
    Address: string;
    PubKey: string;
}

/**
 * 获取一套助记词以及对应的地址，
 * 如果指定了助记词，会计算对应的地址
 */
const getAccount = (logs = true) : SrvAddress | muta.Account => {
    // 从命令行中获取助记词，若没有，则从config中获取mnemonic
    let Mnemonic = process.argv[2] || config.mnemonic;
    let showLogs = false;
    if (Mnemonic === '' || Mnemonic.split(' ').length !== 12) {
        if (Mnemonic === '') {
            console.log('没有助记词，将自动生成助记词、地址、公钥：\n');
        } else {
            console.log('助记词不正确，将自动生成新的助记词、地址、公钥：\n');
        }
        showLogs = true;
        Mnemonic = HDWallet.generateMnemonic();
    } else if (logs) {
        console.log('根据助记词，推导出以下地址：\n');
    }
    const hdWallet = new HDWallet(Mnemonic);
    const account = hdWallet.deriveAccount(0);
    const PubKey = account.publicKey;
    const Address = account.address;

    if (logs || showLogs) {
        console.log({
            Mnemonic,
            Address,
            PubKey
        });
    }
    if (!logs) {
        return account;
    }

    return {
        Mnemonic,
        Address,
        PubKey
    };
};

/**
 * 获取接收地址
 */
const getToAddress = () => {
    if (config.toAddress) {
        try {
            encodeAddress(config.toAddress);
            return config.toAddress;
        } catch (error) {
            console.log('toAddress 不正确，即将随机生成接收方的助记词、地址、私钥：\n');
        }
    } else {
        console.log('\n随机生成接收方账户：\n');
    }
    const Mnemonic = HDWallet.generateMnemonic();
    const hdWallet = new HDWallet(Mnemonic);
    const account = hdWallet.deriveAccount(0);
    const PubKey = account.publicKey;
    const Address = account.address;

    console.log({
        Mnemonic,
        Address,
        PubKey
    });

    return Address;
}

if (process.argv[1].includes('src/getAddress.ts')) {
    getAccount();
}

export {
    getAccount,
    getToAddress
};

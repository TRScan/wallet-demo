const muta = require('@mutadev/muta-sdk');
const { HDWallet } = require('@mutadev/wallet');
const config = require('../config.json');

// 自定义地址前缀
muta.setDefaultVariables('MUTA_ADDRESS_HRP', 'hb');

/**
 * 获取一套助记词以及对应的地址，
 * 如果指定了助记词，会计算对应的地址
 */
const main = () => {
    // 从命令行中获取助记词，若没有，则从config中获取words
    let Words = process.argv[2] || config.words;
    if (Words === '' || Words.split(' ').length !== 12) {
        const tips = Words === '' ? '' : '助记词不正确，';
        console.log(tips + '生成的钱包：\n');
        Words = HDWallet.generateMnemonic();
    }
    const hdWallet = new HDWallet(Words);
    const account = hdWallet.deriveAccount(0);
    const PubKey = account.publicKey;
    const Address = account.address;

    console.log({
        Words,
        Address,
        PubKey
    });
};

main();
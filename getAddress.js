/**
 * 获取一套助记词以及对应的地址，
 * 如果指定了助记词，会计算对应的地址
 */
const muta_sdk = require('muta-sdk');
const Muta = muta_sdk.Muta;

let words = "";//如果已经有助记词，填写在这里，程序会计算出对应的地址和公钥

function main() {
    if (words === undefined || words === "" || words.split(" ").length !== 12) {
        const wallet = Muta.hdWallet;
        words = wallet.generateMnemonic();
    }
    const hdWallet = new Muta.hdWallet(words);
    const account = hdWallet.deriveAccount(0);
    const address = account.address;
    const pubKey = account.publicKey;

    console.log({
        words:words,
        Address:address,
        PubKey:pubKey
    });

}

main();
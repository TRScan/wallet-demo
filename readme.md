# huobichain demo

这个demo可以帮助你更好的了解火币公链。通过这个demo，你可以生成并管理你的私钥。并构造一个签名的交易，到[火币公链测试链浏览器站点](https://testnet.huobichain.com)，将交易广播到链上。

## 安装

首先需要安装[Node环境](https://nodejs.org/)；
获取代码后，在项目文件夹运行

> npm install

## 运行

生成钱包地址：

> npm run address

根据助记词获取钱包地址（命令形式）：

> npm run address "xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx"

根据助记词获取钱包地址（配置形式）：

- 在根目录的config.json里，填写正确的助记词，mnemonic字段，运行以下命令
> npm run address

构造签名交易（命令形式）：

- 块最新高度，可省略
> npm run tx [块最新高度]


config.json介绍

```
{
    "mnemonic": "crumble maze offer scorpion random claim inform version print retire theory document", // 助记词，不填则随机生成
    "privateKey": "0x0000000000000000000000000000000000000000000000000000000000000001", // 私钥，发送交易必填
    "chainId": "0xa0689c223fa2b49648b574561586ec919ea2af8d709812dde03992d1c6872cd5", // 链ID，必填
    "assetId": "0xf56924db538e77bb5951eb5ff0d02b88983c49c45eea30e8ae3e7234b311436c", // 资产ID，必填
    "toAddress": "", // 接收方地址，不填则随机生成
    "timeoutGap": 50000, // 广播超时时间
    "amount": 500, // 转账金额
    "lastHeight": 10000 // 最新区块高度
}
```

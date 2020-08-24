# huobichain demo

这个demo可以帮助你更好的了解火币公链。通过这个demo，你可以生成并管理你的私钥。并构造一个签名的交易，到[火币公链测试链浏览器站点](https://testnet.huobichain.com)，将交易广播到链上。

## 安装

获取代码后，在项目文件夹运行

> npm install

## 运行

生成钱包地址：

> npm run address

根据助记词获取钱包地址（命令形式）：

> npm run address "xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx"

根据助记词获取钱包地址（配置形式）：

> // 在根目录的config.json里，填写正确的助记词，words字段，运行以下命令
> npm run address

构造签名交易

修改参数(包括资产id，转入账户，金额等），然后运行，最后的参数是最新区块的高度

> npm run tx xxx

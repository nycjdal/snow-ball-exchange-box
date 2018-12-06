<template>
    <div class="hello">
        <div class="account_r">
            <h2><img src="../assets/logo.png"/></h2>
            <!--
            lastprice
            24h Volume
            Bid
            Ask
            24h High
            24h Low
            24h Trade Count
            // 用户地址
      user_address: null,
      // 用户的SBE余额
      balance_of: null,
      // 用户当前因卖出key所得Ong余额，未提现
      ong_balance_of: null,
      // 用户当前作为推荐人所得到的推荐分红
      referral_balance_of: null,
      // 用户当前的持有分红
      dividend_of: null,
      // 用户当前已经提现的Ong总量
      withdrawn_ong_of: null,
            -->
            <ul>
                <li><hr/>当前价格：</li>
                <li><hr/>{{current_price}}</li>
            </ul>
            <ul>
                <li><hr/> SEB总量：</li>
                <li><hr/>{{total_SBE_amount}}</li>
            </ul>
            <ul>
                <li><hr/>ONG总量：</li>
                <li><hr/>{{total_ong_amount}}</li>
            </ul>
            <hr/>
            <ul>
                <li><hr/>用户推荐分红：</li>
                <li><hr/>0</li>
            </ul>
            <ul>
                <li><hr/>用户持有分红：</li>
                <li><hr/>{{dividend_of}}</li>
            </ul>
            <div>
            </div>
        </div>
        <div class="buyAndsell">
            <div class="buy">
                <h2>BUY SEB</h2>
                <ul class="Net Total">
                    <li class="Account_li">Net Total:</li>
                    <li class="Account_input"><input tyle="text"   vaule="0.0000000" v-model="ong_to_token_NetTotal"/></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Price">
                    <li class="Account_li">Price:</li>
                    <li class="Account_input"><input type="text" vaule="请输入你要提现的地址数量" v-model="current_price"/></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Total">
                    <li class="Account_li">Total:</li>
                    <li class="Account_input"><input  tyle="text" readonly="readonly" vaule="0.0000000" v-model="ong_to_token_total"/></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Fee">
                    <li class="Account_li">Fee:</li>
                    <li class="Account_input"><input tyle="text" readonly="readonly" vaule="0.0000000" v-model="ong_to_token_fee"/></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Account">
                    <li class="Account_li">Account:</li>
                    <li class="Account_input"><input tyle="text"  readonly="readonly" vaule="0.0000000" v-model="ong_to_token"/></li>
                    <li class="Accoun_key">SEB</li>
                </ul>
                <button @click="buy(0)" >buy</button>
            </div>
            <div class="sell">
                <h2>SELL SEB</h2>
                <ul class="Net Total">
                    <li class="Account_li">Net Total:</li>
                    <li class="Account_input"><input tyle="text"   vaule="0.0000000" v-model="token_to_ong_token"/></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Price">
                    <li class="Account_li">Price:</li>
                    <li class="Account_input"><input tyle="text" readonly="readonly" vaule="0.0000000" v-model="current_price"/></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Fee">
                    <li class="Account_li">Fee:</li>
                    <li class="Account_input"><input tyle="text" readonly="readonly" vaule="0.0000000" v-model="token_to_ong_fee"/></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Total">
                    <li class="Account_li">Total:</li>
                    <li class="Account_input"><input tyle="text" readonly="readonly" vaule="0.0000000" v-model="token_to_ong_total" /></li>
                    <li class="Accoun_key">ONG</li>
                </ul>
                <ul class="Account">
                    <li class="Account_li">Account:</li>
                    <li class="Account_input"><input tyle="text" vaule="0.0000000"  readonly="readonly" v-model="token_to_ong_ong"/></li>
                    <li class="Accoun_key">SEB</li>
                </ul>
                <button @click="sell()" >sell</button>
            </div>
        </div>
    </div>
</template>

<script>
import {client} from 'ontology-dapi'
import {Parameter, ParameterType, utils, Crypto} from 'ontology-ts-sdk'
// import { ParameterTypeVal } from 'ontology-ts-sdk/lib/types/smartcontract/abi/parameter'
const contract = '617d92c861afc0e9b44176feea204d376f2f54da'
const gasLimit = 100000
const gasPrice = 500
export default {
  name: 'HelloWorld',
  data () {
    return {
      // ##################### 交易信息交互 ####################
      ong_to_token_NetTotal: null,
      ong_to_token_total: null,
      ong_to_token_fee: null,
      ong_to_token: null,
      token_to_ong_fee:null,
      token_to_ong_token: null,
      token_to_ong_total: null,
      token_to_ong_ong: null,
      withdraw_to_ong: null,
      // ##################### 查询公共信息 ####################
      // SnowBall Exchange名字即"SnowBall Exchange"
      name: null,
      // SnowBall Exchange的缩写即SBE
      symbol: null,
      // SBE的精确度即小数点后几位
      decimals: null,
      // 要想成为推荐人的资格
      stake_requirement: null,
      // 合约内Ong问量(包括大家买SBE的ong + 大家的总分红ONG)
      total_ong_amount: null,
      // 合约内买SBE的ong总量
      total_ong_for_key: null,
      // 当前SBE的价格，
      current_price: null,
      // SBE (SnowBall Exchange)总量
      total_SBE_amount: null,
      // ##################### 查询用户状态信息 ####################
      // 用户地址
      user_address: null,
      // 用户的SBE余额
      balance_of: null,
      // 用户当前因卖出key所得Ong余额，未提现
      ong_balance_of: null,
      // 用户当前作为推荐人所得到的推荐分红
      referral_balance_of: null,
      // 用户当前的持有分红
      dividend_of: null,
      // 用户当前已经提现的Ong总量
      withdrawn_ong_of: null,
      // ##################### 用户动态交易信息 ####################
      // 交易种类: 取值为"buy"--买入 或 "sell"--卖出 或 "reinvest"--再投资 或 "withdraw"--提现
      // action: null,
      // // 交易的ong数量
      // action_ong_amount: null,
      // // 交易的SBE数量
      // action_key_amount: null,
      // // 交易完成时的时间
      // action_utc_time: null
      action: null,
      action_ong_amount: null,
      action_key_amount: null,
      action_utc_time: null,
      action_tx_hash: null
      // sell: null, sell_ong_amount: null, sell_key_amount: null,  sell_utc_time: null,
      // reinvest: null, reinvest_ong_amount: null, reinvest_key_amount: null,  reinvest_utc_time: null,
      // withdraw: null, withdraw_ong_amount: null, withdrawn_utc_time: null
      // ##################### 冗余信息 ####################
    }
  },
  async mounted () {
    try { // get provider
      const provider = await client.api.provider.getProvider()
      console.log('onGetProvider: ' + JSON.stringify(provider))
      this.provider = provider
    } catch (e) {
      console.log('No dAPI provider istalled.')
      this.$message.warning('No provider installed. Please install the Cyano Wallet before joining the game.')
      return null
    }
    this.intervalId = setInterval(() => {
      this.refresh()
    }, 3000)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  methods: {
    // ##################### 用户动态交易信息 ####################
    buy (directReferral) {
      // alert(this.ong_to_token_NetTotal)
      this.ongAmount = parseInt(this.ong_to_token_NetTotal * 1000000000)
      if (!this.provider) {
        return
      }
      this.$confirm({
        title: `This game needs you input ongAmount and your referral`,
        content: `You can buy maximum 5 ong worth of keys for players`,
        okText: `buy`,
        okType: 'Primary',
        cancelText: 'Not now',
        onOk: () => {
          console.log('ongAmount is -- ' + this.ongAmount + ', directferral is -- ' + directReferral)
          this.handleBuy(this.ongAmount, directReferral)
        }
      })
      // // alert(this.action_utc_time)
      // let timestamp = (new Date()).valueOf()
      // alert(timestamp)
      // let url = '/api/get.php?timestamp=' + timestamp + '?type=buy?ong_to_token_NetTotal=' + this.ong_to_token_NetTotal + '?user_address' + this.user_address + '?current_price=' + this.current_price
      // fetch(url, {
      //   method: 'get',
      //   headers: {
      //     'Content-type': 'application/json'
      //   }
      // }).then(result => {
      //   return result
      // }).then(data => {
      //   console.log(data)
      //   if (data.success === 1) {
      //     console.log(data.msg)
      //   }
      // })
    },
    async handleBuy (ongAmount, directferral) {
      let account
      // get account
      try {
        account = await client.api.asset.getAccount()
        // console.log('fromAccount is -- ' + account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please try again later.')
        return 'No_ACCOUNT'
      }

      const acct = new Crypto.Address(account).serialize()
      if (directferral) {
        const directferralByteArray = new Crypto.Address(directferral).serialize()
      }
      // invoke
      const method = 'buy'
      const parameters = [
        new Parameter('account', ParameterType.ByteArray, acct),
        new Parameter('ongAmount', ParameterType.Integer, ongAmount),
        new Parameter('directReferral', ParameterType.Integer, 0)
      ]
      const params = {
        contract,
        method,
        parameters,
        gasPrice,
        gasLimit
      }
      const result = await this.scInvoke(params, false)
      if (result) {
        this.$message.success('You just bought ' + ongAmount + ' ONG worth of tokens')
      } else {
        this.$message.error('some error happens in your buy, please try again later')
      }
      let res = JSON.stringify(result)
      // console.log('res --- ' + res)
      let result1 = JSON.parse(res)
      let result2 = result1.result
      let txhash = result1.transaction

      const event = result2[result2.length - 1]
      console.log('result --- ' + event)
      const event_action = utils.hexstr2str(event[0])
      const base58_address = new Crypto.Address(event[1]).toBase58()
      const ong_amount = parseInt(utils.reverseHex(event[2]), 16) / 10 ** 9
      const SBE_amount =  parseInt(utils.reverseHex(event[3]), 16) / 10 ** 9
      const raw_direct_referral = event[4]

      // console.log('event --- ' + event_action)
      // console.log('address ---(base58) ' + base58_address)
      // console.log('ongAmount --- ' + ong_amount)
      // console.log('tokenAmount --- ' + SBE_amount)
      // console.log('tokenAmount --- ' + raw_direct_referral)
      console.log('txhash --- ' + txhash)

      this.user_address = base58_address
      this.action = event_action || null
      this.action_ong_amount = ong_amount || 0
      this.action_key_amount = SBE_amount || 0
      this.action_tx_hash = txhash || null
      // this.action_utc_time = time
      return true
    },
    sell () {
      this.SBEAmount = this.token_to_ong_Account * 1000000000
      if (!this.provider) {
        return
      }
      this.$confirm({
        title: `This game needs you input ongAmount and your referral`,
        content: `You can buy maximum 5 ong worth of keys for players`,
        okText: `sell`,
        okType: 'Primary',
        cancelText: 'Not now',
        onOk: () => {
          console.log('SBE is -- ' + this.SBEAmount)
          this.handleSell(this.SBEAmount)
        }
      })
    },
    async handleSell (SBEAmount) {
      let account
      // get account
      try {
        account = await client.api.asset.getAccount()
        // console.log('fromAccount is -- ' + account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please try again later.')
        return 'No_ACCOUNT'
      }

      const acct = new Crypto.Address(account).serialize()
      // invoke
      const method = 'sell'
      const parameters = [
        new Parameter('account', ParameterType.ByteArray, acct),
        new Parameter('SBEAmount', ParameterType.Integer, SBEAmount)
      ]
      const params = {
        contract,
        method,
        parameters,
        gasPrice,
        gasLimit
      }
      const result = await this.scInvoke(params, false)
      if (result) {
        this.$message.success('You just sold ' + SBEAmount + ' SBE tokens')
      } else {
        this.$message.error('some error happens in your buy, please try again later')
      }
      let res = JSON.stringify(result)
      // console.log('res --- ' + res)
      let result1 = JSON.parse(res)
      let result2 = result1.result
      let txhash = result1.transaction

      const event = result2[result2.length - 1]
      // console.log('result --- ' + event)
      const event_action = utils.hexstr2str(event[0])
      const base58_address = new Crypto.Address(event[1]).toBase58()
      const SBE_amount =  parseInt(utils.reverseHex(event[2]), 16) / 10 ** 9
      const ong_amount = parseInt(utils.reverseHex(event[3]), 16) / 10 ** 9

      console.log('event --- ' + event_action)
      console.log('address ---(base58) ' + base58_address)
      console.log('tokenAmount --- ' + SBE_amount)
      console.log('ongAmount --- ' + ong_amount)
      console.log('txhash --- ' + txhash)

      this.user_address = base58_address
      this.action = event_action || null
      this.action_ong_amount = ong_amount || 0
      this.action_key_amount = SBE_amount || 0
      this.action_tx_hash = txhash || null
      // this.action_utc_time = time
      return true

    },

    reinvest () {
      if (!this.provider) {
        return
      }
      this.$confirm({
        title: `This game needs you input ongAmount and your referral`,
        content: `You can buy maximum 5 ong worth of keys for players`,
        okText: `reinvest`,
        okType: 'Primary',
        cancelText: 'Not now',
        onOk: () => {
          // console.log('SBE is -- ' + SBEAmount)
          this.handleReinvest()
        }
      })
    },
    async handleReinvest() {
      let account
      // get account
      try {
        account = await client.api.asset.getAccount()
        // console.log('fromAccount is -- ' + account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please try again later.')
        return 'No_ACCOUNT'
      }
      const acct = new Crypto.Address(account).serialize()
      // invoke
      const method = 'reinvest'
      const parameters = [
        new Parameter('account', ParameterType.ByteArray, acct)
      ]
      const params = {
        contract,
        method,
        parameters,
        gasPrice,
        gasLimit
      }
      const result = await this.scInvoke(params, false)
      if (result) {
        this.$message.success('You just rebougt ' + this.dividend_of + ' ONG worth of tokens')
      } else {
        this.$message.error('some error happens in your reinvest, please try again later')
      }
      let res = JSON.stringify(result)
      // console.log('res --- ' + res)
      let result1 = JSON.parse(res)
      let result2 = result1.result
      let txhash = result1.transaction

      const event = result2[result2.length - 1]
      console.log('result --- ' + event)
      const event_action = utils.hexstr2str(event[0])
      const base58_address = new Crypto.Address(event[1]).toBase58()
      const ong_amount = parseInt(utils.reverseHex(event[2]), 16) / 10 ** 9
      const SBE_amount =  parseInt(utils.reverseHex(event[3]), 16) / 10 ** 9

      // console.log('event --- ' + event_action)
      // console.log('address ---(base58) ' + base58_address)
      // console.log('ongAmount --- ' + ong_amount)
      // console.log('tokenAmount --- ' + SBE_amount)
      // console.log('tokenAmount --- ' + raw_direct_referral)
      // console.log('txhash --- ' + txhash)

      this.user_address = base58_address
      this.action = event_action || null
      this.action_ong_amount = ong_amount || 0
      this.action_key_amount = SBE_amount || 0
      this.action_tx_hash = txhash || null
      // this.action_utc_time = time

    },


    withdraw() {
      if(!this.provider) {
        return
      }
      this.$confirm({
        title: `This game needs you input ongAmount and your referral`,
        content: `You can buy maximum 5 ong worth of keys for players`,
        okText: `withdraw`,
        okType: 'Primary',
        cancelText: 'Not now',
        onOk: () => {
          // console.log('SBE is -- ' + SBEAmount)
          this.handleWithdraw()
        },
      })
    },
    async handleWithdraw() {
      let account
      // get account
      try{
        account = await client.api.asset.getAccount()
        // console.log('fromAccount is -- ' + account)
      }catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please try again later.')
        return 'No_ACCOUNT'
      }

      const acct = new Crypto.Address(account).serialize()
      // invoke
      const method = 'withdraw'
      const parameters = [
        new Parameter('account', ParameterType.ByteArray, acct)
      ]
      const params = {
        contract,
        method,
        parameters,
        gasPrice,
        gasLimit
      }
      const result = await this.scInvoke(params, false)
      if (result) {
        this.$message.success('You just withdraw ' + this.dividend_of + ' ONG worth of tokens')
      } else {
        this.$message.error('some error happens in your reinvest, please try again later')
      }
      let res = JSON.stringify(result)
      // console.log('res --- ' + res)
      let result1 = JSON.parse(res)
      let result2 = result1.result
      let txhash = result1.transaction

      const event = result2[result2.length - 1]
      console.log('result --- ' + event)
      const event_action = utils.hexstr2str(event[0])
      const base58_address = new Crypto.Address(event[1]).toBase58()
      const ong_amount = parseInt(utils.reverseHex(event[2]), 16) / 10 ** 9

      // console.log('event --- ' + event_action)
      // console.log('address ---(base58) ' + base58_address)
      // console.log('ongAmount --- ' + ong_amount)
      // console.log('tokenAmount --- ' + SBE_amount)
      // console.log('tokenAmount --- ' + raw_direct_referral)
      // console.log('txhash --- ' + txhash)

      this.user_address = base58_address
      this.action = event_action || null
      this.action_ong_amount = ong_amount || 0
      this.action_key_amount = 0
      this.action_tx_hash = txhash || null
      // this.action_utc_time = time

    },

    async refresh () {
      // // ##################### 查询公共信息 ####################
      this.name = (await this.queryName()) || null
      this.symbol = await this.querySymbol() || null
      this.decimals = await this.queryDecimals() || 0
      this.stake_requirement = await this.queryStakeRequirement() || 0
      this.total_ong_amount = await this.queryTotalOngAmount() || 0
      this.total_ong_for_key = await this.queryTotalOngForKey() || 0
      this.current_price = await this.queryCurrentPrice() || 0
      this.total_SBE_amount = await this.queryTotalSBEAmount() || 0

      // ##################### 查询用户状态信息 ####################
      this.user_address = await this.queryUserAddress() || null
      this.balance_of = await this.queryBalanceOf() || 0
      this.ong_balance_of = await this.queryOngBalanceOf() || 0
      this.referral_balance_of = await this.queryReferralBalanceOf() || 0
      this.dividend_of = await this.queryDividendOf() || 0
      this.withdrawn_ong_of = await this.queryWithdrawnOngOf() || 0
      // ##################### 用户动态交易信息 ####################


    },

    // ##################### 查询公共信息 ####################
    async queryName () {
      const method = 'getName'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const getName = await this.scInvoke(params, true)
      console.log(getName)
      const name = utils.hexstr2str(getName)
      console.log(name)
      return name
      // const tmp = utils.hexstr2str(getName)
      // console.log('queryname---------------- ' + tmp)
      // return tmp
    },
    async querySymbol () {
      const method = 'getSymbol'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const getSymbol = await this.scInvoke(params, true)
      const symbol = utils.hexstr2str(getSymbol)
      return symbol
    },
    async queryDecimals () {
      const method = 'getDecimals'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const getDecimals = await this.scInvoke(params, true)
      const decimals = parseInt(utils.reverseHex(getDecimals), 16)
      return decimals
    },

    async queryStakeRequirement () {
      const method = 'getStakeRequirement'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const getStakeRequirement = await this.scInvoke(params, true)
      const stake_requirement = parseInt(utils.reverseHex(getStakeRequirement), 16) / 10 ** 9
      return stake_requirement

    },

    async queryTotalOngAmount () {
      const method = 'totalOngBalance'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const totalOngBalance = await this.scInvoke(params, true)
      const total_ong_amount = parseInt(utils.reverseHex(totalOngBalance), 16) / 10 ** 9
      return total_ong_amount
    },

    async queryTotalOngForKey () {
      const method = 'totalOngForKey'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const totalOngForKey = await this.scInvoke(params, true)
      const total_ong_for_key = parseInt(utils.reverseHex(totalOngForKey), 16) / 10 ** 9
      return total_ong_for_key
    },

    async queryCurrentPrice () {
      const method = 'getPrice'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const currentPrice = await this.scInvoke(params, true)
      const current_price = parseInt(utils.reverseHex(currentPrice), 16) / 10 ** 9
      return current_price
    },

    async queryTotalSBEAmount () {
      const method = 'totalSupply'
      const parameters = []
      const params = {
        contract,
        method,
        parameters
      }
      const totalSBEAmount = await this.scInvoke(params, true)
      const total_SBE_amount = parseInt(utils.reverseHex(totalSBEAmount), 16) / 10 ** 9
      return total_SBE_amount
    },

    // ##################### 查询用户状态信息 ####################
    async queryUserAddress () {
      let account
      // get account
      try{
        account = await client.api.asset.getAccount()
        // console.log('queryUserAddress is -- ' + account)
      }catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please try again later.')
        return 'No_ACCOUNT'
      }
      return account
    },

    async queryBalanceOf () {
      let account
      try { // get account
        account = await client.api.asset.getAccount()
        console.log(account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please prepare an account before joining the game.')
        return 'NO_ACCOUNT'
      }
      const acct = new Crypto.Address(account).serialize()
      const method = 'balanceOf'
      const parameters = [
        new Parameter('acct', ParameterType.ByteArray, acct)
      ]
      const params = {
        contract,
        method,
        parameters
      }
      const gettedBalance = await this.scInvoke(params, true)
      const balanceOf = parseInt(utils.reverseHex(gettedBalance), 16) / 10 ** 9
      return balanceOf
    },

    async queryOngBalanceOf () {
      let account
      try { // get account
        account = await client.api.asset.getAccount()
        // console.log(account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please prepare an account before joining the game.')
        return 'NO_ACCOUNT'
      }
      const acct = new Crypto.Address(account).serialize()
      const method = 'ongBalanceOf'
      const parameters = [
        new Parameter('acct', ParameterType.ByteArray, acct)
      ]
      const params = {
        contract,
        method,
        parameters
      }
      const gettedOngBalance = await this.scInvoke(params, true)
      const ongBalanceOf = parseInt(utils.reverseHex(gettedOngBalance), 16) / 10 ** 9
      console.log('ongBalanceOf -- ' + ongBalanceOf)
      return ongBalanceOf
    },

    async queryReferralBalanceOf () {
      let account
      try { // get account
        account = await client.api.asset.getAccount()
        // console.log(account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please prepare an account before joining the game.')
        return 'NO_ACCOUNT'
      }
      const acct = new Crypto.Address(account).serialize()
      const method = 'referralBalanceOf'
      const parameters = [
        new Parameter('acct', ParameterType.ByteArray, acct)
      ]
      const params = {
        contract,
        method,
        parameters
      }
      const gettedReferralBalance = await this.scInvoke(params, true)
      const referralBalanceOf = parseInt(utils.reverseHex(gettedReferralBalance), 16) / 10 ** 9
      return referralBalanceOf
    },

    async queryDividendOf () {
      let account
      try { // get account
        account = await client.api.asset.getAccount()
        // console.log(account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please prepare an account before joining the game.')
        return 'NO_ACCOUNT'
      }
      const acct = new Crypto.Address(account).serialize()
      const method = 'getDividendOf'
      const parameters = [
        new Parameter('acct', ParameterType.ByteArray, acct)
      ]
      const params = {
        contract,
        method,
        parameters
      }
      const gettedDividendOf = await this.scInvoke(params, true)
      const dividend_of = parseInt(utils.reverseHex(gettedDividendOf), 16) / 10 ** 9
      return dividend_of
    },

    async queryWithdrawnOngOf () {
      let account
      try { // get account
        account = await client.api.asset.getAccount()
        // console.log(account)
      } catch (err) {
        console.log(err)
        this.$message.warning('No account found in the provider. Please prepare an account before joining the game.')
        return 'NO_ACCOUNT'
      }
      const acct = new Crypto.Address(account).serialize()
      const method = 'withdrawnEarnings'
      const parameters = [
        new Parameter('acct', ParameterType.ByteArray, acct)
      ]
      const params = {
        contract,
        method,
        parameters
      }
      const withdrawnEarnings = await this.scInvoke(params, true)
      const withdrawn_ong_of = parseInt(utils.reverseHex(withdrawnEarnings), 16) / 10 ** 9
      return withdrawn_ong_of
    },














    async scInvoke (params, preExec) {
      try {
        let result
        if (preExec) {
          result = await client.api.smartContract.invokeRead(params)
        } else {
          result = await client.api.smartContract.invoke(params)
        }
        // console.log('onScCall finished, result:' + JSON.stringify(result))
        return result
      } catch (e) {
        console.log('onScCall error:', e)
        // this.$message.error('Some error happens. Please try later.')
        return null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    template{
        margin:0;
        padding:0;
    }
    .account_r{
        width: 30%;
        height: 400px;
        float: left;
        margin-left: 2.5%;
        margin-top: 40px;
    }
    .account_r h2{
        width: 100%;
        font-family: "Microsoft Yahei";
        color: #cecece;
    }
    .account_r ul{
        width: 100%;
        list-style: none;
        float: left;
    }
    .account_r ul li{
        width: 50%;
        float: left;
        font-size: 16px;
        font-family: "Microsoft Yahei";
        color: #cecece;

    }
    .buyAndsell{
        width: 95%;
        height: 300px;
        float: left;
        margin-top: 20px;
        margin-left:2.5%;
    }
    .buy{
        width: 45%;
        height: 100%;
        float: left;
    }
    .sell{
        width: 45%;
        height: 100%;
        float: right;
    }
    .buy h2{
        width: 100%;
        height: 40px;
        background-color: darkgreen;
        text-align: center;
        font-family: "Microsoft Yahei";
        color: #cecece;
    }
    .buy ul{
        width: 100%;
        list-style: none;
        float: left;
        margin-top: 15px;
    }
    .buy ul li{
        float: left;
        font-family: "Microsoft Yahei";
        color: #cecece;
    }
    .buy ul .Account_li{
        width: 10%;
        height: 30px;
        float: left;
    }
    .buy ul .Account_input{
        width: 80%;
        height: 30px;
        float: left;
    }
    .buy ul .Account_input input{
        width: 100%;
        height: 30px;
        float: left;
    }
    .sell h2{
        width: 100%;
        height: 40px;
        background-color: darkred;
        text-align: center;
    }
    .sell ul{
        width: 100%;
        list-style: none;
        float: left;
        margin-top: 15px;
    }
    .sell ul li{
        float: left;
        font-family: "Microsoft Yahei";
        color: #cecece;
    }
    .sell ul .Account_li{
        width: 10%;
        height: 30px;
        float: left;
    }
    .sell ul .Account_input{
        width: 80%;
        height: 30px;
        float: left;
    }
    .sell ul .Account_input input{
        width: 100%;
        height: 30px;
        float: left;
    }
</style>


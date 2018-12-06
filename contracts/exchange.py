from boa.interop.System.ExecutionEngine import GetExecutingScriptHash
from boa.builtins import ToScriptHash, concat, state
from boa.interop.System.Runtime import CheckWitness, Notify
from boa.interop.System.Storage import Get, GetContext, Put, Delete
from boa.interop.Ontology.Native import Invoke

# from contract.exchange.libs.SafeMath import Sub, Pwr, Sqrt, Add, Mul, Div
# from contract.exchange.libs.SafeCheck import Require, RequireScriptHash


"""
SafeCheck.py
"""
def Require(condition):
	"""
	If condition is not satisfied, return false
	:param condition: required condition
	:return: True or false
	"""
	if not condition:
		_noUseYetNeedReturn = Revert()
	return True

def RequireScriptHash(key):
    """
    Checks the bytearray parameter is script hash or not. Script Hash
    length should be equal to 20.
    :param key: bytearray parameter to check script hash format.
    :return: True if script hash or revert the transaction.
    """
    _noUseYetNeedReturn = Require(len(key) == 20)
    return True

def RequireWitness(witness):
    """
	Checks the transaction sender is equal to the witness. If not
	satisfying, revert the transaction.
	:param witness: required transaction sender
	:return: True if transaction sender or revert the transaction.
	"""
    _noUseYetNeedReturn = Require(CheckWitness(witness))
    return True

"""
SafeMath.py
"""

def Add(a, b):
    """
	Adds two numbers, throws on overflow.
	"""
    c = a + b
    _noUseYetNeedReturn = Require(c >= a)
    return c

def Sub(a, b):
    """
	Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    :param a: operand a
    :param b: operand b
    :return: a - b if a - b > 0 or revert the transaction.
	"""
    _noUseYetNeedReturn = Require(a>=b)
    return a-b

def Mul(a, b):
    """
	Multiplies two numbers, throws on overflow.
    :param a: operand a
    :param b: operand b
    :return: a - b if a - b > 0 or revert the transaction.
	"""
    if a == 0:
        return 0
    c = a * b
    _noUseYetNeedReturn = Require(c / a == b)
    return c

def Div(a, b):
    """
	Integer division of two numbers, truncating the quotient.
	"""
    _noUseYetNeedReturn = Require(b > 0)
    c = a / b
    return c

def Pwr(a, b):
    """
    a to the power of b
    :param a the base
    :param b the power value
    :return a^b
    """
    c = 0
    if a == 0:
        c = 0
    elif b == 0:
        c = 1
    else:
        i = 0
        c = 1
        while i < b:
            c = Mul(c, a)
            i = i + 1
    return c

def Sqrt(a):
    """
    Return sqrt of a
    :param a:
    :return: sqrt(a)
    """
    c = Div(Add(a, 1), 2)
    b = a
    while(c < b):
        b = c
        c = Div(Add(Div(a, c), c), 2)
    return c
"""
Utils.py
"""

def Revert():
    """
    Revert the transaction. The opcodes of this function is `09f7f6f5f4f3f2f1f000f0`,
    but it will be changed to `ffffffffffffffffffffff` since opcode THROW doesn't
    work, so, revert by calling unused opcode.
    """
    raise Exception(0xF1F1F2F2F3F3F4F4)

def SafePut(context, key, value):
    if value == 0:
        Delete(context, key)
    else:
        Put(context, key, value)


initial_name = "SnowBall Exchange"
initial_symbol = "SBE"
# SBE token decimal
decimal_ = 9
# dividend fee without referral = 19 (dividends to all token holders)
dividendFee0_ = 20
# dividend fee with only direct referral, 14 = 4 (directReferralFee_) + 10 (dividends to all token holders)
# dividend fee with both direct and indirect referral, 14 = 4 (directReferralFee_) + 1(indirectReferrlFee_) + 9(dividends to all token holders)
dividendFee1_ = 14
# direct referral bonus
directReferralFee_ = 4
# indirect referral bonus
indirectReferralFee_ = 1


# 0.0001 ONG
initialTokenPrice_ = 100000
# 0.00001 ONG
initialTokenPriceIncremental_ = 10000
# P = delta_P/10000*Q + P0-delta_P
# Ong decimal is 9
# ongMagnitude_ = Pwr(10, 9)
ongMagnitude_ = 1000000000
# tokenMagnitude_ = Pwr(10, decimal_)
tokenMagnitude_ = 1000000000

# multiply _dividends to make it dividable to _oldFakeTotalSupply, we will divide _profitPerToken when we actually use it
# largeNumber_ = Pwr(10, 20)
largeNumber_ = 100000000000000000000
# stake requirement (defaults at 200 tokens)
# referralStakeRequirement_ = Mul(200, tokenMagnitude_)
# referralStakeRequirement_ = 2000000
referralStakeRequirement_ = 200

# ongContractAddress_ = bytearray(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02')
ONGContractAddress_ = ToScriptHash("AFmseVrdL9f9oyCzZefL9tG6UbvhfRZMHJ")
selfContractAddr_ = GetExecutingScriptHash()
admin_ = ToScriptHash("AQf4Mzu1YJrhz9f3aRkkwSm9n3qhXGSh4p")
team_ = ToScriptHash("AQf4Mzu1YJrhz9f3aRkkwSm9n3qhXGSh4p")

ADMIN_SUFFIX = bytearray(b'\x01')
MANAGER_SUFFIX = bytearray(b'\x02')
REFERREDBY_SUFFIX = bytearray(b'\0x03')
TOKEN_BALANCE_SUFFIX = bytearray(b'\x04')
ONG_BALANCE_SUFFIX = bytearray(b'\0x05')
DIVIDEND_VAULT_SUFFIX = bytearray(b'\x06')
REFERRAL_BALANCE_SUFFIX = bytearray(b'\x07')
PROFIT_PER_TOKEN_AFTER_SUFFIX = bytearray(b'\0x8')
WITHDRAWN_EARNINGS_SUFFIX = bytearray(b'\0x9')

NAME_KEY = "name"
SYMBOL_KEY = "symbol"
DECIMAL_KEY = "decimal"
DEPLOYED_KEY = "deployed"
ANTI_EARLY_WHALE_KEY = "anti_early_whale"
TOTAL_SUPPLY_KEY = "total_supply"
FAKE_TOTAL_SUPPLY_FOR_HOLDER_DIVIDENDS_KEY = "total_supply_for_holder_dividends"
TOTAL_ONG_KEY = "total_ong"
TOTAL_ONG_FOR_KEY_KEY = "total_ong_for_key"
INITIAL_TOKEN_PRICE = "initial_price"
INITIAL_TOKEN_PRICE_INCREMENTAL = "initial_price_incremental"
PRICE_PER_TOKEN_KEY = "price_per_token"
PROFIT_PER_TOKEN_KEY = "profit_per_token"
REFERRAL_STAKE_REQUIREMENT_KEY = "referral_stake_require"

# for the convenience of usage, we will put 10^5 in the storage, decided by initialTokenPriceIncremental_ and  tokenMagnitude_
QUANTITY_INCREASE_PER_PRICE_KEY = "deltaQ_to_deltaP"

_POSITIVE_ = "Y"
_NEGATIVE_ = "N"

# 20000 ONG, when the total ONG balance is smaller than this, manager can buy 200 at maximum
# AntiEarlyWhaleQuota_ = Mul(20000, ongMagnitude_)
AntiEarlyWhaleQuota_ = 20000000000000

# adminQuota_ = Mul(200, ongMagnitude_)
adminQuota_ = 200000000000

# once a manager has bought 50 ong worth token, he cannot buy more before initial stage ends
# managerQuota_ = Mul(50, ongMagnitude_)
managerQuota_ = 50000000000

# once a normal customer has bought 5 ong worth token, he cannot buy more before initial stage ends
# customerQuota_ = Mul(5, ongMagnitude_)
customerQuota_ = 5000000000


def Main(operation, args):
    ################## for players ################
    if operation == "buy":
        if len(args) == 3:
            account = args[0]
            ongAmount = args[1]
            directReferral = args[2]
            return buy(account, ongAmount, directReferral)
        else:
            Notify("buy function should have 2 or 3 parameters")
            return False

    if operation == "reinvest":
        if len(args) == 1:
            account = args[0]
            return reinvest(account)
        else:
            Notify("reinvest function should only have 1 parameter")
            return False

    if operation == "sell":
        if len(args) == 2:
            account = args[0]
            tokenAmount = args[1]
            return sell(account, tokenAmount)
        else:
            Notify("sell function should 2 parameters")
            return False

    if operation == "withdraw":
        if len(args) == 1:
            account = args[0]
            return withdraw(account)
        else:
            Notify("withdraw function should only have 1 parameter")
            return False

    if operation == "exitOut":
        if len(args) == 1:
            account = args[0]
            return exitOut(account)
        else:
            Notify("exitOut function should have 1 parameter")
            return False
    if operation == "collectDividendOf":
        if len(args) == 1:
            addr = args[0]
            return collectDividendOf(addr)
        else:
            Notify("collectDividendOf function should have 1 parameter")
            return False
    ############# for general usage ###############
    if operation == "totalSupply":
        return totalSupply()
    if operation == "fakeTotalSupply":
        return fakeTotalSupply()
    if operation == "totalOngBalance":
        return totalOngBalance()
    if operation == "totalOngForKey":
        return totalOngForKey()
    if operation == "getName":
        return getName()
    if operation == "getSymbol":
        return getSymbol()
    if operation == "getDecimal":
        return getDecimal()
    if operation == "getStakeRequirement":
        return getStakeRequirement()
    if operation == "getPrice":
        return getPrice()
    if operation == "balanceOf":
        if len(args) == 1:
            addr = args[0]
            return balanceOf(addr)
        else:
            Notify("balanceOf function should have 1 parameter")
            return False
    if operation == "ongBalanceOf":
        if len(args) == 1:
            addr = args[0]
            return ongBalanceOf(addr)
        else:
            Notify("ongBalanceOf function should have 1 parameter")
            return False
    if operation == "referralBalanceOf":
        if len(args) == 1:
            addr = args[0]
            return referralBalanceOf(addr)
        else:
            Notify("referralBalanceOf function should have 1 parameter")
            return False
    if operation == "dividendOf":
        if len(args) == 1:
            addr = args[0]
            return dividendOf(addr)
        else:
            Notify(["dividendOf---", len(args)])
            return False
    if operation == "directReferralOf":
        if len(args) == 1:
            addr = args[0]
            return directReferralOf(addr)
        else:
            Notify("directReferralOf function should have 1 parameter")
            return False

    ############# for admin ###############
    if operation == "deploy":
        return deploy()

    if operation == "addManager":
        if len(args) == 2:
            adminAddr = args[0]
            newManagerAddr = args[1]
            return addManager(adminAddr, newManagerAddr)
        else:
            Notify("addManager function should have 2 parameters")
            return False

    if operation == "setStakeRequirement":
        if len(args) == 2:
            admin = args[0]
            stakeRequirement = args[1]
            return setStakeRequirement(admin, stakeRequirement)
        else:
            Notify("setStakeRequirement function should have 2 parameters")
            return False

    if operation == "setName":
        if len(args) == 2:
            admin = args[0]
            name = args[1]
            return setName(admin, name)
        else:
            Notify("setName function should have 2 parameters")
            return False

    if operation == "setSymbol":
        if len(args) == 2:
            admin = args[0]
            symbol = args[1]
            return setSymbol(admin, symbol)
        else:
            Notify("setSymbol function should have 2 parameters")
            return False
    ################ Above needs to be tested ###############

    ################ Below is for Testing ###############
    if operation == "checkAdmin":
        if len(args) == 1:
            addr = args[0]
            return checkAdmin(addr)
        else:
            Notify("checkAdmin function should have 1 parameter")
            return False
    if operation == "checkManager":
        if len(args) == 1:
            addr = args[0]
            return checkManager(addr)
        else:
            Notify("checkManager function should have 1 parameter")
            return False

    if operation == "ongToToken":
        if len(args) == 1:
            _ongAmount = args[0]
            return _ongToToken(_ongAmount)
        else:
            Notify("_ongToToken function should have 1 parameter")
            return False
    if operation == "tokenToOng":
        if len(args) == 1:
            _tokenAmount = args[0]
            return _tokenToOng(_tokenAmount)
        else:
            Notify("_tokenToOng function should have 1 parameter")
            return False

    return False

def deploy():
    """
    can only be deployed once
    :return:
    """
    deployed = Get(GetContext(), DEPLOYED_KEY)

    if deployed != _POSITIVE_:

        # only admin can deploy the contract
        nouse = Require(CheckWitness(admin_))

        # Set admin
        admin_key = concatKey(admin_, ADMIN_SUFFIX)
        Put(GetContext(), admin_key, _POSITIVE_)

        # Set Avalanche Team address

        # Set managers (set as both admin and manager)
        manager1 = ToScriptHash("AQf4Mzu1YJrhz9f3aRkkwSm9n3qhXGSh4p")
        key = concatKey(manager1, MANAGER_SUFFIX)
        Put(GetContext(), key, _POSITIVE_)

        manager2 = ToScriptHash("ASUwFccvYFrrWR6vsZhhNszLFNvCLA5qS6")
        key = concatKey(manager2, MANAGER_SUFFIX)
        Put(GetContext(), key, _POSITIVE_)
        #  can add manager2, 3, 4, 5, 6

        # set name info
        Put(GetContext(), NAME_KEY, initial_name)
        # set symbol info
        Put(GetContext(), SYMBOL_KEY, initial_symbol)
        # set decimal info, decimal_ cannot be changed
        Put(GetContext(), DECIMAL_KEY, decimal_)

        # set Fee info


        # set anti early whale key as true for the early stage
        Put(GetContext(), ANTI_EARLY_WHALE_KEY, _POSITIVE_)
        # initiate totalSupply
        Put(GetContext(), TOTAL_SUPPLY_KEY, 0)
        # initiate fakeTotalSupply
        Put(GetContext(), FAKE_TOTAL_SUPPLY_FOR_HOLDER_DIVIDENDS_KEY, 0)
        # initiate total ONG Balance
        Put(GetContext(), TOTAL_ONG_KEY, 0)

        # initiate initialTokenPrice_ and initialTokenPriceIncremental_
        Put(GetContext(), INITIAL_TOKEN_PRICE, initialTokenPrice_)
        Put(GetContext(), INITIAL_TOKEN_PRICE_INCREMENTAL, initialTokenPriceIncremental_)
        # initiate pricePerToken
        _actualInitialTokenPrice = Sub(initialTokenPrice_, initialTokenPriceIncremental_)
        Put(GetContext(), PRICE_PER_TOKEN_KEY, _actualInitialTokenPrice)
        # initiate profit per token
        Put(GetContext(), PROFIT_PER_TOKEN_KEY, 0)
        # initial team_ info
        Put(GetContext(), concatKey(team_, REFERRAL_BALANCE_SUFFIX), 0)
        # initiate referral requirement
        Put(GetContext(), REFERRAL_STAKE_REQUIREMENT_KEY, referralStakeRequirement_)

        # save the ratio for the convenience of usage
        Put(GetContext(), QUANTITY_INCREASE_PER_PRICE_KEY, Div(tokenMagnitude_, initialTokenPriceIncremental_))

        # Mark the contract has been deployed
        Put(GetContext(), DEPLOYED_KEY, _POSITIVE_)

        Notify(["congrats, admin, you have deployed the contract successfuly"])
    else:
        Notify(["Idiot admin, the contract has already been deployed."])
        return False
    return True

# ========================= Start of check methods ==================================
def checkAdmin(addr):
    """
    To make sure that
    1. the msg.sender is addr
    2. addr_ ADMIN_PREFIX  <-> True : means addr is the admin
    :param addr:
    :return:
    """
    # check if the addr is legal address
    nouse = RequireScriptHash(addr)
    # Make sure the invocation comes from addr
    # Require(CheckWitness(addr) == b'\x01') { code can run passing by Require(True)}
    nouse = Require(CheckWitness(addr))

    key = concatKey(addr, ADMIN_SUFFIX)
    value = Get(GetContext(), key)
    if value == _POSITIVE_:
        Notify("True in checkAdmin ")
        return True
    else:
        Notify("False in checkAdmin ")
        return False

def checkManager(addr):
    """
    To make sure that
    1. the msg.sender is addr
    2. addr_ MANAGER_SUFFIX  <-> True : means addr is one of the managers
    :param addr:
    :return: True or False
    """
    # check if the addr is legal
    nouse = RequireScriptHash(addr)
    # Make sure the invocation comes from addr
    # Require(CheckWitness(addr))
    key = concatKey(addr, MANAGER_SUFFIX)
    value = Get(GetContext(), key)
    if value == _POSITIVE_:
        Notify("True in checkManager ")
        return True
    else:
        Notify("False in checkManager ")
        return False

def checkReferral(addr):
    """
    when addr has more tokens than referralStakeRequirement_, he can have his referral link or code to refer this project to others
    :param addr:
    :return: True or False
    """
    nouse = RequireScriptHash(addr)
    _referralStakeRequirement = Get(GetContext(), REFERRAL_STAKE_REQUIREMENT_KEY)
    if balanceOf(addr) >= referralStakeRequirement_:
        return True
    else:
        return False

# ---------------------- End of check methods ----------------



# ==================== Start of Core methods ========================

def _antiEarlyWhale(_account, _ongAmount):
    """
    :param _account:
    :param _ongAmount:
    :return:
    """
    nouse = Require(CheckWitness(_account))
    _AntiEarlyWhale = Get(GetContext(), ANTI_EARLY_WHALE_KEY)
    # Still in the early stage
    if _AntiEarlyWhale == _POSITIVE_:
        # total ONG is less than 20000
        if totalOngBalance()  <= AntiEarlyWhaleQuota_:
            # if _account is admin, can also use [if checkAdmin(_account):]
            # if Get(GetContext(), concatKey(_account, ADMIN_SUFFIX)) == _POSITIVE_:
            Notify(["111_antiEarlyWhale", checkAdmin(_account) ])
            if checkAdmin(_account) == True:
                key = concatKey(_account, TOKEN_BALANCE_SUFFIX)
                # How many token admin holds
                _adminTokenBalance = Get(GetContext(), key)
                # How many ong do these tokens equal
                _adminBoughtOng = _tokenToOng(_adminTokenBalance)
                Notify(["222_antiEarlyWhale", _adminBoughtOng])
                if Add(_adminBoughtOng, _ongAmount) <= adminQuota_:
                    return True
                else:
                    Notify(["Idiot admin, you cannot buy too many tokens"])
                    return False
            #  _account is manager
            # elif Get(GetContext(), concatKey(_account, MANAGER_SUFFIX)) == _POSITIVE_:
            elif checkManager(_account) == True:
                key = concatKey(_account, TOKEN_BALANCE_SUFFIX)
                # How many token the manager holds
                _managerTokenBalance = Get(GetContext(), key)
                # How many ong do these tokens equal
                _managerBoughtOng = _tokenToOng(_managerTokenBalance)
                if Add(_managerBoughtOng, _ongAmount) <= managerQuota_:
                    return True
                else:
                    Notify(["Big head manager, you cannot buy too many tokens"])
                    return False
            # _account is customer
            else:
                key = concatKey(_account, TOKEN_BALANCE_SUFFIX)
                # How many token the manager holds
                _customerTokenBalance = Get(GetContext(), key)
                # How many ong do these tokens equal
                _customerBoughtOng = _tokenToOng(_customerTokenBalance)
                if Add(_customerBoughtOng, _ongAmount) <= customerQuota_:
                    return True
                else:
                    Notify(["Man, you are too greedy", _account])
                    return False
        else:
            Put(GetContext(), ANTI_EARLY_WHALE_KEY, _NEGATIVE_)
            return True
    return True


def buy(account, ongAmount, directReferral):
    """
    Converts all incoming ong to tokens for the caller,
    pass and save the directReferral and indirectReferral address (if any)
    :param account:
    :param ongAmount:
    :param directReferral: if yes, pass in; if no, pass
    :return: _purchaseTokenAmount
    """
    # make sure account is legal
    nouse = RequireScriptHash(account)
    nouse = Require(CheckWitness(account))
    # account buy tokens for the first time
    if balanceOf(account) == 0 and directReferral != account and directReferralOf(account) == False:
        # directReferral is legal
        if len(directReferral) == 20 and checkReferral(directReferral):
            # record account is referred by directReferral
            key = concatKey(account, REFERREDBY_SUFFIX)
            Put(GetContext(), key, directReferral)
    else:
        # collect the presentdividend to the dividend vault of _account before he buys more tokens
        nouse = collectDividendOf(account)
    Notify("end of buy")
    return _purchaseToken(account, ongAmount)


def reinvest(account):
    """
    Converts all the caller's dividend and referral earnings to tokens
    """
    nouse = Require(CheckWitness(account))
    # put present dividend into dividend vault, update profit per token and dividend vault
    nouse = collectDividendOf(account)
    # add dividend vault and referral balance together to get _dividends
    _dividends = dividendsOf(account)
    # delete referral balance of account
    Delete(GetContext(), concatKey(account, REFERRAL_BALANCE_SUFFIX))
    _reInvestTokenAmount = _purchaseToken(account, _dividends)
    OnReinvest(account, _dividends, _reInvestTokenAmount)
    return _reInvestTokenAmount


def exitOut(_account):
    """
    sell all the tokens and collect the dividend and referral bonus, then withdraw all the money
    :param _account:
    :return: all the ong amount to be withdrawn when exit
    """
    CheckWitness(_account)
    _tokenBalance = balanceOf(_account)
    if _tokenBalance > 0:
        sell(_account, _tokenBalance)

    _accountEarningsToBeWithdrawn = withdraw(_account)
    return _accountEarningsToBeWithdrawn


def withdraw(_account):
    """
    Withdraw all the caller earning including dividends and referral bonus and the ong balance from selling the keys
    :param _account:
    :return: the withdrawn ong amount
    """
    nouse = Require(CheckWitness(_account))
    # put present dividend into dividend vault, update profit per token and dividend vault
    nouse = collectDividendOf(_account)
    # add dividend vault and referral balance together to get _dividends
    _dividends = dividendsOf(_account)
    # _account balance from selling keys
    _ongBalance = ongBalanceOf(_account)
    # add two together as earnings
    _accountEarnings = Add(_dividends, _ongBalance)
    # make sure _account has some earnings
    nouse = Require(_accountEarnings > 0)
    # transfer _dividends ( his ONG ) to _account
    params = state(selfContractAddr_, _account, _accountEarnings)
    res = Invoke(0, ONGContractAddress_, "transfer", [params])
    if res and res == b'\x01':
        # emit event
        OnWithdraw(_account, _accountEarnings)
    else:
        raise Exception("withdraw ong error.")
    # Update dividend
    Delete(GetContext(), concatKey(_account, DIVIDEND_VAULT_SUFFIX))
    # Update referral bonus
    Delete(GetContext(), concatKey(_account, REFERRAL_BALANCE_SUFFIX))
    # # Update ong balance of _account
    # Delete(GetContext(), concatKey(_account, ONG_BALANCE_SUFFIX))

    if balanceOf(_account) > 0:
        # update the _profitPerToken value after the _account withdraw  to count his share till _profitPerToken later
        _profitPerToken = Get(GetContext(), PROFIT_PER_TOKEN_KEY)
        Put(GetContext(), concatKey(_account, PROFIT_PER_TOKEN_AFTER_SUFFIX), _profitPerToken)
    else:
        Delete(GetContext(), concatKey(_account, PROFIT_PER_TOKEN_AFTER_SUFFIX))

    # Update withdrawn earnings ledger
    _newWithdrawnEarnings = Add(withdrawnEarnings(_account), _accountEarnings)
    Put(GetContext(), concatKey(_account, WITHDRAWN_EARNINGS_SUFFIX), _newWithdrawnEarnings)

    # Update ONG balance of this contract (need to be updated only when withdraw() is invoked)
    _totalOngBalance = Sub(totalOngBalance(), _accountEarnings)
    Put(GetContext(), TOTAL_ONG_KEY, _totalOngBalance)

    # Update ONG balance of this contract for key (no need to update since its done within sell method
    # Put(GetContext(), TOTAL_ONG_FOR_KEY_KEY, Add(totalOngForKey(), _ongBalance))

    return _accountEarnings

def sell(_account, _tokenAmount):
    """
    sell the _tokenAmount tokens
    :param _account:
    :param _tokenAmount:
    :return: the ong amount for selling _tokenAmount of tokens
    """

    nouse = Require(CheckWitness(_account))
    # Make sure _account's balance is greater than _tokenAmount that is gonna be sold
    _tokenBalance = balanceOf(_account)
    nouse = Require(_tokenAmount <= _tokenBalance)
    _ongAmount = _tokenToOng(_tokenAmount)

    # referral of the _account
    _directReferral = directReferralOf(_account)

    # _dividends that is used to distribute to all the token holders
    _dividends = 0
    if _directReferral != False:
        # Has referral, the dividend fee will be 14%,
        _dividends = Div(Mul(_ongAmount, dividendFee1_), 100)
    else:
        # No referral, the dividend fee will be 20%,
        _dividends = Div(Mul(_ongAmount, dividendFee0_), 100)
    # _pureOngAmount will be used the income when you sell _tokenAmount of tokens
    _pureOngAmount = Sub(_ongAmount, _dividends)
    Notify(["111_sell", _tokenAmount, _ongAmount, _dividends, _pureOngAmount])
    _oldTotalTokenSupply = totalSupply()
    _newTotalTokenSupply = Sub(_oldTotalTokenSupply, _tokenAmount)
    #  the new total Supply should be less than the old one to avoid underflow
    nouse = Require(_newTotalTokenSupply < _oldTotalTokenSupply)

    # note that manager can earn 25% more in terms of holder share, but his token balance doesn't change
    _oldFakeTotalSupply = fakeTotalSupply()
    _newFakeTotalSupply = 0
    if checkManager(_account):
        _newFakeTotalSupply = Sub(_oldFakeTotalSupply, Div(Mul(_tokenAmount, 125), 100))
    else:
        _newFakeTotalSupply = Sub(_oldFakeTotalSupply, _tokenAmount)
    nouse = Require(_newFakeTotalSupply < _oldFakeTotalSupply)


    # Now let's make actual changes in the ledger
    if  _directReferral != False:
        # calculate the direct referral bonus, 4% of _ongAmount
        _directReferralBonus = Div(Mul(_ongAmount, directReferralFee_), 100)
        #  add the direct referral bonus to the referral balance
        _newDirectReferralBalance = Add(referralBalanceOf(_directReferral), _directReferralBonus)
        Put(GetContext(), concatKey(_directReferral, REFERRAL_BALANCE_SUFFIX), _newDirectReferralBalance)
        # Update the _dividends from _account
        _dividends = Sub(_dividends, _directReferralBonus)
        # get the indirect referral <=> the referral of the referral of the _account
        _indirectReferral = directReferralOf(_directReferral)

        # if _account also has indirect referral,
        if _directReferral != False:
            # calculate the indirect refreral bonus, 1% of _ongAmount
            _indirectReferralBonus = Div(Mul(_ongAmount, indirectReferralFee_), 100)
            # add the indirect referral bonus to the indirect referral balance
            _newIndirectReferralBalance = Add(referralBalanceOf(_indirectReferral), _indirectReferralBonus)
            Put(GetContext(), concatKey(_indirectReferral, REFERRAL_BALANCE_SUFFIX), _newIndirectReferralBalance)
            # Update the _dividends from _account, 9% of _ongAmount
            _dividends = Sub(_dividends, _indirectReferralBonus)
        # if _account has no indirect referral, 10% of _ongAmount will be the final _dividends
    else:
        # This 1% will go to team account
        _team_dividend_part = Div(_ongAmount, 100)
        _newTeamDividendBalance = Add(referralBalanceOf(team_), _team_dividend_part)
        Put(GetContext(), concatKey(team_, REFERRAL_BALANCE_SUFFIX), _newTeamDividendBalance)
        # Update the _dividends, 1% belongs to the team, the left 19% of _ongAmount will go to token holders
        _dividends = Sub(_dividends, _team_dividend_part)
    Notify(["222_sell", _dividends])
    # calculate how many token left for _account
    _tokenLeft = Sub(_tokenBalance, _tokenAmount)

    # _dividends will be distributed to all the token holders, indicated through profitPerToken
    _profitPerToken = Get(GetContext(), PROFIT_PER_TOKEN_KEY)

    _newProfitPerToken = 0
    # if there still exist tokens after _account sells out his tokens
    if _newTotalTokenSupply != 0:
        # multiply _dividends to make it dividable to _oldFakeTotalSupply, we will divide _profitPerToken when we actually use it
        _dividends = Mul(_dividends, largeNumber_)
        # the _account do not have the right to share the _dividends
        _newProfitPerToken = Add(Div(_dividends, _newFakeTotalSupply), _profitPerToken)
        # Update the _profitPerToken
        Put(GetContext(), PROFIT_PER_TOKEN_KEY, _newProfitPerToken)

        # update profit_per_token_after value and token balance of _account
        if _tokenLeft > 0:
            # Update the token balance of _account
            Put(GetContext(), concatKey(_account, TOKEN_BALANCE_SUFFIX), _tokenLeft)

            # put present dividend into dividend vault, update profit per token and dividend vault, should collect after we update _profitPerToken
            nouse = collectDividendOf(_account)
            Notify(["333_sell_collectDividendOf", _tokenLeft, nouse])
            # update the _profitPerToken value after the _account sells in order to count his share till _profitPerToken later
            Put(GetContext(), concatKey(_account, PROFIT_PER_TOKEN_AFTER_SUFFIX), _newProfitPerToken)

        else:
            # if _account sells out all his tokens, make sure profit per token after he sells is 0
            Delete(GetContext(), concatKey(_account, PROFIT_PER_TOKEN_AFTER_SUFFIX))
            Delete(GetContext(), concatKey(_account, TOKEN_BALANCE_SUFFIX))

    else:
        # if the total supply is 0 after _account sells out his tokens, all the sharing dividends will go to team_ referral balance since there are token holders
        # _teamReferralBalance = referralBalanceOf(team_)
        # _newTeamDividendBalance = Add(_teamReferralBalance, _dividends)
        Put(GetContext(), concatKey(team_, REFERRAL_BALANCE_SUFFIX), Add(referralBalanceOf(team_), _dividends))

    # Update the ong balance of _account
    _ongBalanceOfAccount = Add(ongBalanceOf(_account), _pureOngAmount)
    Put(GetContext(), concatKey(_account, ONG_BALANCE_SUFFIX), _ongBalanceOfAccount)

    # Update the totalSupply of token
    Put(GetContext(), TOTAL_SUPPLY_KEY, _newTotalTokenSupply)
    Notify(["444_sell", _newTotalTokenSupply])
    # Update the fakeTotalSupply of token
    Put(GetContext(), FAKE_TOTAL_SUPPLY_FOR_HOLDER_DIVIDENDS_KEY, _newFakeTotalSupply)

    # Update the pricePerToken_
    _pricePerToken = Get(GetContext(), PRICE_PER_TOKEN_KEY)
    _pricePerTokenDecrease = Div(Mul(_tokenAmount, getInitialTokenPriceIncremental()), tokenMagnitude_)
    _newPricePerToken = Sub(_pricePerToken, _pricePerTokenDecrease)
    Put(GetContext(), PRICE_PER_TOKEN_KEY, _newPricePerToken)
    Notify(["444_sell", _pricePerToken, _pricePerTokenDecrease])

    # Update ONG balance of this contract (no need since it need to be updated only when withdraw() is invoked)
    # Put(GetContext(), TOTAL_ONG_KEY, Sub(totalOngBalance(), _ongAmount))

    # Update ONG balance of this contract for key
    _newTotalOngForKey = Sub(totalOngForKey(), _pureOngAmount)
    Put(GetContext(), TOTAL_ONG_FOR_KEY_KEY, _newTotalOngForKey)

    # Broadcast the event
    OnTokenSell(_account, _tokenAmount, _pureOngAmount)

    return _pureOngAmount

def _purchaseToken(_account, _ongAmount):
    """
    :param _account:
    :param _ongAmount:
    :return:
    """
    # avoid early whale
    nouse = Require(CheckWitness(_account))
    nouse = Require(_antiEarlyWhale(_account, _ongAmount))
    # transfer ONG to contract, make sure it is successful
    nouse = Require(transferONG(_account, selfContractAddr_, _ongAmount))


    # referral of the _account
    _directReferral = directReferralOf(_account)
    # _dividends that is used to distribute to all the token holders
    _dividends = 0

    _oldTotalTokenSupply = totalSupply()
    if _oldTotalTokenSupply != 0:
        if _directReferral != False:
            # Has referral, the dividend fee will be 14%,
            _dividends = Div(Mul(_ongAmount, dividendFee1_), 100)
        else:
            # No referral, the dividend fee will be 20%,
            _dividends = Div(Mul(_ongAmount, dividendFee0_), 100)
    # if one person buys token at the first beginning, he can buy tokens with all his ong, which means no _dividends
    else:
        # make sure only admin can buy as the first participant of this project
        nouse = Require(checkAdmin(_account))
        _dividends = 0
    # _pureOngAmount will be used to purchase token
    _pureOngAmount = Sub(_ongAmount, _dividends)
    _purchaseTokenAmount = _ongToToken(_pureOngAmount)

    _newTotalTokenSupply = Add(_oldTotalTokenSupply, _purchaseTokenAmount)
    #  the new total Supply should be greater than the old one to avoid outflow
    nouse = Require(_newTotalTokenSupply > _oldTotalTokenSupply)

    # note that manager can earn 25% more in terms of holder share, but his token balance doesn't change
    _oldFakeTotalSupply = fakeTotalSupply()
    _newFakeTotalSupply = 0
    if checkManager(_account):
        _newFakeTotalSupply = Add(_oldFakeTotalSupply, Div(Mul(_purchaseTokenAmount, 125), 100))
    else:
        _newFakeTotalSupply = Add(_oldFakeTotalSupply, _purchaseTokenAmount)
    nouse = Require(_newFakeTotalSupply > _oldFakeTotalSupply)

    # Now let's make actual changes in the ledger
    if _directReferral != False:
        # calculate the direct referral bonus, 4% of _ongAmount
        _directReferralBonus = Div(Mul(_ongAmount, directReferralFee_), 100)
        #  add the direct referral bonus to the referral balance
        _newDirectReferralBalance = Add(referralBalanceOf(_directReferral), _directReferralBonus)
        Put(GetContext(), concatKey(_directReferral, REFERRAL_BALANCE_SUFFIX), _newDirectReferralBalance)
        # Update the _dividends
        _dividends = Sub(_dividends, _directReferralBonus)
        # get the indirect referral <=> the referral of the referral of the _account
        _indirectReferral = directReferralOf(_directReferral)
        # if _account also has indirect referral,
        if _indirectReferral != False:
            # calculate the indirect refreral bonus, 1% of _ongAmount
            _indirectReferralBonus = Div(Mul(_ongAmount, indirectReferralFee_), 100)
            # add the indirect referral bonus to the indirect referral balance
            _newIndirectReferralBalance = Add(referralBalanceOf(_indirectReferral), _indirectReferralBonus)
            Put(GetContext(), concatKey(_indirectReferral, REFERRAL_BALANCE_SUFFIX), _newIndirectReferralBalance)
            # Update the _dividends, 9% of _ongAmount
            _dividends = Sub(_dividends, _indirectReferralBonus)
        # if _account has no indirect referral, 10% of _ongAmount will be the final _dividends
    #  add condition to avoid the first person who buys tokens to give 1% to team
    elif _oldFakeTotalSupply != 0:
        # This 1% will go to team account
        _team_dividend_part = Div(_ongAmount, 100)
        _newTeamDividendBalance = Add(referralBalanceOf(team_), _team_dividend_part)
        Put(GetContext(), concatKey(team_, REFERRAL_BALANCE_SUFFIX), _newTeamDividendBalance)
        # Update the _dividends, 1% belongs to the team, the left 19% of _ongAmount will go to token holders
        _dividends = Sub(_dividends, _team_dividend_part)

    # _dividends will be distributed to all the token holders, indicated through profitPerToken
    _profitPerToken = Get(GetContext(), PROFIT_PER_TOKEN_KEY)
    # if the buyer is not the first person to buy tokens
    if _oldFakeTotalSupply != 0:
        # multiply _dividends to make it dividable to _oldFakeTotalSupply, we will divide _profitPerToken when we actually use it
        Notify(["111_purchaseToken", _profitPerToken, _dividends])
        _dividends = Mul(_dividends, largeNumber_)
        Notify(["222_purchaseToken", largeNumber_, _dividends])
        Notify(["333_purchaseToken", _oldFakeTotalSupply, Div(_dividends, _oldFakeTotalSupply)])
        # the _account do not have the right to share the _dividends
        _profitPerToken = Add(Div(_dividends, _oldFakeTotalSupply), _profitPerToken)
        Notify(["444_purchaseToken", _profitPerToken])

    # if the buyer is the first person to buy tokens
    else:
        _profitPerToken = Add(Div(_dividends, _newFakeTotalSupply), _profitPerToken)
    # Update the _profitPerToken
    Put(GetContext(), PROFIT_PER_TOKEN_KEY, _profitPerToken)
    # put present dividend into dividend vault, update profit per token and dividend vault
    nouse = collectDividendOf(_account)

    # record the _profitPerToken value after the _account buys in for _account to count his share till _profitPerToken later
    Put(GetContext(), concatKey(_account, PROFIT_PER_TOKEN_AFTER_SUFFIX), _profitPerToken)

    # Update the token balance of _account
    _newTokenBalance = Add(balanceOf(_account), _purchaseTokenAmount)
    Put(GetContext(), concatKey(_account, TOKEN_BALANCE_SUFFIX), _newTokenBalance)
    # Update the totalSupply of token
    Put(GetContext(), TOTAL_SUPPLY_KEY, _newTotalTokenSupply)
    # Update the fakeTotalSupply of token
    Put(GetContext(), FAKE_TOTAL_SUPPLY_FOR_HOLDER_DIVIDENDS_KEY, _newFakeTotalSupply)
    # Update the pricePerToken_
    _pricePerToken = Get(GetContext(), PRICE_PER_TOKEN_KEY)
    _pricePerTokenIncrease = Div(Mul(_purchaseTokenAmount, getInitialTokenPriceIncremental()), tokenMagnitude_)
    _newPricePerToken = Add(_pricePerToken, _pricePerTokenIncrease)
    Put(GetContext(), PRICE_PER_TOKEN_KEY, _newPricePerToken)

    # Update total ONG balance of this contract
    _newTotalOngBalance = Add(totalOngBalance(), _ongAmount)
    Put(GetContext(), TOTAL_ONG_KEY, _newTotalOngBalance)

    # Update ONG balance of this contract for key
    _newTotalOngBalanceForKey = Add(totalOngForKey(), _pureOngAmount)
    Put(GetContext(), TOTAL_ONG_FOR_KEY_KEY, _newTotalOngBalanceForKey)

    # Broadcast the event
    OntTokenPurchase(_account, _ongAmount, _purchaseTokenAmount, _directReferral)

    return _purchaseTokenAmount

def _ongToToken(_ongAmount):
    """
    Internal function to calculate token price based on an amount of incoming ong: M => Q
    a * Q^2 + b * Q + c = 0
    a = 1, b = 180000 * 10^5, c = -2 * 10^9 * 10^5 * M
    Delta = sqrt(b^2 - 4 * a * c)
    :param _ongAmount: say, 0.1 ONG should be 100000000
    :return: tokenAmount, say 1 token should be 10000
    """
    Q = totalSupply()
    M = totalOngForKey()
    M1 = Add(M, _ongAmount)
    # _deltaQToDeltaP = 10^5
    _deltaQToDeltaP = Get(GetContext(), QUANTITY_INCREASE_PER_PRICE_KEY)
    # const = 90000
    const = Sub(getInitialTokenPrice(), getInitialTokenPriceIncremental())
    b = Mul(Mul(2, const), _deltaQToDeltaP)
    # minus_c is a positive value
    minus_c = Mul(Mul(Mul(2, tokenMagnitude_), _deltaQToDeltaP), M1)
    Delta = Sqrt(Add(Pwr(b, 2), Mul(4, minus_c)))
    Q1 = Div(Sub(Delta, b), 2)
    Notify(["111_ongToToken", Q1])
    res = Sub(Q1, Q)
    return res

def _tokenToOng( _tokenAmount):
    """
    internal function to calculate token sell price: Q => M
    M(Q) = [90000 + (Q * 10^(-5) + 90000)] / 2 * Q / 10^9
    :param _tokenAmount: amount of token, say, 1 token should be 10000
    :return: sell price, say, 0.1 ONG should be 100000000
    """
    Q = totalSupply()
    M = totalOngForKey()
    Q1 = Sub(Q, _tokenAmount)
    # _deltaQToDeltaP = 10^5
    _deltaQToDeltaP = Get(GetContext(), QUANTITY_INCREASE_PER_PRICE_KEY)
    # const = 90000
    const = Sub(getInitialTokenPrice(), getInitialTokenPriceIncremental())
    M1 =  Div(Div(Mul(Add(Mul(2, const), Div(Q1, _deltaQToDeltaP)), Q1), tokenMagnitude_), 2)
    res = Sub(M, M1)
    return res

def transferONG(fromacct, toacct, amount):
    """
     transfer ONG
     :param fromacct:
     :param toacct:
     :param amount:
     :return:
     """
    if CheckWitness(fromacct):
        param = state(fromacct, toacct, amount)
        res = Invoke(0, ONGContractAddress_, 'transfer', [param])
        Notify(res)

        if res and res == b'\x01':
            Notify('transfer ong succeed')
            return True
        else:
            Notify('transfer ong failed')

            return False
    else:
        Notify('checkWitness failed')
        return False

# ----------------------- End of Core methods -------------------------


# ======================= Start of methods that only Admin can invoke =============
def addManager(adminAddr, newManagerAddr):
    """
    Add manager, only admin can add new manager
    :param addr: the address that will be added as a new manager
    :return:
    """
    # check if the address is legal
    nouse = RequireScriptHash(adminAddr)
    nouse = RequireScriptHash(newManagerAddr)
    # check if adminAddr is admin
    nouse = Require(checkAdmin(adminAddr))
    key = concatKey(newManagerAddr, MANAGER_SUFFIX)
    Put(GetContext(), key, _POSITIVE_)
    Notify("111111 in addManager")
    if Get(GetContext(), concatKey(newManagerAddr, MANAGER_SUFFIX)) == _POSITIVE_:
        Notify("new Manager added successfuly")
    Notify("2222222 in addManager")
    return True


def setStakeRequirement(admin, _stakeRequirement):
    nouse = Require(checkAdmin(admin))
    Put(GetContext(), REFERRAL_STAKE_REQUIREMENT_KEY, _stakeRequirement)
    Notify(["statingRequirement for vice manager", _stakeRequirement])
    if Get(GetContext(), REFERRAL_STAKE_REQUIREMENT_KEY) == _stakeRequirement:
        Notify("set StakeRequirement successfuly")
    return True

def setName(admin, _name):
    nouse = Require(checkAdmin(admin))
    Put(GetContext(), NAME_KEY, _name)
    return True

def setSymbol(admin, _symbol):
    nouse = Require(checkAdmin(admin))
    Put(GetContext(), SYMBOL_KEY, _symbol)
    return True
def cancelAntiEarlyWhale(admin):
    """
    In case the project doesn't draw much attention, only admin can cannel anti early whale in order to open the
    buy opportunity to everyone
    :param admin:
    :return:
    """
    nouse = Require(checkAdmin(admin))
    Put(GetContext(), ANTI_EARLY_WHALE_KEY, _NEGATIVE_)
    return True

# ------------- End of methods that only Admin can invoke ---------


# ================ Start of general methods that can be pre-invoked by anyone ===========
def totalSupply():
    """
    :return: token supply
    """
    value = Get(GetContext(), TOTAL_SUPPLY_KEY)
    if value:
        return value
    else:
        return 0
    # we can use return Get() since we will initiate the deploy() function first after deploying
    # return Get(GetContext(), TOTAL_SUPPLY_KEY)
def fakeTotalSupply():
    """
    this fake total supply is for the usage of calculating the token holder dividends
    :return:
    """
    value = Get(GetContext(), FAKE_TOTAL_SUPPLY_FOR_HOLDER_DIVIDENDS_KEY)
    if value:
        return value
    else:
        return 0

def totalOngBalance():
    """
    :return: total ong balance of this contract
    """
    value = Get(GetContext(), TOTAL_ONG_KEY)
    if value:
        return value
    else:
        return 0
    # return Invoke(0, ONGContractAddress_, "balanceOf", selfContractAddr_)
def totalOngForKey():

    value = Get(GetContext(), TOTAL_ONG_FOR_KEY_KEY)
    if value:
        return value
    else:
        return 0
def getName():
    return Get(GetContext(), NAME_KEY)
def getSymbol():
    return Get(GetContext(), SYMBOL_KEY)
def getDecimal():
    return Get(GetContext(), DECIMAL_KEY)
def getStakeRequirement():
    return Get(GetContext(), REFERRAL_STAKE_REQUIREMENT_KEY)
def getInitialTokenPrice():
    return Get(GetContext(), INITIAL_TOKEN_PRICE)
def getInitialTokenPriceIncremental():
    return Get(GetContext(), INITIAL_TOKEN_PRICE_INCREMENTAL)
def getPrice():
    return Get(GetContext(), PRICE_PER_TOKEN_KEY)
def balanceOf(addr):
    nouse = RequireScriptHash(addr)
    key = concatKey(addr, TOKEN_BALANCE_SUFFIX)
    value = Get(GetContext(), key)
    if value:
        return value
    else:
        return 0

def ongBalanceOf(addr):
    nouse = RequireScriptHash(addr)
    key = concatKey(addr, ONG_BALANCE_SUFFIX)
    value = Get(GetContext(), key)
    if value:
        return value
    else:
        return 0

def dividendsOf(_account):
    """
    dividends = dividend + referral bonus (if exist)
    :param _account:
    :return:
    """
    nouse = RequireScriptHash(_account)
    # Require(CheckWitness(_account))
    _dividend = dividendOf(_account)
    _referralBonus = referralBalanceOf(_account)
    return Add(_dividend, _referralBonus)

def referralBalanceOf(addr):
    """
    referral bonus of addr
    :param addr: the referal address
    :return: referral bonus earned by addr
    """
    nouse = RequireScriptHash(addr)
    key = concatKey(addr, REFERRAL_BALANCE_SUFFIX)
    value = Get(GetContext(), key)
    if value:
        return value
    else:
        return 0

def withdrawnEarnings(addr):
    """
    To record how much has been withdrawn to addr
    :param addr:
    :return: ong amount of being withdrawn earnings to addr
    """
    nouse = RequireScriptHash(addr)
    key = concatKey(addr, WITHDRAWN_EARNINGS_SUFFIX)
    value = Get(GetContext(), key)
    if value:
        return value
    else:
        return 0

def dividendOf(addr):
    """
    :param addr:
    :return:
    """
    # Require(CheckWitness(addr))
    nouse = RequireScriptHash(addr)
    _dividendValut = Get(GetContext(), concatKey(addr, DIVIDEND_VAULT_SUFFIX))
    Notify(["1111 in dividendOf ", _dividendValut])
    if _dividendValut:
        return _dividendValut
    else:
        return 0

def profitPerTokenAfterOf(addr):
    # before this value, addr cannot share profit, after this value, addr can share the holder dividends
    unsharedProfitPerTokenBefore = Get(GetContext(), concatKey(addr, PROFIT_PER_TOKEN_AFTER_SUFFIX))
    if unsharedProfitPerTokenBefore:
        return unsharedProfitPerTokenBefore
    else:
        return 0

def collectDividendOf(addr):
    """
    put present dividend into dividend vault, update profit per token and dividend vault
    :param addr:
    :return: True means it has been successfully run
    """
    nouse = Require(CheckWitness(addr))
    unsharedProfitPerTokenBefore = profitPerTokenAfterOf(addr)
    _profitPerToken = Get(GetContext(), PROFIT_PER_TOKEN_KEY)
    # if addr is a manager, he will share 25% more of holder dividends
    _unsharedProfitIntervalPerToken = Sub(_profitPerToken, unsharedProfitPerTokenBefore)
    ###
    # _addrTokenBalance = balanceOf(addr)
    # Notify(["1111 in collectDividendOf", _profitPerToken, unsharedProfitPerTokenBefore, _addrTokenBalance])
    ###
    _sharedRawProfitTillNow = 0
    if checkManager(addr):
        _sharedRawProfitTillNow = Mul(_unsharedProfitIntervalPerToken, Div(Mul(balanceOf(addr),125), 100))
    else:
        _sharedRawProfitTillNow = Mul(_unsharedProfitIntervalPerToken, balanceOf(addr))
    # collect the present dividend to dividend vault
    _sharedProfitTillNow = Div(_sharedRawProfitTillNow, largeNumber_)
    _dividendVault = dividendOf(addr)
    _newDividendVault = Add(_dividendVault, _sharedProfitTillNow)
    Put(GetContext(), concatKey(addr, DIVIDEND_VAULT_SUFFIX), _newDividendVault)
    # reset the PROFIT_PER_TOKEN_AFTER_SUFFIX
    Put(GetContext(), concatKey(addr, PROFIT_PER_TOKEN_AFTER_SUFFIX), _profitPerToken)
    # Notify(["2222 in collectDividendOf", _dividendVault, _sharedProfitTillNow, _newDividendVault])

    return _newDividendVault

def directReferralOf(addr):
    """
    Get the direct referral of addr
    :param addr: the referrer
    :return: referraal address if exists, False if it does not exist
    """
    _directReferral = Get(GetContext(), concatKey(addr, REFERREDBY_SUFFIX))
    if len(_directReferral) == 20:
        return _directReferral
    else:
        return False


def concatKey(str1,str2):
    return concat(concat(str1, '_'), str2)
# ---------------- End of general methods that can be pre-invoked by anyone ------------



# =======================Start of defining and emitting event  ===========================
def OntTokenPurchase(_addr, _ongAmount, _tokenAmount, _referredBy):
    params = ["onTokenPurchase", _addr, _ongAmount, _tokenAmount, _referredBy]
    Notify(params)
    return True

def OnWithdraw(_addr, _dividends):
    params = ["onWithdraw", _addr, _dividends]
    Notify(params)
    return True
def Transfer(_from, _to, _amount):
    params = ["transfer", _from, _to, _amount]
    Notify(params)
    return True

def OnTokenSell(_addr, _tokenAmount, _taxedOng):
    params = ["onTokenSell", _addr, _tokenAmount, _taxedOng]
    Notify(params)
    return True

def OnReinvest(_addr, _dividends, _tokenAmount):
    params = ["onReinvest", _addr, _dividends, _tokenAmount]
    Notify(params)
    return True
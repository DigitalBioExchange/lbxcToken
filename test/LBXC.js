const LBXC = artifacts.require("LBXC");


/**
 * <<<1>>>
  * [owner/burner] test
  * 1. 施行 add [owner/burner] 
  * 2. 确认 [owners/burners] 
  * 3. 确认 chkOwnerList / chkBurnerList 
  * 4. 施行 delete [owner/burner] 
  * 5. 确认 [owners/burners] 
  * 6. 确认 chkOwnerList / chkBurnerList 
*/
/**
 * <<<2>>>
 * [approve / allowance ] test
 * 1. 施行 approve 
 * 2. 施行 allowance 
 * 3. 施行 transferFrom 
 */

/**
 * <<<3>>>
 * changeHiddenOwner / changeSuperOwner test
 * 1. 施行 change[Hidden/Super]Owner 
 * 2. 确认 hiddenOwner/superOwner
 
 */

/**
 * <<<4>>> 
 * destroy test
 */

/**
 * <<<5>>>
  * [p2pLocker / p2pUnlocker] test
  *  1. 施行 p2pLocker / p2pUnlocker
  *  2. 确认 p2pAddrs 
*/

/**
 * <<<6>>>
 * [pause / unpause] test
 * 1. 施行 pause 
 * 2. 确认 paused
 * 3. 施行 unpause 
 */


/**
 * <<<8>>> @랍스텐에서 테스트 완료@
 *         @完成Ropsten测试@
 * LINK : https://ropsten.etherscan.io/tx/0xe337bc79beec545e244537ab8b4bf89818cb47932db09de0c1b244a02ae5ad9b
 * [reclaimToken test]
 * 1. 다른 계정에서 해당 컨트랙트 주소로 ERC20의 다른 토큰 전송
 * 2. reclaimToken(해당 ERC20 컨트랙트 주소) 施行
 * 3. superOwner 계정으로 해당 ERC20토큰 전송 되었는지 确认
 * 
 * 1.向其它账号的智能合约地址发送ERC的其它加密货币
 * 2.运行reclaimToken（该ERC20智能合约地址）
 * 3.验证ERC20数字货币否已发送至superOwner帐户
 */

 /**
  * <<<9>>>
  * [openingTime test]
  * 1. setOpeningTime 施行
  * 2. 确认 openingTime 
  * 3. (시간 10일뒤로 변경) 时间变更为10天后
  * 4. setOpeningTime 施行
  * 5. 确认 openingTime 
  */

/**
 * <<<10>>>
  * [blacklist / unblacklist] test 
  * 1. 블랙리스트 施行
  * 2. isPermitted 确认
  * 3. 언블랙리스트 施行
  * 4. isPermitted 确认
*/

/**
 * <<<11>>>
  * [timeLock test]
  * 1. onTimeLock 施行
  * 2. timelock 施行
  * 3. offTimeLock 施行
  * 4. timelock 施行
*/

/**
 * <<<12>>>
  * [transfer test] : paused == false, msg.sender가 블랙리스트가 아닌 경우에만 施行된다. 
  * 1. 타임락 + lockerAddrs[msg.sender] + lockValues[to]가 0보다 큰 경우
  * 2. 타임락 + lockerAddrs[msg.sender] + lockValues[to]가 0인 경우
  * 3. 타임락 + !lockerAddrs[msg.sender] + lockValues[msg.sender] > 0보다 큰 경우 + timeLimit이 0보다 큰 경우
  * 4. 타임락 + !lockerAddrs[msg.sender] + lockValues[msg.sender] > 0보다 큰 경우 + timeLimit이 0인 경우
  * 5. 타임락 + !lockerAddrs[msg.sender] + lockValues[msg.sender] 0인 경우
  * 6. 타임락이 아닌 경우
*/

/**
 * <<<13>>>
  * [transferFrom test] : paused == false, [msg.sender, from]이 블랙리스트가 아닌 경우에만 施行된다. 
  * 1. 타임락 + lockValues[from]가 0보다 큰 경우 + 타임락이 0 인 경우 : 施行 불가
  * 2. 타임락 + lockValues[from]가 0보다 큰 경우 + 타임락이 0 이상인 경우 : (from이 보유한 물량 - 전송하려는 물량) >= (from이 락된 물량 - (락된 물량 / 5) * 달이 지난 횟수) 만족해야함
  * 3. 타임락 + lockValues[from]이 없는 경우
  * 4. 타임락이 아닌 경우
*/

/**
 * <<<14>>>
  * [basic getter function test]
  * 1. decimals 确认
  * 2. getLimitPeriod 确认
  * 3. hiddenOwner 确认
  * 4. superOwner 确认
  * 5. INITIAL_SUPPLY 确认
  * 6. name 确认
  * 7. openingTime 确认
  * 8. paused 确认
  * 9. symbol 确认
  * 10. timelock 确认
  * 11. totalSupply 确认
 */

contract('BASIC TEST [LBXC]', async accounts => {
  
  const timeTravel = function (time) {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc : "2.0",
            method : "evm_increaseTime",
            params : [time], //86,400 is num seconds in day
            id : new Date().getTime()
        }, (err, result) => {
            if (err) { return reject(err)}
            return resolve(result)
        });
    }) 
  };
  
  const BigNumber = web3.BigNumber;
  
  require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

  const [ host1, host2, host3, host4, host5, 
    host6, host7, host8, host9, host10 ] = accounts;

    /**
   * <<<1>>>
    * [owner/burner] test
    * 1. add [owner/burner] 施行
    * 2. [owners/burners] 确认
    * 3. chkOwnerList / chkBurnerList 确认
    * 4. delete [owner/burner] 施行
    * 5. [owners/burners] 确认
    * 6. chkOwnerList / chkBurnerList 确认
  */
  describe('1. [owner / burner] test [Auth : SuperOwner]', () => {

    it("1-1. [owner]", async () => {
      let lbxc = await LBXC.deployed();
      
      let isSuperOwner = await lbxc.superOwner();
      
      assert.equal(isSuperOwner, host1, "host1 is not SuperOwner");
      
      let isOwner = await lbxc.owners(host1);
      
      assert.equal(isOwner, true, 'host1 is not Owner');
      
      await lbxc.addOwner(host2, 0, {from:host1}).should.be.rejected;
      
      await lbxc.addOwner(host2, 1, {from:host1}).should.be.fulfilled;

      isOwner = await lbxc.owners(host2);

      assert.equal(isOwner, true, 'host2 is not Owner');
      
      let chkOwner0 = await lbxc.chkOwnerList(0);

      let chkOwner1 = await lbxc.chkOwnerList(1);

      assert.equal(chkOwner0, host1, "host1 is not defined first owner");

      assert.equal(chkOwner1, host2, "host2 is not defined second owner");

      await lbxc.deleteOwner(host2, 0, {from:host1}).should.be.rejected;
      await lbxc.addOwner(host2, 0, {from:host1}).should.be.rejected;
      await lbxc.addOwner(host2, 1, {from:host1}).should.be.rejected;
      await lbxc.deleteOwner(host2, 1, {from:host1}).should.be.fulfilled;
      await lbxc.addOwner(host2, 1, {from:host1}).should.be.fulfilled;
    })

    it("1-2. [burner]", async () => {
      let lbxc = await LBXC.deployed();
      
      let isSuperOwner = await lbxc.superOwner();
      
      assert.equal(isSuperOwner, host1, "host1 is not SuperOwner");
      
      let isBurner = await lbxc.burners(host1);
      
      assert.equal(isBurner, false, 'host1 is Burner');
      
      await lbxc.addBurner(host1, 0, {from:host1}).should.be.fulfilled;
      
      await lbxc.addBurner(host2, 1, {from:host1}).should.be.fulfilled;

      isBurner = await lbxc.burners(host2);

      assert.equal(isBurner, true, 'host2 is not Burner');
      
      let chkBurner0 = await lbxc.chkBurnerList(0);

      let chkBurner1 = await lbxc.chkBurnerList(1);

      assert.equal(chkBurner0, host1, "host1 is not defined first burner");

      assert.equal(chkBurner1, host2, "host2 is not defined second burner");

      await lbxc.deleteBurner(host2, 0, {from:host1}).should.be.rejected;
      await lbxc.addBurner(host2, 0, {from:host1}).should.be.rejected;
      await lbxc.addBurner(host2, 1, {from:host1}).should.be.rejected;
      await lbxc.deleteBurner(host2, 1, {from:host1}).should.be.fulfilled;
      await lbxc.addBurner(host2, 1, {from:host1}).should.be.fulfilled;
    })
  })
  /**
   * <<<2>>>
   * [approve / allowance ] test
   * 1. approve 施行
   * 2. allowance 施行
   * 3. transferFrom 施行
   */
  describe('2. [approve / allowance] test', () => {
    
    it("2-1. [approve/allowance]", async () => {
      let lbxc = await LBXC.deployed();
      
      let amt1 = 1000000;
      
      await lbxc.approve(host2,amt1,{from:host1});
      
      let getAllowance = await lbxc.allowance(host1,host2);
      
      getAllowance = getAllowance.toNumber();
      
      assert.equal(amt1, getAllowance);
      
      await lbxc.transferFrom(host1,host3,amt1,{from:host2}).should.be.fulfilled;
      
      let hostBalance = await lbxc.balanceOf(host3);
      
      hostBalance = hostBalance.toNumber();

      assert.equal(hostBalance, amt1, 'transferFrom is failed');
      
    }) 
  })

  /**
   * <<<3>>>
   * changeHiddenOwner / changeSuperOwner test
   * 1. change[Hidden/Super]Owner 施行
   * 2. hiddenOwner/superOwner 确认 
   */
  describe('3. [changeHiddenOwner / changeSuperOwner] test [Auth : HiddenOwner]', () => {
    
    it("3-1. [changeHiddenOwner]", async () => {
      let lbxc = await LBXC.deployed();
      let hiddenOwner = await lbxc.hiddenOwner();

      assert.equal(hiddenOwner, host1, "host1 is not hiddenOwner");
      
      await lbxc.changeHiddenOwnership(host2);
      hiddenOwner = await lbxc.hiddenOwner();

      assert.equal(hiddenOwner, host2, "host2 is not hiddenOwner");
      await lbxc.changeHiddenOwnership(host1,{from:host2});
    })

    it("3-2 [changeSuperOwner]", async () => {
      let lbxc = await LBXC.deployed();
      let superOwner = await lbxc.superOwner();

      assert.equal(superOwner, host1, "host1 is not superOwner");

      await lbxc.changeSuperOwnership(host2,{from:host1});
      superOwner = await lbxc.superOwner();

      assert.equal(superOwner, host2, "host2 is not superOwner");
      await lbxc.changeSuperOwnership(host1,{from:host1});
    })
  })
  /**
  * <<<5>>>
  * [p2pLocker / p2pUnlocker] test
  *  1. p2pLocker / p2pUnlocker 施行
  *  2. p2pAddrs 确认
  */
  describe('5. [p2pLocker(Auth:owner) / p2pUnlocker(Auth:superOwner)] test', () => {
    
    it("5-1. [p2pLocker]",async () => {
      let lbxc = await LBXC.deployed();
      let superOwner = await lbxc.superOwner();
      assert.equal(superOwner, host1, "host1 is not superOwner");

      await lbxc.delLocker(host1,0,{from:host3}).should.be.rejected;
      await lbxc.delLocker(host1,0,{from:host1}).should.be.rejected;
      await lbxc.delLocker(host2,0,{from:host1}).should.be.rejected;
      
      let isP2pAddr = await lbxc.lockerAddrs(host1);

      assert.equal(isP2pAddr, false, 'is P2pAddr error');

      isP2pAddr = await lbxc.lockerAddrs(host2);

      assert.equal(isP2pAddr, false, 'is P2pAddr error');
    })

    it("5-2. [p2pUnlocker]",async () => {
      let lbxc = await LBXC.deployed();
      let superOwner = await lbxc.superOwner();
      assert.equal(superOwner, host1, "host1 is not superOwner");
      
      await lbxc.addLocker(host1,0,{from:host2}).should.be.rejected;
      await lbxc.addLocker(host2,0,{from:host1}).should.be.fulfilled;
      isP2pAddr = await lbxc.lockerAddrs(host2);

      assert.equal(isP2pAddr, true, 'is P2pAddr error');
    })
  })
  /**
   * <<<6>>>
   * [pause / unpause] test
   * 1. pause 施行
   * 2. paused 确认
   * 3. unpause 施行 
   */
  describe('6. [pause / unpause] test [Auth : superOwner]', () => {
    
    it('6-2 [pause]', async() => {
      let amt1 = 1000000;
      let lbxc = await LBXC.deployed();
      let paused = await lbxc.paused()
      
      assert.equal(paused, false, "paused is true");
      
      await lbxc.transfer(host2, amt1, {from: host1}).should.be.fulfilled;     
      await lbxc.pause({from:host1});
      await lbxc.deleteOwner(host1,0,{from:host1});
      await lbxc.transfer(host2, amt1, {from: host1}).should.be.rejected;
      await lbxc.addOwner(host1,0,{from:host1});
    })

    it('6-3 [unpause]', async() => {
      let lbxc = await LBXC.deployed();
      let amt1 = 1000000;
      let paused = await lbxc.paused();
      
      assert.equal(paused, true, "paused is false");
   
      await lbxc.unpause({from:host1});
      await lbxc.transfer(host2, amt1, {from: host1}).should.be.fulfilled;
    })
  })

  /**
  * <<<9>>>
  * [openingTime test]
  * 1. setOpeningTime 施行
  * 2. openingTime 确认
  * 3. (시간 10일뒤로 변경)
  * 4. setOpeningTime 施行
  * 5. openingTime 确认
  */
  describe('9. [openingTime] test [Auth : superOwner]', () => {

    it('9-1 [auth check]', async() => {
      let lbxc = await LBXC.deployed(); 
      let isSuperOwner = await lbxc.superOwner();
      assert.equal(isSuperOwner, host1, 'host1 is not superOwner');
      let paused = await lbxc.paused();
      assert.equal(paused, false, "paused check");
      await lbxc.unpause({from:host3}).should.be.rejected;
      await lbxc.unpause({from:host1}).should.be.rejected;        
    })

    it('9-2 [openingTime]', async() => {
      let lbxc = await LBXC.deployed();
      
      let openingTime = await lbxc.openingTime();
      let monthInSeconds = 2.6784e+6;
      
      openingTime = openingTime.toNumber();
      console.log('      9) current Time : ', openingTime);  
      
      timeTravel(monthInSeconds);

      await lbxc.setOpeningTime();
      
      openingTime = await lbxc.openingTime();
      openingTime = openingTime.toNumber();
      
      console.log('      9) changed Time : ', openingTime);  
    })
  })
/**
 * <<<10>>>
  * [blacklist / unblacklist] test 
  * 1. blacklist 施行
  * 2. isPermitted 确认
  * 3. unblacklist 施行
  * 4. isPermitted 确认
*/
  describe('10. [blacklist(Auth:owner) / unblacklist(Auth:superOwner)] test', () => {
    
    it('10-1 [auth & blacklist check]', async() => {
      let lbxc = await LBXC.deployed(); 
      let isSuperOwner = await lbxc.superOwner();
      let isOwner = await lbxc.owners(host2);

      assert.equal(isSuperOwner, host1, 'host1 is not superOwner');
      assert.equal(isOwner, true, 'host2 is not owner');
      
      let isPermitted = await lbxc.isPermitted(host3);
      
      assert.equal(isPermitted, true, 'host3 is not blacklisted')
      
      await lbxc.blacklist(host3, {from:host2}).should.be.fulfilled;
    
      isPermitted = await lbxc.isPermitted(host3);
      assert.equal(isPermitted, false, 'host3 is blacklisted')
    })

    it('10-2 [unblacklist check]', async () => {
      let lbxc = await LBXC.deployed();
      await lbxc.unblacklist(host3, {from:host2}).should.be.rejected;
      
      let isPermitted  = await lbxc.isPermitted(host3);
      assert.equal(isPermitted, false, 'host3 is blacklsited')
      
      await lbxc.unblacklist(host3, {from:host1}).should.be.fulfilled;
      
      isPermitted  = await lbxc.isPermitted(host3);
      assert.equal(isPermitted, true, 'host3 is not blacklsited');  
    })
  })
/**
 * <<<11>>>
  * [timeLock test]
  * 1. onTimeLock 施行
  * 2. timelock 施行
  * 3. offTimeLock 施行
  * 4. timelock 施行
*/
  describe('11. [timelock] test [Auth : SuperOwner]', () => {
    it('11-1 [timelock]', async() => {
      let lbxc = await LBXC.deployed();
      let isTimeLock = await lbxc.timelock();
      assert.equal(isTimeLock, false, "timelocked ?");

      await lbxc.onTimeLock({from:host2}).should.be.rejected;
      await lbxc.onTimeLock({from:host1}).should.be.fulfilled;
      
      isTimeLock = await lbxc.timelock();
      assert.equal(isTimeLock, true, "not timelocked ");
    })
  })
/**
 * <<<12>>>
  * [transfer test] : paused == false, msg.sender가 블랙리스트가 아닌 경우에만 施行된다. 
  * 1. 타임락 + p2pAddrs[msg.sender] + lockValues[to]가 0보다 큰 경우
  * 2. 타임락 + p2pAddrs[msg.sender] + lockValues[to]가 0인 경우
  * 3. 타임락 + !p2pAddrs[msg.sender] + lockValues[msg.sender] > 0보다 큰 경우 + timeLimit이 0보다 큰 경우
  * 4. 타임락 + !p2pAddrs[msg.sender] + lockValues[msg.sender] > 0보다 큰 경우 + timeLimit이 0인 경우
  * 5. 타임락 + !p2pAddrs[msg.sender] + lockValues[msg.sender] 0인 경우
  * 6. 타임락이 아닌 경우
  * 
  * [transfer test] : paused== false，仅在[msg.sender]未被列入黑名单时执行。
  * 1. 时间锁定 + p2pAddrs[msg.sender] + lockValues[to] 大于0的情况
  * 2. 时间锁定 + p2pAddrs[msg.sender] + lockValues[to] 为0的情况
  * 3. 时间锁定 + !p2pAddrs[msg.sender] + lockValues[to] 大于0 + timeLimit 大于0的情况 
  * 4. 时间锁定 + !p2pAddrs[msg.sender] + lockValues[to] 大于0 + timeLimit 为0的情况
  * 5. 时间锁定 + !p2pAddrs[msg.sender] + lockValues[to] 为0的情况
  * 6. 时间锁定不存在的情况
*/
  describe('12. [transfer] test ', () => {
    
    it('12-1 [transfer setting]', async() => {
      let lbxc = await LBXC.deployed();
      let paused = await lbxc.paused();
      
      await lbxc.setOpeningTime({from:host1});
      
      assert.equal(paused, false, "is paused");
      
      let isP2pAddr = await lbxc.lockerAddrs(host2);

      assert.equal(isP2pAddr, true, 'is not p2pAddr');
      
      let balance = await lbxc.balanceOf(host2)
      balance = balance.toNumber();
      
      assert.equal(2000000, balance, `host2's balance check`);
    })

    it('12-2 [transfer case 1, 2) ] ', async() => {
      let lbxc = await LBXC.deployed();
      let amt1 = 1000000;
      let amt3 = 3000000;
      let chkBalance = await lbxc.balanceOf(host3);
      chkBalance = chkBalance.toNumber();
      
      let lockValue = await lbxc.lockValues(host3);
      assert.equal(0, lockValue, 'has lockValue');
      
      await lbxc.transfer(host3,amt1,{from:host2});
      lockValue = await lbxc.lockValues(host3);
      lockValue = lockValue.toNumber();
      
      assert.equal(amt1, lockValue, 'has lockValue');
      await lbxc.transfer(host3,amt1,{from:host2});
      
      lockValue = await lbxc.lockValues(host3);
      lockValue = lockValue.toNumber();
      assert.equal(amt1, lockValue, 'has lockValue');


      //host3 Balance = amt3 / lockValue = amt1
      let balance = await lbxc.balanceOf(host3);
      balance = balance.toNumber();
      assert.equal(amt3, balance, 'is not same balance');
      
    })
    
    it('12-3 [transfer case 3, 4) ] ', async() => {
      let lbxc = await LBXC.deployed();
      let amt00 = 2400000;
      
      let monthInSeconds = 2.6784e+6;

      let getLimit = await lbxc.getLimitPeriod();
      getLimit = getLimit.toNumber();
      assert.equal(getLimit, 1, 'get Limit check')
      //host3 lockvalue = 1000000
      await lbxc.transfer(host1,amt00,{from:host3}).should.be.rejected;
      
      timeTravel(monthInSeconds);
      
      getLimit = await lbxc.getLimitPeriod();
      getLimit = getLimit.toNumber();
      assert.equal(getLimit, 2, 'get Limit check')
      
      await lbxc.transfer(host1,amt00,{from:host3}).should.be.fulfilled;
    })

    it('12-4 [transfer case 5) ] ', async() => {
      let lbxc = await LBXC.deployed();
      let amt1 = 1000000;
      let amt2 = 2000000;
      let amt3 = 3000000;
      
      let isP2pAddr = await lbxc.lockerAddrs(host4);
      
      assert.equal(isP2pAddr, false,  'host4 is p2pAddr');

      await lbxc.transfer(host4, amt3, {from:host1});
      let balance = await lbxc.balanceOf(host4)
      balance = balance.toNumber();
      
      assert.equal(amt3, balance , 'balanace Check');

      await lbxc.transfer(host1, balance, {from:host4}).should.be.fulfilled;

      balance = await lbxc.balanceOf(host4)
      balance = balance.toNumber();
      
      assert.equal(0, balance , 'balanace Check');
    })

    it('12-5 [transfer case 6) ] ', async() => {
      let lbxc = await LBXC.deployed();
      let host3_halfBalance = 400000;
      
      await lbxc.transfer(host1, host3_halfBalance, {from: host3}).should.be.rejected;
      
      let isTimelocked = await lbxc.timelock();
      
      assert.equal(isTimelocked, true, 'is not Timeloked');
      
      await lbxc.offTimeLock({from:host2}).should.be.rejected;
      await lbxc.offTimeLock({from:host1}).should.be.fulfilled;

      await lbxc.transfer(host1, host3_halfBalance, {from: host3}).should.be.fulfilled;
      
    })
  })
  /**
 * <<<13>>>
  * [transferFrom test] : paused == false, [msg.sender, from]이 블랙리스트가 아닌 경우에만 施行된다. 
  * 1. 타임락 + lockValues[from]가 0보다 큰 경우 + 타임락이 0 인 경우 : 施行 불가
  * 2. 타임락 + lockValues[from]가 0보다 큰 경우 + 타임락이 0 이상인 경우 : (from이 보유한 물량 - 전송하려는 물량) >= (from이 락된 물량 - (락된 물량 / 5) * 달이 지난 횟수) 만족해야함
  * 3. 타임락 + lockValues[from]이 없는 경우 
  * 4. 타임락이 아닌 경우
*/
  describe('13. [transferFrom] test ', () => {
    it('13-1. [transferFrom] setting', async() => {
      
      let amt4 = 10000000;

      let lbxc = await LBXC.deployed();
      
      await lbxc.transfer(host2,amt4,{from:host1}).should.be.fulfilled;

      let paused = await lbxc.paused();
      assert.equal(paused, false, "paused check")

      let isTimelock = await lbxc.timelock();
      assert.equal(isTimelock, false, "isTimelock check");
      
      let isP2p = await lbxc.lockerAddrs(host2);
      assert.equal(isP2p, true, 'isP2p check');
      
      await lbxc.setOpeningTime({from:host1});
      await lbxc.onTimeLock();
      
      isTimelock = await lbxc.timelock();
      assert.equal(isTimelock, true, "isTimelock check");

      let balance = await lbxc.balanceOf(host2);
      
      balance = balance.toNumber();
      assert.equal(amt4, balance, 'balance check');
      balance = await lbxc.balanceOf(host6);
      balance = balance.toNumber();
      assert.equal(0, balance, 'balance check');
      
      await lbxc.transfer(host6,amt4,{from:host2}).should.be.fulfilled;
      let getPeriod = await lbxc.getLimitPeriod();

      assert.equal(getPeriod, 1, 'period check');
      //host6 - lockValue = amt4
      let lockValue = await lbxc.lockValues(host6);

      assert.equal(lockValue,amt4, 'lockValue check');
    }) 
    
    it('13-2. [transferFrom] case 1,2)', async() => {
      let amt0 = 1000000;
      let amt1 = 2000000;
      let amt2 = 3000000;
      let amt3 = 5000000;
      let amt4 = 10000000;
      let lbxc = await LBXC.deployed();
      let monthInSeconds = 2.6784e+6;

      await lbxc.approve(host7, amt3, {from:host6}).should.be.fulfilled;
      
      let allowance = await lbxc.allowance(host6, host7);
      //host6 lockValue = amt4 
      //transferFrom으로 5만까지 가능하나, 현재 getLimit이 1이므로
      //2만까지 transferFrom으로 전송 가능하다.
      //使用TransferFrom最多可发送5万个，但目前getLimit为1，因此使用transferFrom最多可发送2万个。
      assert.equal(allowance , amt3, "allowance check");
      //case 1
      await lbxc.transferFrom(host6,host8,amt2, {from:host7}).should.be.rejected;
      timeTravel(monthInSeconds);
      
      await lbxc.transferFrom(host6,host8,amt2, {from:host7}).should.be.fulfilled;
      //case 2
      await lbxc.transferFrom(host6,host8,amt1, {from:host7}).should.be.rejected;
      await lbxc.transferFrom(host6,host8,amt1, {from:host7}).should.be.rejected;
      await lbxc.transferFrom(host6,host8,amt0, {from:host7}).should.be.fulfilled;
    })

    it('13-3. [transferFrom] case 3,4)', async() => {
      let amt0 = 4000000;
      let amt1 = 10000000
      let amt2 = 3000000;
      let lbxc = await LBXC.deployed();
      
      await lbxc.offTimeLock();
      
      isTimelock = await lbxc.timelock();
      assert.equal(isTimelock, false, "isTimelock check");
      
      //case 3
      await lbxc.transfer(host9,amt1,{from:host1}).should.be.fulfilled;

      let balance = await lbxc.balanceOf(host9);
      balance = balance.toNumber();
      assert.equal(balance, amt1, 'balance check');
      
      let lockValue = await lbxc.lockValues(host9);
      assert.equal(lockValue, 0, 'lockValue check');

      await lbxc.approve(host7,amt1, {from:host9}).should.be.fulfilled;
      await lbxc.transferFrom(host9, host8, amt1, {from:host7}).should.be.fulfilled;
      balance = await lbxc.balanceOf(host8);
      balance = balance.toNumber();
      assert.equal(balance, amt0+amt1, 'balanceCheck');      
      //case 4

      await lbxc.transferFrom(host6,host8,amt2, {from:host7}).should.be.rejected;
      
      balance = await lbxc.balanceOf(host8);
      balance = balance.toNumber();
      assert.equal(balance, amt0+amt1, 'balanceCheck');      
    })
  })  

  /**
 * <<<14>>>
  * [basic getter function test]
  * 1. decimals 确认
  * 2. INITIAL_SUPPLY 确认
  * 3. name 确认
  * 4. symbol 确认
 */
  describe('14. [basic getter function] test ', async()=> {
    it('14-1. basic getter', async() => {  
      let lbxc = await LBXC.deployed(); 
      let decimal = await lbxc.decimals();
      assert.equal(decimal,18, 'decimal check');

      let INITIAL_SUPPLY = await lbxc.INITIAL_SUPPLY();
      INITIAL_SUPPLY = INITIAL_SUPPLY.toString();
      assert.equal(INITIAL_SUPPLY,'10000000000000000000000000000', 'initialBal check');

      let name = await lbxc.name();
      assert.equal(name,'LUXBIO CELL', 'name check');

      let symbol = await lbxc.symbol();
      assert.equal(symbol, 'LBXC', 'symbol check');
    })  
  })
});
const LBXC = artifacts.require("LBXC");

//1달이 지나지 않았을 때, 토큰 출금.
contract('TIMELOCK TEST [LBXC]', async accounts => {
  
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
        
      describe('1. transfer setting', () => {
        //transfer setting 
        it("1", async() => {
            let lbxc = await LBXC.deployed();
            let monthInSeconds = 2.6784e+6;
            let amt0 = 1000000;
            let amt1 = 500000;
            let amt2 = 100000;

            await lbxc.addLocker(host2,0,{from:host1}).should.be.fulfilled;
            await lbxc.transfer(host2, amt0, {from:host1});
            await lbxc.setOpeningTime({from:host1});
            await lbxc.onTimeLock({from:host1}).should.be.fulfilled;
            await lbxc.transfer(host3, amt1, {from:host2});
            
            let lockValue = await lbxc.lockValues(host3);

            lockValue = lockValue.toNumber();
            
            assert.equal(amt1, lockValue, '1. lockValue error');
            
            await lbxc.transfer(host2,amt2,{from:host3}).should.be.fulfilled;
            await lbxc.transfer(host2,1,{from:host3}).should.be.rejected;
            await lbxc.transfer(host2,amt2,{from:host3}).should.be.rejected;
            
            timeTravel(monthInSeconds);
            
            await lbxc.transfer(host2,amt2,{from:host3}).should.be.fulfilled;
            await lbxc.transfer(host2,1,{from:host3}).should.be.rejected;
            await lbxc.offTimeLock({from:host1}).should.be.fulfilled;
            await lbxc.transfer(host2,1,{from:host3}).should.be.fulfilled;
            await lbxc.onTimeLock({from:host1}).should.be.fulfilled;
            await lbxc.transfer(host2,1,{from:host3}).should.be.rejected;
        })
        
        
    })
    
})
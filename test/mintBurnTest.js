const LBXC = artifacts.require("LBXC");

contract('MINT&BURN TEST[LBXC]', async accounts => {
    
    const BigNumber = web3.BigNumber;

    require('chai')
      .use(require('chai-as-promised'))
      .use(require('chai-bignumber')(BigNumber))
      .should();
  
    
    const [ host1, host2, host3, host4, host5, 
      host6, host7, host8, host9, host10 ] = accounts;
    
    describe('1. burn', () => {
        it("1. burn test", async() => {
            
            let lbxc = await LBXC.deployed();
            let amt1 = 10000000;
            let totalSupply = await lbxc.totalSupply();
            
            totalSupply = totalSupply.toString()
            
            assert.equal(totalSupply,'10000000000000000000000000000', 'initialBalance1 check');
            
            //added burner host2 from host1
            await lbxc.addBurner(host2, 0, {from:host1}).should.be.fulfilled;
            
            await lbxc.addBurnlist(host1, {from:host1}).should.be.fulfilled;
            await lbxc.addBurnlist(host1, {from:host2}).should.be.rejected;
            
            await lbxc.burn(host1, amt1,{from:host1}).should.be.rejected;
            await lbxc.burn(host1, amt1,{from:host2}).should.be.fulfilled;

            totalSupply = await lbxc.totalSupply();
            totalSupply = totalSupply.toString();
            assert.equal(totalSupply,'9999999999999999999990000000', 'initialBalance2 check');
        })
    })
    describe('1. mint', () => {
        it("1. mint test", async() => {
            
            let lbxc = await LBXC.deployed();
            let amt1 = 10000000;
            let totalSupply = await lbxc.totalSupply();
            
            totalSupply = totalSupply.toString()
            
            assert.equal(totalSupply,'9999999999999999999990000000', 'initialBalance1 check');
            
            await lbxc.mint(amt1, {from:host2}).should.be.rejected;
            
            await lbxc.mint(amt1, {from:host1}).should.be.fulfilled;
            

            totalSupply = await lbxc.totalSupply();
            totalSupply = totalSupply.toString();
            assert.equal(totalSupply,'10000000000000000000000000000', 'initialBalance2 check');

            await lbxc.mint(amt1, {from:host1}).should.be.rejected;

        })
    })
})
var OrthodonticToken = artifacts.require("OrthodonticToken");

// Please set ganache-cli as this "ganache-cli -l 800000000 console" to raise MAX Gas limitation.
contract("OrthodonticToken", function(accounts) {
  // first to check initial state of the token name
  it("should be token name", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      return myContract.name();
    }).then(function(result) {
      assert.equal(result, "OrthodonticToken", "name was not correctly set.")
    });
  });



  // next let's check the balance of owner(account[0])
  it("should be token initial supply", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      return myContract.balances(accounts[0]);
    }).then(function(result) {
      assert.equal(result.toString(10), "10000000000000000000000", "Initial supply was not correctly set.")
    });
  });

  // next let's check the balance of accounts[1]
  it("should be 0", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      return myContract.balances(accounts[1]);
    }).then(function(result) {
      assert.equal(result.toString(10), "0", "'balances' mapping was not correctly set.")
    });
  });

  // next let's transgfer token to accounts[1] then check the balance of accounts[0]
  it("should be subtracted token amount", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      myContract.transfer(accounts[1], 100000000000, {from: accounts[0], gas: 1000000});
      return myContract.balances(accounts[0])
    }).then(function(balance){
      assert.equal(balance.toString(10), "9999999999900000000000", "transfer was not correctly defined.")
    });
  });

  // next let's check the balance of accounts[1]
  it("should be transferred amount", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      return myContract.balances(accounts[1])
    }).then(function(balance){
      assert.equal(balance.toString(10), "100000000000", "transfer was not correctly defined.")
    });
  });

  // next let's 'approve' some amount of token from accounts[0] to accounts[1]
  it("should be 'approved' amount of transferred amount", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      myContract.approve(accounts[1], 8888888, {from: accounts[0], gas: 1000000});
      return myContract.allowed(accounts[0], accounts[1]);
    }).then(function(_amount){
      assert.equal(_amount.toString(10), 8888888, "transfer was not correctly defined.")
    });
  });

  // next let's check 'allowance'
  it("should be allowance from accounts[0] to accounts[1]", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      myContract.approve(accounts[1], 8888888, {from: accounts[0], gas: 1000000});
      return myContract.allowance(accounts[0], accounts[1]);
    }).then(function(_amount){
      assert.equal(_amount.toString(10), 8888888, "transfer was not correctly defined.")
    });
  });

  // now let's check 'transferFrom'
  it("should be subtracted from accounts[0]", function() {
    return OrthodonticToken.deployed().then(function(instance) {
      var myContract = instance;
      myContract.transferFrom(accounts[0], accounts[1], 8888888, {from: accounts[1], gas: 1000000});
      return myContract.balances(accounts[1]);
    }).then(function(_amount){
      assert.equal(_amount.toString(10), 100008888888, "transfer was not correctly defined.")
    });
  });

});

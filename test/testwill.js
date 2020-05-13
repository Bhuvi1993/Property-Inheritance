const WillDigitalAsset = artifacts.require("WillDigitalAsset");

contract('WillDigitalAsset', (accounts) => {

// Checking the balance of the Lawyer
  it('should put 1000000 WillCoin in the Lawyer account', async () => {
    const willCoinInstance = await WillDigitalAsset.deployed();
    const balances = await willCoinInstance.getBalance.call(accounts[0]);
    assert.equal(balances.valueOf(), 1000000, "1000000 wasn't in the Lawyner account");
  });

// Setting the family members and checking it
  it('should set Family Members', async () => {
    const willCoinInstance = await WillDigitalAsset.deployed();
    await willCoinInstance.setFamily(accounts[0],10,"Ram","Raj");
    const Familydetails = await willCoinInstance.getFamilyMembers(accounts[0]);
    // console.log(accounts[0]);
    // console.log(Familydetails[0]);
    // assert.equal(Familydetails.address, accounts[0]);
    assert.equal(Familydetails[0].words[0],10,"Value added should be 10");
    assert.equal(Familydetails[1], "Ram", "First Name should be Ram");
    assert.equal(Familydetails[2], "Raj", "Last Name should be Raj");
    
  });

  // Setting the family members and checking it by giving false details

  it('should set right family members', async () => {
    const willCoinInstance = await WillDigitalAsset.deployed();
    await willCoinInstance.setFamily(accounts[0],10,"Ram","Raj");
    const Familydetails = await willCoinInstance.getFamilyMembers(accounts[0]);
    // console.log(accounts[0]);
    // console.log(Familydetails[0]);
    // assert.equal(Familydetails.address, accounts[0]);
    assert.notEqual(Familydetails[0].words[0],20,"Value added should not be 20");
    assert.notEqual(Familydetails[1], "Ravi", "First Name should not be Ravi");
    assert.notEqual(Familydetails[2], "Raja", "Last Name should not be Raja");
    
  });

 // Sending willCoin in correct proportion and checking the balance

  it('should send willcoin to family members in correct proportion', async () => {
    const willCoinInstance = await WillDigitalAsset.deployed(accounts[0]);
    const LawyerBal = await willCoinInstance.getBalance.call(accounts[0]);
    console.log("Lawyer Balance "+LawyerBal);

   await willCoinInstance.setFamily(accounts[1],300000,"Ram","Raj");
   await willCoinInstance.setFamily(accounts[2],300000,"Naveen","Raj");
   await willCoinInstance.setFamily(accounts[3],400000,"Shilpa","Raj");

   const family1 = await willCoinInstance.getFamilyMembers(accounts[1]);
   const family2 = await willCoinInstance.getFamilyMembers(accounts[2]);
   const family3 = await willCoinInstance.getFamilyMembers(accounts[3]);

  console.log(family1[0].words[0]);
  console.log(family2[0].words[0]);
  console.log(family3[0].words[0]);

   const familybalance1 = await willCoinInstance.getBalance.call(accounts[1]);
   const familybalance2 = await willCoinInstance.getBalance.call(accounts[2]);
   const familybalance3 = await willCoinInstance.getBalance.call(accounts[3]);
   
   console.log("family 1 initial balance "+familybalance1);
   console.log("family 2 initial balance "+familybalance2);
   console.log("family 3 initial balance "+familybalance3);
   assert.equal(familybalance1, 0, "Ram Family will have Zero Share");
   assert.equal(familybalance2, 0, "Naveen Family will have Zero Share");
   assert.equal(familybalance3, 0, "Shilpa Family will have Zero Share");

   await willCoinInstance.releaseFamilyToken();
 

   const familybalancerel1 = await willCoinInstance.getBalance.call(accounts[1]);
   const familybalancerel2 = await willCoinInstance.getBalance.call(accounts[2]);
   const familybalancerel3 = await willCoinInstance.getBalance.call(accounts[3]);
   
   console.log("family 1 after release balance "+familybalancerel1);
   console.log("family 2 after release balance "+familybalancerel2);
   console.log("family 3 after release balance "+familybalancerel3);

   assert.equal(familybalancerel1, 300000, "Ram Family Should have 300000 Coin Share");
   assert.equal(familybalancerel2, 300000, "Naveen Family will have 300000 Coin Share");
   assert.equal(familybalancerel3, 400000, "Shilpa Family will have 400000 coin Share");

  });

  //  Sending willCoin between family members and checking it

  it('should Transfer Willcoin between family or other members correctly', async () => {
    const willCoinInstance = await WillDigitalAsset.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[1];
    const accountTwo = accounts[2];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await willCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await willCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await willCoinInstance.transfer(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await willCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await willCoinInstance.getBalance.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount was correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount was correctly sent to the receiver");
  });

  // Checking the balance of the Lawyer by giving false value
  
  it('should put 1000000 WillCoin in the Lawyer account', async () => {
    const willCoinInstance = await WillDigitalAsset.deployed();
    const balances = await willCoinInstance.getBalance.call(accounts[0]);
    assert.notEqual(balances.valueOf(), 100000, "1000000 wasn't in the Lawyner account");
  });
  
  });



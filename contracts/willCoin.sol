pragma solidity ^0.5.6;

contract WillDigitalAsset {
    string public symbol = "WC";
    string public name = "WillCoin";
    uint public totalSupply = 1000000;
    // uint8 public decimals = 18;
    address public Lawyer;
    bool isOwnerDead;
    // key-value pair to store addresses and their account balances

    mapping (address => uint) public balances;

    constructor() payable public {
        Lawyer = msg.sender;
        balances[Lawyer] = totalSupply;
        isOwnerDead = false;
    }
    modifier onlyLawyer() {
        require(msg.sender == Lawyer, "Only Lawyer should call this function");
        _;
    }
    // Creating a struct for family FamilyMembers
    struct FamilyMem {
        uint amount;
        string fName;
        string lName;
    }
    mapping (address => FamilyMem) FamilyMembers;
    address[] private familyAddressDetails;

    function setFamily(address _address, uint _amount, string memory _fName, string memory _lName) public onlyLawyer {
            FamilyMem storage Familydetails = FamilyMembers[_address];
            Familydetails.amount = _amount;
            Familydetails.fName = _fName;
            Familydetails.lName = _lName;
            familyAddressDetails.push(_address) - 1;
    }

     //  function to get familyaddress

    function getFamilyAddress() public view returns(address[] memory) {
        return familyAddressDetails;
    }

    // function to get FamilyMembers

    function getFamilyMembers(address _address) public view  returns (uint, string memory, string memory) {
        return (FamilyMembers[_address].amount, FamilyMembers[_address].fName, FamilyMembers[_address].lName);
    }

    // function to get familyCount
    function countFamilyAddressDetails() public view  returns (uint) {
        return familyAddressDetails.length;
    }
    function getBalance(address addr) public view returns(uint) {
        return balances[addr];
    }
    // Transfer the balance from owner's account to another account
    function transfer(address _to, uint _amount) public returns (bool success) {
        if (balances[msg.sender] >= _amount && _amount > 0 && balances[_to] + _amount > balances[_to]) {
            balances[msg.sender] -= _amount;
            balances[_to] += _amount;
            return true;
        } else {
            return false;
        }
    }
    //  Function to transfer if not Alive
     function releaseFamilyToken() public payable onlyLawyer  returns (bool) {
         isOwnerDead = true;
        uint numberOfAddress = familyAddressDetails.length;
        for (uint i = 0; i < numberOfAddress; i ++) {
            transfer(familyAddressDetails[i], FamilyMembers[familyAddressDetails[i]].amount);
        }
    }
  //the token seller will determine price of each token
    //buyer will transfer that money and get all the tokens
    function buyToken(uint _amount, address _seller)  public payable {
        uint pricePerToken = 2;
       require(msg.sender!=Lawyer,"Lawyer should not call this function");
        require(msg.value == _amount * pricePerToken * 1 finney, "Value of the token"); //make sure it is in finny
        balances[_seller] -= _amount; //reduce tokens from that seller
        balances[msg.sender] += _amount; //increase token to buyer
    }
    function sellTokenInCash(uint _amount, address _buyer)  public {
        require(msg.sender!=Lawyer,"Lawyer should not call this function");
        balances[msg.sender] -= _amount; //reduce tokens from that seller
        balances[_buyer] += _amount;//increase token to buyer

    }
     //  fallback function
    function() external  {
        // fallback function
    }
}
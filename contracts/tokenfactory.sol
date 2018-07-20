pragma solidity ^0.4.23;

import "./Token.sol";

contract TokenFactory {
  mapping(address => address[]) created;

  function createToken(string _name, string _symbol, uint8 _decimals, uint256 _initialAmount) public returns(address){
    Token newToken = new Token(_name, _symbol, _decimals, _initialAmount);
	created[msg.sender].push(address(newToken));
	newToken.transfer(msg.sender, _initialAmount);
	return address(newToken);
  }
}

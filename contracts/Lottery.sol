pragma solidity ^0.4.17;

contract Lottery {
    address public manager;     // manager wallet address
    address[] public players;   // players array
    
    function Lottery() public {
        manager = msg.sender;   // msg global variable
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);     // min amount of ether required
        
        players.push(msg.sender);
    }
    
    function random() private view returns(uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);     // returns address, generally an object, balance that current contract holds
        players = new address[](0);     // new dynamic address with initial length 0
    }
    
    modifier restricted() {
        require(msg.sender == manager);     // for validating manager
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
}
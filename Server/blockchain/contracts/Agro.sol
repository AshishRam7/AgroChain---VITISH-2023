// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract agro{
    address owner;
    uint256 id = 1000;
    constructor(){
        owner = msg.sender;
    }
    struct item{
        uint256 id;
        address item_owner;
        address[] pending_address;
        string[] names;
        string[] places;
        uint16 qty;
        uint16 price;
        uint16[] inflation;
        string product_name;
        address[] verified_address;
        
        uint256 timestamp;

    }
    mapping(uint256 => item) items;
    function initiate_order(address[] memory pending_addressp,uint16 qtyp,uint16 pricep,uint16[] memory inflationp,string memory product_namep,address[] memory verified_addressp,string[] memory placep,string[] memory namep) public{
        id=id+1;
        item memory tempitem = item({
            id:id,
            item_owner: msg.sender,
            pending_address:pending_addressp,
            places: placep,
            names:namep,
            qty:qtyp,
            price:pricep,
            inflation:inflationp,
            product_name:product_namep,
            verified_address: verified_addressp,
            timestamp: block.timestamp
        });
        items[id]=tempitem;
    }
    function getid() public view returns(uint256){
        return id+1;

    }
    function get_order(uint256 idp) external view returns(item memory){
        require(items[idp].id!=0,"no such order was initated");
        return items[idp];
    }
    function get_index(address a,uint256 idp) public view returns (uint16) {
        for(uint16 i=0;i<items[idp].pending_address.length;i++){
            if(items[idp].pending_address[i]==a){
                return i;
            }
        }
        return 0;
    }
    function to_verify(address user_address, uint256 idp,uint16 new_inflation) public{
        require(items[idp].id!=0,"no such order was initated");
        for(uint256 i=0;i<items[idp].pending_address.length;i++){
            if(items[idp].pending_address[i]==user_address){
                delete items[idp].pending_address[i];
                items[idp].verified_address.push(user_address);

            }
        }
        items[idp].price = new_inflation;


    }
    //function add(uint256 idp)public view returns(uint){
      //  uint256 temp =items[idp].price +(items[idp].price *(items[idp].inflation));
        //return temp;
    //}

}




let bag_item=JSON.parse(localStorage.getItem('bag-item'))||[]
displayitem()
displaybagcount();
function additem(itemid){
    bag_item.push(itemid);
    localStorage.setItem('bag-item',JSON.stringify(bag_item));
    displaybagcount();
}

function displaybagcount(){
    let bagitemcount=document.querySelector('.bag-items-count');
    if (bag_item.length>0){
    bagitemcount.innerText= bag_item.length;
    bagitemcount.style.visibility='visible';
}
    else
    bagitemcount.innerText= bagitemcount.style.visibility='hidden';
}
function displayitem(){
let containeritemselement= document.querySelector('.items-container');
if (!containeritemselement) {
    return;
}
let itemshtml=``;
for(let i=0;i<items.length;i++){
itemshtml+=`<div class="item-container">
                <img class="item-img" src=${items[i].image} alt="Item-Img">
                <div class="ratings">${items[i].rating.stars}⭐| ${items[i].rating.count}</div>
                <div class="company-name">${items[i].company}</div>
                <div class="item-name">${items[i].item_name}</div>
                <div class="price">
                    <span class="discounted-price">Rs ${items[i].current_price}</span>
                    <span class="original-price">Rs ${items[i].original_price}</span>
                    <span class="Discount">${items[i].discount_percentage}% OFF</span>
                </div>
                <button class="add-bag-btn" onclick="additem(${items[i].id})">Add to Bag</button>
            </div>`};
containeritemselement.innerHTML=itemshtml;}
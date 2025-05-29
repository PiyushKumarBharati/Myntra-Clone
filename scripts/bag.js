function onload(){
    loadbagitems();
    displayBagItem();
    displaySummaryItem();
}
let bagitemobjects;
function loadbagitems(){
    bagitemobjects= bag_item.map(itemId=>{
        for(let i=0;i<items.length;i++){
            if (itemId==items[i].id){
                return items[i];
            }
        }
    })
    console.log(bagitemobjects);
}

onload();
function removebagitem(item){
    bag_item=bag_item.filter(element => element!=item);
    localStorage.setItem('bag-item',JSON.stringify(bag_item));
    loadbagitems();
    displayBagItem();
    displaybagcount();
    displaySummaryItem();
}
function displayBagItem(){
    let bagitem=document.querySelector('.bag-items-container')
    bagitem.innerHTML=``;
    for(let i=0;i<bagitemobjects.length;i++){
    bagitem.innerHTML+=itemgenerator(bagitemobjects[i]); }
}
function itemgenerator(item){
    return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removebagitem(${item.id})">X</div>
          </div>`
}
function displaySummaryItem(){
    let summaryitem=document.querySelector('.bag-summary')
    summaryitem.innerHTML=``;
    if(bagitemobjects.length==0){
        return;
    }
    summaryitem.innerHTML=summarygenerator(bagitemobjects);
}
function summarygenerator(item){let originalprice=0;
    let totaldiscount=0;
    let finalprice=0;
     for(let i=0;i<item.length;i++){
        originalprice+=item[i].original_price;
        finalprice+=item[i].current_price;
    }
    totaldiscount=originalprice-finalprice;
       return `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${item.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${originalprice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totaldiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalprice+99}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>
`
}
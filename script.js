
let price = 19.5;
let cid = [["PENNY", 0.01], 
["NICKEL", 0], 
["DIME", 0], 
["QUARTER", 0], 
["ONE", 0], 
["FIVE", 0], 
["TEN", 0], 
["TWENTY", 0], 
["ONE HUNDRED", 0]]

const purchaseBtn = document.getElementById("purchase-btn");
const cidContainer = document.getElementById("cash-in-drawer");
const changeContainer = document.getElementById("change-due");
const priceContainer = document.getElementById("price");
priceContainer.innerHTML = `Total: ${price}`;

function cashInDrawer() {
  cid.forEach(element => { 
      cidContainer.innerHTML += `<p>${element[0]}: $${element[1]}</p>`
  });
}
cashInDrawer();

const countMoneyInDrawer = (moneyInDrawer) => {
  let totalMoneyInDrawer = 0;
  moneyInDrawer.forEach((money) => {
    totalMoneyInDrawer = totalMoneyInDrawer + parseFloat(money[1]);
  });
  return totalMoneyInDrawer;
};

function countChange(change) {
  let moneyInDrawer = cid;
  let currentChangeCount = 0;
  let changeCash = ""; 
  let hundredBill = ["HUNDRED", 0];
  let twentyBill = ["TWENTY", 0];
  let tenBill = ["TEN", 0];
  let fiveBill = ["FIVE", 0];
  let oneBill = ["ONE", 0];
  let quarterCoin = ["QUARTER", 0];
  let dimeCoin = ["DIME", 0];
  let nickelCoin = ["NICKEL", 0];
  let pennyCoin = ["PENNY", 0];

  while (currentChangeCount < change) {
     let missingChange = (change - currentChangeCount).toFixed([2]);
     

     if (missingChange >= 100 && moneyInDrawer[8][1] > 0) {
       moneyInDrawer[8][1] = (moneyInDrawer[8][1] - 100).toFixed(2);
       currentChangeCount += 100;
       hundredBill[1] += 100;
     } else if (missingChange >= 20 && moneyInDrawer[7][1] > 0) {
       moneyInDrawer[7][1] = (moneyInDrawer[7][1] - 20).toFixed(2);
       currentChangeCount += 20;
       twentyBill[1] += 20;
    } else if (missingChange >= 10 && moneyInDrawer[6][1] > 0) {
       moneyInDrawer[6][1] = (moneyInDrawer[6][1] - 10).toFixed(2);
       currentChangeCount += 10;
       tenBill[1] += 10;
     } else if (missingChange >= 5 && moneyInDrawer[5][1] > 0) {
       moneyInDrawer[5][1] = (moneyInDrawer[5][1] - 5).toFixed(2);
       currentChangeCount += 5;
       fiveBill[1] += 5;
     } else if (missingChange >= 1 && moneyInDrawer[4][1] > 0) {
       moneyInDrawer[4][1] = (moneyInDrawer[4][1] - 1).toFixed(2);
       currentChangeCount += 1;
       oneBill[1] += 1;
     } else if (missingChange >= 0.25 && moneyInDrawer[3][1] > 0) {
       moneyInDrawer[3][1] = (moneyInDrawer[3][1] - 0.25).toFixed(2);
       currentChangeCount += 0.25;
       quarterCoin[1] += 0.25;
     } else if (missingChange >= 0.10 && moneyInDrawer[2][1] > 0) {
       moneyInDrawer[2][1] = (moneyInDrawer[2][1] - 0.1).toFixed(2);
       currentChangeCount += 0.10;
       dimeCoin[1] += 0.10;

     } else if (missingChange >= 0.05 && moneyInDrawer[1][1] > 0) {
       moneyInDrawer[1][1] = (moneyInDrawer[1][1] - 0.05).toFixed(2);
       currentChangeCount += 0.05;
       nickelCoin[1] += 0.05;

     } else if (missingChange >= 0.01 && moneyInDrawer[0][1] > 0) {
        moneyInDrawer[0][1] = (moneyInDrawer[0][1] - 0.01).toFixed(2);
        currentChangeCount += 0.01;
        pennyCoin[1] += 0.01;
     }
  }

  if (hundredBill[1] > 0) {
    changeCash += `HUNDRED: $${hundredBill[1]}\n`;
  } 
  if (twentyBill[1] > 0) {
    changeCash += `TWENTY: $${twentyBill[1]}\n`;
  }
  if (tenBill[1] > 0) {
    changeCash += `TEN: $${tenBill[1]}\n`;
  }
  if (fiveBill[1] > 0) {
    changeCash += `FIVE: $${fiveBill[1]}\n`;
  }
  if (oneBill[1] > 0) {
    changeCash += `ONE: $${oneBill[1]}\n`;
  }
  if (quarterCoin[1] > 0) {
    changeCash += `QUARTER: $${quarterCoin[1]}\n`;
  }
  if (dimeCoin[1] > 0) {
    changeCash += `DIME: $${dimeCoin[1]}\n`;
  }
  if (nickelCoin[1] > 0) {
    changeCash += `NICKEL: $${nickelCoin[1]}\n`;
  }
  if (pennyCoin[1] > 0) {
    changeCash += `PENNY: $${pennyCoin[1]}\n`;
  }

  
  return changeContainer.innerHTML = changeCash;
  
}


purchaseBtn.addEventListener("click", (e) => {
  let totalMoneyInDrawer = countMoneyInDrawer(cid);
  const cash = parseFloat(document.getElementById("cash").value).toFixed([2]);
  let change = Number((cash - price).toFixed([2]));

  if(cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (change > totalMoneyInDrawer) {
    changeContainer.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return
  } else if (change == totalMoneyInDrawer) {
    changeContainer.innerHTML = "Status: CLOSED";
    return;
  } else if (cash == price) {
    changeContainer.innerHTML = "No change due - customer paid with exact cash";
  } else {
    countChange(change);
  }

  cidContainer.innerHTML = "";
  cid.forEach((element) => {
    cidContainer.innerHTML += `<p>${element[0]}: $${element[1]}</p>`;
  });

});
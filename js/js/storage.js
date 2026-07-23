// =========================================
// HOTEL SUBHAKSHAM POS
// storage.js
// =========================================

const STORAGE_KEY = "hotel_subhaksham_bills";

// Save Bill
function saveBill() {

    const bills = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const bill = {

        billNo: document.getElementById("billNo").textContent,

        date: document.getElementById("billDate").textContent,

        time: document.getElementById("billTime").textContent,

        customer: document.getElementById("customerName").value,

        phone: document.getElementById("customerPhone").value,

        payment: document.getElementById("paymentMode").value,

        table: document.getElementById("tableNo").value,

        billType: document.getElementById("billType").value,

        items: getBillItems(),

        total: getBillTotal()

    };

    bills.push(bill);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(bills)
    );

}

// Get Bills
function getBills() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

// Delete Bill
function deleteBill(index){

    const bills=getBills();

    bills.splice(index,1);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(bills)
    );

}

// Clear History
function clearHistory(){

    if(confirm("Delete all bills?")){

        localStorage.removeItem(STORAGE_KEY);

        loadBillHistory();

    }

}
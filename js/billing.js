// ==========================================
// HOTEL SUBHAKSHAM POS
// billing.js - Part 1 (Final)
// ==========================================

let billItems = {};

const GST_PERCENTAGE = 0;

function addItem(item) {

    if (billItems[item.name]) {

        billItems[item.name].qty++;

    } else {

        billItems[item.name] = {

            name: item.name,
            price: Number(item.price),
            qty: 1

        };

    }

    renderBill();

}

function renderBill() {

    const tbody = document.getElementById("billBody");

    tbody.innerHTML = "";

    let subtotal = 0;

    Object.values(billItems).forEach(item => {

        const total = item.qty * item.price;

        subtotal += total;

        const row = document.createElement("tr");

        row.innerHTML = `

        <td>${item.name}</td>

        <td>

            <button class="qty-btn"
            onclick="decreaseQty('${item.name}')">-</button>

            <strong>${item.qty}</strong>

            <button class="qty-btn"
            onclick="increaseQty('${item.name}')">+</button>

        </td>

        <td>₹${item.price.toFixed(2)}</td>

        <td>₹${total.toFixed(2)}</td>

        <td>

            <button
                class="delete-btn"
                onclick="removeItem('${item.name}')">

                🗑

            </button>

        </td>

        `;

        tbody.appendChild(row);

    });

    updateTotals(subtotal);

}

function increaseQty(name){

    if(!billItems[name]) return;

    billItems[name].qty++;

    renderBill();

}

function decreaseQty(name){

    if(!billItems[name]) return;

    billItems[name].qty--;

    if(billItems[name].qty<=0){

        delete billItems[name];

    }

    renderBill();

}

function removeItem(name){

    delete billItems[name];

    renderBill();

}

// ==========================================
// HOTEL SUBHAKSHAM POS
// billing.js - Part 2 (Final)
// ==========================================

function updateTotals(subtotal) {

    const discountInput = document.getElementById("discount");

    let discount = 0;

    if (discountInput) {

        discount = Number(discountInput.value) || 0;

    }

    if (discount > subtotal) {

        discount = subtotal;

        if (discountInput) {
            discountInput.value = subtotal;
        }

    }

    const taxableAmount = subtotal - discount;

    const gst = (taxableAmount * GST_PERCENTAGE) / 100;

    const grandTotal = taxableAmount + gst;

    document.getElementById("subTotal").textContent =
        "₹" + subtotal.toFixed(2);

    document.getElementById("gst").textContent =
        "₹" + gst.toFixed(2);

    document.getElementById("grandTotal").textContent =
        "₹" + grandTotal.toFixed(2);

}

// ==========================================
// Discount Auto Update
// ==========================================

const discountBox = document.getElementById("discount");

if (discountBox) {

    discountBox.addEventListener("input", () => {

        let subtotal = 0;

        Object.values(billItems).forEach(item => {

            subtotal += item.qty * item.price;

        });

        updateTotals(subtotal);

    });

}

// ==========================================
// Clear Bill
// ==========================================

function clearBill() {

    billItems = {};

    document.getElementById("billBody").innerHTML = "";

    if (discountBox) {

        discountBox.value = 0;

    }

    updateTotals(0);

}

// ==========================================
// New Bill
// ==========================================

const newBillButton = document.getElementById("newBillBtn");

if (newBillButton) {

    newBillButton.addEventListener("click", () => {

        if (confirm("Start New Bill?")) {

            clearBill();

        }

    });

}

// ==========================================
// Helper Functions
// ==========================================

function getBillItems() {

    return Object.values(billItems);

}

function getBillTotal() {

    let total = 0;

    Object.values(billItems).forEach(item => {

        total += item.qty * item.price;

    });

    return total;

}

// ==========================================
// Print Placeholder
// ==========================================

function printBill() {

    alert("Printer module will be added next.");

}
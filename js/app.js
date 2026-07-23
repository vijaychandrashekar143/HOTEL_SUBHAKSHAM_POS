// ===============================
// HOTEL SUBHAKSHAM POS
// App Initialization
// ===============================

let billNumber = localStorage.getItem("billNumber");

if (!billNumber) {
    billNumber = 1001;
}

document.getElementById("billNo").textContent = billNumber;

function updateDateTime() {

    const now = new Date();

    document.getElementById("billDate").textContent =
        now.toLocaleDateString("en-IN");

    document.getElementById("billTime").textContent =
        now.toLocaleTimeString("en-IN");

}

updateDateTime();

setInterval(updateDateTime,1000);

// ===============================
// Load Menu
// ===============================

let menuData = [];

async function loadMenu() {

    const response = await fetch("data/menu.json");

    menuData = await response.json();

    loadCategories();

    displayMenu(menuData);

}

function loadCategories() {

    const categories = [...new Set(menuData.map(item => item.category))];

    const container = document.getElementById("categoryContainer");

    container.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.className = "category-btn";
    allBtn.onclick = () => displayMenu(menuData);

    container.appendChild(allBtn);

    categories.forEach(category => {

        const btn = document.createElement("button");

        btn.textContent = category;

        btn.className = "category-btn";

        btn.onclick = () => {

            displayMenu(menuData.filter(item => item.category === category));

        };

        container.appendChild(btn);

    });

}

function displayMenu(items) {

    const container = document.getElementById("menuContainer");

    container.innerHTML = "";

    items.forEach(item => {

        container.innerHTML += `
            <div class="menu-card">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
        `;

    });

}

loadMenu();
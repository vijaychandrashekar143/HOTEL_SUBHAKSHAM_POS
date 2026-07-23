// ==========================================
// HOTEL SUBHAKSHAM POS
// app.js
// ==========================================

let menuData = [];
let currentCategory = "All";

const billNoElement = document.getElementById("billNo");
const billDateElement = document.getElementById("billDate");
const billTimeElement = document.getElementById("billTime");

const menuContainer = document.getElementById("menuContainer");
const categoryContainer = document.getElementById("categoryContainer");
const searchBox = document.getElementById("searchBox");

// ==========================================
// Date & Time
// ==========================================

function updateDateTime() {

    const now = new Date();

    billDateElement.textContent = now.toLocaleDateString("en-IN");

    billTimeElement.textContent = now.toLocaleTimeString("en-IN");

}

setInterval(updateDateTime,1000);

updateDateTime();

// ==========================================
// Bill Number
// ==========================================

let billNumber = Number(localStorage.getItem("billNumber") || 1001);

billNoElement.textContent = billNumber;

// ==========================================
// Load Menu
// ==========================================

async function loadMenu(){

    try{

        const response = await fetch("data/menu.json");

        menuData = await response.json();

        loadCategories();

        displayMenu(menuData);

    }

    catch(error){

        console.error(error);

        menuContainer.innerHTML =
        "<h2 style='color:red'>Unable to load menu.json</h2>";

    }

}

// ==========================================
// Categories
// ==========================================

function loadCategories(){

    categoryContainer.innerHTML="";

    const allButton=document.createElement("button");

    allButton.innerText="All";

    allButton.onclick=()=>{

        currentCategory="All";

        filterMenu();

    };

    categoryContainer.appendChild(allButton);

    const categories=[...new Set(menuData.map(item=>item.category))];

    categories.forEach(category=>{

        const btn=document.createElement("button");

        btn.innerText=category;

        btn.onclick=()=>{

            currentCategory=category;

            filterMenu();

        };

        categoryContainer.appendChild(btn);

    });

}

// ==========================================
// Display Menu
// ==========================================

function displayMenu(items){

    menuContainer.innerHTML="";

    items.forEach(item=>{

        const card=document.createElement("div");

        card.className="menu-card";

        card.innerHTML=`

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

        `;

        card.onclick=()=>{

            addItem(item);

        };

        menuContainer.appendChild(card);

    });

}

// ==========================================
// Search
// ==========================================

searchBox.addEventListener("keyup",filterMenu);

function filterMenu(){

    const text=searchBox.value.toLowerCase();

    let filtered=menuData;

    if(currentCategory!="All"){

        filtered=filtered.filter(item=>item.category===currentCategory);

    }

    if(text!=""){

        filtered=filtered.filter(item=>

            item.name.toLowerCase().includes(text)

        );

    }

    displayMenu(filtered);

}

// ==========================================
// New Bill
// ==========================================

document.getElementById("newBillBtn").addEventListener("click",()=>{

    if(confirm("Start New Bill?")){

        billItems={};

        renderBill();

        billNumber++;

        localStorage.setItem("billNumber",billNumber);

        billNoElement.textContent=billNumber;

        document.getElementById("tableNo").value="";

        document.getElementById("billType").selectedIndex=0;

    }

});

// ==========================================
// Print
// ==========================================

document.getElementById("printBtn").addEventListener("click",()=>{

    printBill();

});

// ==========================================

loadMenu();
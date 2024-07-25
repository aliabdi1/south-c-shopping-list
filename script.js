// Initialize shopping list array
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// DOM elements
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const shoppingListEl = document.getElementById('shoppingList');

// Function to render the shopping list
function renderList() {
    shoppingListEl.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        if (item.purchased) {
            li.classList.add('purchased');
        }
        li.addEventListener('click', () => togglePurchased(index));
        
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editItem(index);
        });

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteItem(index);
        });

        shoppingListEl.appendChild(li);
    });
    saveToLocalStorage();
}

// Function to add a new item
function addItem() {
    const newItem = itemInput.value.trim();
    if (newItem) {
        shoppingList.push({ name: newItem, purchased: false });
        itemInput.value = '';
        renderList();
    }
}

// Function to toggle purchased state
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
}

// Function to edit an item
function editItem(index) {
    const li = shoppingListEl.children[index];
    const span = li.querySelector('span');
    const currentText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('edit-input');

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('edit-btn');

    li.innerHTML = '';
    li.appendChild(input);
    li.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
        const newText = input.value.trim();
        if (newText) {
            shoppingList[index].name = newText;
            renderList();
        }
    });

    input.focus();
}

// Function to delete an item
function deleteItem(index) {
    shoppingList.splice(index, 1);
    renderList();
}

// Function to clear the list
function clearList() {
    shoppingList = [];
    renderList();
}

// Function to save to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listeners
addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Initial render
renderList();

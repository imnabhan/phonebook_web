// Retrieve contacts from localStorage
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Function to update the contacts table
function updateContactsTable(contacts) {
    const contactsTable = document.getElementById('contacts-table');
    contactsTable.innerHTML = '';

    contacts.forEach(contact => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = contact.name;
        row.appendChild(nameCell);

        const genderCell = document.createElement('td');
        genderCell.textContent = contact.gender;
        row.appendChild(genderCell);

        const telephoneCell = document.createElement('td');
        telephoneCell.textContent = contact.telephone;
        row.appendChild(telephoneCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = contact.email;
        row.appendChild(emailCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editContact(contact));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteContact(contact));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        contactsTable.appendChild(row);
    });
}

// Function to add a new contact
function addContact() {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;

    const newContact = { name, gender, telephone, email };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    updateContactsTable(contacts);
    clearInputFields();
}

// Function to delete a contact
function deleteContact(contact) {
    contacts = contacts.filter(c => c.telephone !== contact.telephone);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    updateContactsTable(contacts);
}

// Function to search contacts
function searchContacts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchInput) ||
        contact.telephone.includes(searchInput) ||
        contact.email.toLowerCase().includes(searchInput)
    );
    updateContactsTable(filteredContacts);
}

// Function to update a contact
let selectedContact = null;

function updateContact() {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;

    if (selectedContact !== null) {
        selectedContact.name = name;
        selectedContact.gender = gender;
        selectedContact.telephone = telephone;
        selectedContact.email = email;

        const updatedContacts = contacts.map(contact => {
            if (contact.telephone === selectedContact.telephone) {
                return selectedContact;
            }
            return contact;
        });
        contacts = updatedContacts;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        updateContactsTable(contacts);
        clearInputFields();
        selectedContact = null;
    }
}

function editContact(contact) {
    selectedContact = contact;
    document.getElementById('name').value = contact.name;
    document.getElementById('gender').value = contact.gender;
    document.getElementById('telephone').value = contact.telephone;
    document.getElementById('email').value = contact.email;
}

// Event listeners
document.getElementById('add-btn').addEventListener('click', addContact);
document.getElementById('search-btn').addEventListener('click', searchContacts);
document.getElementById('update-btn').addEventListener('click', updateContact);

// Initialize the contacts table
updateContactsTable(contacts);

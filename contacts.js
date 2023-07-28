const path = require('path');
const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const { isUtf8 } = require('buffer');
const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async() => {
    const data = await fs.readFile(contactsPath, isUtf8);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const contactsId = contacts.filter(contact => contact.id === contactId)
    return contactsId;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const id = contacts.findIndex(({ id }) => id === contactId);
    const deleteContact = contacts.splice(id, 1);
    try {
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return deleteContact;
    } catch (error) {
        console.error(error);
    }
};

const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContacts = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContacts);
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContacts;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}


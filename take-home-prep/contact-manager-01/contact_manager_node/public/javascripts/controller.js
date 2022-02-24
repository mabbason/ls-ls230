
class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view,

    this.contactsChanged();

    this.model.bindContactsChanged(this.contactsChanged.bind(this));
    this.view.bindAddContact(this.handleAddContact.bind(this));
    // this.view.bindAddContact(this.handleAddContact.bind(this)),
    // this.view.bindEditContact(this.handleEditContact.bind(this)),
    // this.view.bindDeleteContact(this.handleDeleteContact.bind(this))
  }

  contactsChanged() {
    let contacts = this.model.getContacts();
    contacts.then(contacts => {
      this.view.renderContactsList(contacts);
    });
  }

  handleAddContact(newContactInfo) {
    this.model.addContact(newContactInfo);
  }

  handleEditContact(updatedInfo) {
    this.model.editContact(updatedInfo);
  }

  handleDeleteContact(id) {
    this.model.deleteContact(id);
  }
}

export default Controller;
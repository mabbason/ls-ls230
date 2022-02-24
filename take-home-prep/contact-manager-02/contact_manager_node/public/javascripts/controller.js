
class Controller {
  constructor(model, view) {
    this.model = model,
    this.view = view,
    
    this.model.bindContactsChanged(this.handleRenderHomeView.bind(this)),
    this.view.bindMainClickHandlers(this.handleDeleteContact.bind(this),
                               this.getContactToEdit.bind(this),
                               this.handleRenderHomeView.bind(this),
                               this.handleAddContact.bind(this),
                               this.handleEditContact.bind(this)),
    this.view.bindSearchInput(this.handleSearchInput.bind(this)),
    this.handleRenderHomeView()
  }

  #filterContacts(search, contacts) {
    contacts = contacts.filter(contact => {
        if (search.startsWith('#')) {
        let searchTag = search.slice(1);
        return this.#tagsContainSearch(contact.tags, searchTag);
      } else {
        return contact.full_name.toLowerCase().includes(search);
      }

    });
    return contacts;
  }

  // #nameContainsSearch(first, last, search) {
  //   return first.includes(search) || last.includes(search);
  // }

  #tagsContainSearch(tagsArr, search) {
    if (!tagsArr) return false;
    return tagsArr.filter(tagObj => tagObj.tag.includes(search)).length > 0;
  }

  async handleRenderHomeView() {
    let contacts = this.model.contacts || await this.model.getContacts();
    this.view.renderHomeView(contacts);
  }

  handleSearchInput(searchStr) {
    // let contacts = this.model.contacts || await this.model.getContacts();
    let contacts = this.model.contacts;
    if (searchStr.length > 0 && searchStr !== '#') {
      searchStr = searchStr.toLowerCase();
      contacts = this.#filterContacts(searchStr, contacts);
    }
    this.view.renderHomeView(contacts, searchStr);
  }

  handleCreateContact(formData) {
    this.model.createContact(formData);
  }

  handleAddContact(formData) {
    this.model.createContact(formData);
  }

  handleEditContact(formData) {
    this.model.editContact(formData);
  }

  handleDeleteContact(id) {
    this.model.deleteContact(id);
  }

  getContactToEdit(id) {
    let contact = this.model.contacts.find(contact => contact.id === Number(id));
    contact = this.model.formatContactForExternal(contact);
    this.view.renderEditContactForm(contact, this.handleEditContact.bind(this));
  }
}

export default Controller;
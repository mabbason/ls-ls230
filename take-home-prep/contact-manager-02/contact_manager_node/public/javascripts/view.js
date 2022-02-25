// Helpful debug helper for Handlebars if needed
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

class View {
  constructor() {
    this.homeView = document.querySelector('section.homeView');
    this.formAddContact = document.querySelector('section.formAddContact');
    this.formEditContact = document.querySelector('section.formEditContact');
  }
  
  #makeActiveView(element) {
    let mainViewElements = [
      this.homeView, this.formAddContact, this.formEditContact
    ];
    mainViewElements.forEach(el => el.classList.add('hidden'));
    element.classList.remove('hidden');
  }

  #renderNoContacts(searchStr) {
    if (searchStr) {
      let resultHTML = searchStr.startsWith('#') ?
        `<h3>No contacts with tags that include <strong>'${searchStr.slice(1)}'</strong></h3>` :
        `<h3>No contacts with <strong>'${searchStr.slice(1)}'</strong> in their name</h3>`
      document.querySelector('.listContacts').innerHTML = resultHTML;
    } else {
      let listContacts = document.querySelector('.listContacts');
      listContacts.innerHTML = '<h3>The contact list is empty.</h3>';

      let addContactButton = document.createElement('button');
      addContactButton.classList.add('addContactBtn');

      listContacts.append(addContactButton);
    }
  }

  renderHomeView(contacts, searchStr) {
    this.#makeActiveView(this.homeView);
    if (contacts.length > 0) {
      let context = { contacts: contacts, search: searchStr };
      const tempContent = document.querySelector('#contactTemplate').innerHTML;
      const contactTemplate = Handlebars.compile(tempContent);
      const allContactsHTML = contactTemplate(context);
      document.querySelector('.listContacts').innerHTML = allContactsHTML;
    } else  {
      this.#renderNoContacts(searchStr);
    }
  }

  renderEditContactForm(contact) {
    this.#makeActiveView(this.formEditContact);
    const tempContent = document.querySelector('#editFormTemplate').innerHTML;
    const editFormTemplate = Handlebars.compile(tempContent);
    const formHTML = editFormTemplate(contact);
    document.querySelector('section.formEditContact').innerHTML = formHTML;
  }

  bindSearchInput(handler) {
    let searchBox = document.querySelector('.searchBox');
    
    searchBox.addEventListener('input', e => {
      e.preventDefault();
      let searchStr = searchBox.value;
      handler(searchStr);
    })
  }

  bindMainClickHandlers(deleteContact, getContact, cancel, addContact, editContact) {
    document.body.addEventListener('click', e => {
      e.preventDefault();

      let id = e.target.parentElement.id;
      let eClass = e.target.classList;

      if (eClass.contains('contactDeleteBtn')) { deleteContact(id) }
      else if (eClass.contains('contactEditBtn')) { getContact(id) }
      else if (eClass.contains('cancel') || eClass.contains('header')) { cancel() }
      else if (eClass.contains('addContactBtn')) { 
        this.#makeActiveView(this.formAddContact) 
      } 
      else if (e.target.type === 'submit') {
        let form = e.target.parentElement;
        
        if (form.className === 'formAddContact') { addContact(form) }
        else if (form.className === 'formEditContact') { editContact(form) }
      }
    })
  }
}

export default View;

class Model {
  constructor() {
    this.contacts;
  }

  #formInputToObj(rawFormData) {
    let newContact = {};
    let input = rawFormData.elements;
    
    for (let i = 0; i < input.length; i += 1) {
      if (input[i].tagName !== "BUTTON") {
        newContact[input[i].name] = input[i].value;
      }
    }
    return newContact;
  }
  
  #tagStringToArray(str) {
    return str.match(/[a-z-][^a-z]*[a-z-]*/gi)
              .map(strTag => { 
                return { tag: strTag.toLowerCase() };
              });
  }

  #tagArrayToString(arr) {
    return arr.map(tagObj => tagObj.tag).join()
  }

  #formatTagsForLocal(contacts) {
    return contacts.map(contact => this.#formatContactForLocal(contact))
  }

  #formatContactForLocal(contact) {
    if (contact.tags) {
      if (!Array.isArray(contact.tags)) {
        contact.tags = this.#tagStringToArray(contact.tags)
      }
    } else { contact['tags'] = null }
    return contact;
  }

  formatContactForExternal(contact) {
    contact = JSON.parse(JSON.stringify(contact));
    let tags = contact.tags;
    if (tags) {
      contact.tags = Array.isArray(tags) ?
        this.#tagArrayToString(tags) : this.#tagArrayToString(this.#tagStringToArray(tags));
    } else { contact['tags'] = null }
    return contact;
  }

  sortContacts(contacts) {
    return contacts.sort((a, b) => {
      a = a.full_name.split(' ').slice(-1)[0];
      b = b.full_name.split(' ').slice(-1)[0];

      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  bindContactsChanged(callback) {
    this.onContactsChanged = callback
  }

  async deleteContact(id) {
    if (window.confirm("Are you sure you want to delete the contact?")) {
      await fetch( `/api/contacts/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.status === 204) return res.text();
          throw new Error('The contact was unable to be deleted at this time. ');     
        })
        .then( _ => {
          this.contacts = this.contacts.filter(contact => contact.id !== Number(id));
          this.onContactsChanged();
        })
        .catch(error => {
          alert(`${error.message}Please try again later.`); 
        })
    }
  }

  async getContacts() {
    let contacts = await fetch( '/api/contacts/')
      .then(res => {
        if (res.status === 200) return res.json();
        throw new Error('Unable to get the list of contacts at this time. '); 
      })
      .catch(error => {
        alert(`${error.message}Please try again later.`); 
      });
    this.contacts = this.#formatTagsForLocal(contacts);
    return this.contacts;
  }

  async createContact(formData) {
    let newContactInfo = this.#formInputToObj(formData);

    try {
      await fetch( '/api/contacts/', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContactInfo),
      })
        .then(res => {
          if (res.status === 201) return res.json()
          throw new Error('Sorry, unable to add a contact. ');
        })
        .then(addedContact => {
          this.contacts.push(addedContact);
          this.contacts = this.#formatTagsForLocal(this.contacts);
          formData.reset();
          this.onContactsChanged();
        });
    } catch(error) {
      alert(`${error.message}Please try again later.`);
    }
  }

  async editContact(formData) {
    let updatedContact = this.#formInputToObj(formData);
    console.log(updatedContact);
    let id = updatedContact.id;
    
    try {
      await fetch( `${formData.action}${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact),
      })
        .then(res => {
          if (res.status === 201) return res.json()
          throw new Error('Sorry, unable to update contact. ');
        })
        .then(updatedContact => {
          this.contacts = this.contacts.filter(contact => contact.id !== Number(id));
          updatedContact = this.#formatContactForLocal(updatedContact);
          this.contacts.push(updatedContact);
          this.onContactsChanged();
        });
    } catch(error) {
      alert(`${error.message}Please try again later.`);
    }
  }
}

export default Model;
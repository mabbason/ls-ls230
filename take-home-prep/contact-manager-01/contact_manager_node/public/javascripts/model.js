"use strict";

class Model {
  constructor() {
    //this is the state, all of the data
    this.contacts;
  }
  //All the model methods are essentially the CRUD actions
  // createTodo, readTodo, updateTodo, deleteTodo methods

  bindContactsChanged(callback) {
    this.contactsChanged = callback;
  }

  #convertAllContactsTags(contacts) {
    /*
      for each contact
        let each 'tags' property = return of convertTagsToObj
          - to convert the string of comma separated tags into an array with one obj per tag
    */
    return contacts.map(contact => {
      if (!contact.tags) return null;

    });
  }

  #convertTagsToObj(tags) {
    /*
      input: string of tags or null if there are none
        - either null
          -or-
          "work,family,friend,VIP"
      output: null if none, or...
        an array of objects w each object representing a single tag of the following format
        { tag: 'tagValue' }
      eg

      [ {tag: 'work'}, {tag: 'family'}, {tag: 'friend'}, {tag: 'VIP'} ]
    */
  }

  async getContacts() {
    try {
      let response = await fetch( '/api/contacts/', { method: 'GET' })
        .then(res => res.json())
        .then(data => data);
      this.contacts = response;
    } catch(err) {
      console.log(err)
    }
    return this.contacts;
  }

  async addContact(newContactInfo) { 
      await fetch('/api/contacts/', { 
        method: 'POST' , 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContactInfo),
      })
      .then(res => {
        if (res.status === 201) return res.json()
        throw('Failed to add contact, please try again.');
      })
      .then(addedData => {
        this.contacts.push});
    // try {
    //   await fetch('/api/contacts/', { 
    //     method: 'POST' , 
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newContactInfo)
    //   })
    //   .then(res => console.log(res))
    //   // .then(data => console.log(data));
      
    // } catch(err) {
    //   console.log(err);
    // }
    
      /*
      probably id, full_name, email, phone_number, tags, etc
      */
     // this.contacts.push(newContact);
    // this.onContactChanged(this.contacts)
  }
    
  

  editContact(updatedInfo) {
    // Method: PUT    API_PATH: /api/contacts/:id
    // Accepts JSON or query string as request body. 
    // Preserves previous values of attributes that aren't present.
    /* Example of data to send w PUT request
      {
        "id": 1,
        "full_name": "Arthur Dent",
        "email": "dent@example.com",
        "phone_number": "12345678901",
        "tags": "work,business"
      }
      Success Status 200
      {
        "id": 1,
        "full_name": "Arthur Dent",
        "email": "dent@example.com",
        "phone_number": "12345678901",
        "tags": "work,business"
      }
      Error Status 400
    */
 
  }

  deleteContact(id) {
    // Method: DELETE    API_PATH: /api/contacts/:id
    // Deletes the contact if contact with given id is found. 
    // Responds with 400 otherwise.
    // Success status is 204
    // failure is 400
   
  }
 

};

export default Model;
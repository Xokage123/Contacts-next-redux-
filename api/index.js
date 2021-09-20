export const getAllContacts = async _ => {
  const response = await fetch("http://localhost:4200/contacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const contacts = await response.json();
  return contacts
}

export const API_searchContact = async key => {
  const response = await fetch("http://localhost:4200/contacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const contacts = await response.json();
  const contact = contacts.find((element) => {
    return element.uniqueKey === key;
  });
  return contact;
}


export const API_addNewContact = async infoContact => {
  const response = await fetch("http://localhost:4200/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(infoContact)
  });
  const information = await response.json();
  return information;
}

export const API_deleteContact = async id => {
  const response = await fetch(`http://localhost:4200/contacts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const information = await response.json();
  return information;
}
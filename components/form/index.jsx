import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import uuid from 'react-uuid'

// slices-redux
import { fetchAddContact, contactsSelector } from '../../slices/contacts'

// Componets
import { ListContacts } from '../list-contacts/ListContacts'

// Data
import { NUMBER_INPUTS } from '../../data'

// Стили
import { Form, Button } from "react-bootstrap"
import styles from "./form.module.scss"

export const FormContacts = () => {
  const dispatch = useDispatch();

  const { loadingAdd } = useSelector(contactsSelector);

  const clearForm = useCallback((ev) => {
    for (let i = 0; i <= NUMBER_INPUTS; i++) {
      ev.target[i].value = "";
    }
  }, [])


  const informationContact = useMemo(_ => {
    return {
      name: "",
      lastName: "",
      number: null
    }
  }, []);

  const toggleName = useCallback(value => {
    informationContact.name = value;
  }, [informationContact]);

  const toggleLastName = useCallback(value => {
    informationContact.lastName = value;
  }, [informationContact]);

  const toggleNumber = useCallback(value => {
    informationContact.number = value;
  }, [informationContact]);

  const addNewContact = useCallback(() => {
    if (informationContact.name && informationContact.lastName && informationContact.number) {
      informationContact.uniqueKey = uuid();
      dispatch(fetchAddContact(informationContact));
      informationContact.name = "";
      informationContact.lastName = "";
      informationContact.number = null;
    } else {
      console.log("Вы ввели не все необходимые данные!!!");
    }
  }, [dispatch, informationContact]);
  return (
    <>
      <Form onSubmit={ev => {
        ev.preventDefault();
        addNewContact();
        clearForm(ev);
      }} className={styles.form}>
        <h3>Форма добавление контакта</h3>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Имя*</Form.Label>
          <Form.Control onChange={ev => toggleName(ev.target.value)} type="text" placeholder="Введите имя" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Фамилия*</Form.Label>
          <Form.Control onChange={ev => toggleLastName(ev.target.value)} type="text" placeholder="Введите фамилию" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Номер телефона*</Form.Label>
          <Form.Control onChange={ev => toggleNumber(ev.target.value)} type="number" placeholder="Введите номер телефона" />
        </Form.Group>

        <Button variant="primary" type="submit">
          {
            loadingAdd ? "Loading" : "Добавить контакт"
          }
        </Button>
      </Form>
      <ListContacts />
    </>
  )
}
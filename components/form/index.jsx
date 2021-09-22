// React
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import uuid from 'react-uuid'
// slices-redux
import { fetchAddContact, contactsSelector } from '../../slices/contacts'
// Componets
import { ListContacts } from '../list-contacts/ListContacts'
// Data
import { NUMBER_INPUTS } from '../../data'
// Other
import { maskPhone, customStylesModal } from "../../config"
// Стили
import { Form, Button } from "react-bootstrap"

export const FormContacts = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { loadingAdd } = useSelector(contactsSelector);
  const {
    register,
    getValues,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm();

  useEffect(() => {
    maskPhone.mask(document.querySelector(`.Form_type_create-input`));
    Modal.setAppElement(`.Form_type_create`);
  }, []);

  const onSubmit = useCallback(data => {
    console.log(getValues("number"));
    const contactInfo = {
      ...data,
      uniqueKey: uuid()
    };
    dispatch(fetchAddContact(contactInfo));
    openModal();
    let tokenClearModal = setTimeout(() => {
      closeModal();
      clearTimeout(tokenClearModal);
    }, 4000);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Form
        onSubmit={
          handleSubmit(onSubmit)
        }
        className={[
          "Form",
          "Form_type_create"
        ]}
      >
        <h3>Форма добавление контакта</h3>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Имя*</Form.Label>
          <Form.Control
            {...register('name', {
              required: true
            })}
            type="text"
            placeholder="Введите имя"
          />
          {errors.name && <p className="error">Данное поле обязательно для заполнения</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Фамилия*</Form.Label>
          <Form.Control {...register('lastName', {
            required: true
          })} type="text" placeholder="Введите фамилию" />
          {errors.lastName && <p className="error">Данное поле обязательно для заполнения</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Номер телефона*</Form.Label>
          <Form.Control
            {...register('number', {
              required: true,
              validate: value => {
                const input = document.querySelector(".Form_type_create-input");
                const reallyValuePhone = input.inputmask ? input.inputmask.unmaskedvalue() : value;
                if (reallyValuePhone.length === 10) {
                  return true;
                }
                return false;
              }
            })}
            className="Form_type_create-input"
            type="text"
            placeholder="Введите номер телефона"
          />
          {errors.number && <p className="error">Данное поле обязательно для заполнения</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          {
            loadingAdd ? "Loading" : "Добавить контакт"
          }
        </Button>
      </Form>
      <ListContacts />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStylesModal}
        contentLabel="Example Modal"
      >
        <p className="success">Контакт успешно создан</p>
      </Modal>
    </>
  )
}
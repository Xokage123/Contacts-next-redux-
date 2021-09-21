import Modal from 'react-modal';
import { Form, Button } from "react-bootstrap"
import { useForm } from 'react-hook-form';
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { fetchUpdateContact } from "../../slices/contacts";
import { useDispatch } from "react-redux";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(FormChangeContacts);


export const FormChangeContacts = props => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    contactInfo
  } = props;
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm();

  const onSubmit = useCallback(data => {
    const newContactInfo = {
      ...data,
      uniqueKey: contactInfo.uniqueKey,
      id: contactInfo.id
    };
    dispatch(fetchUpdateContact(newContactInfo));
    openModal();
    let tokenClearModal = setTimeout(() => {
      closeModal();
      clearTimeout(tokenClearModal);
      router.push("/");
    }, 4000);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Button onClick={_ => router.back()} variant="secondary">Вернуться назад</Button>
      <h3>Форма обновления контакта</h3>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Имя*</Form.Label>
        <Form.Control {...register('name', {
          value: contactInfo.name,
          required: true
        })} type="text" placeholder="Введите имя" />
        {errors.name && <p className="error">Данное поле обязательно для заполнения</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastname">
        <Form.Label>Фамилия*</Form.Label>
        <Form.Control {...register('lastName', {
          value: contactInfo.lastName,
          required: true
        })} type="text" placeholder="Введите фамилию" />
        {errors.lastName && <p className="error">Данное поле обязательно для заполнения</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Номер телефона*</Form.Label>
        <Form.Control  {...register('number', {
          value: contactInfo.number,
          required: true
        })} type="number" placeholder="Введите номер телефона" />
        {errors.number && <p className="error">Данное поле обязательно для заполнения</p>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Сохранить изменения
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="success">Данные контакта успешно изменены! Сейчас вас перенаправит на главную страницу.</p>
      </Modal>
    </Form>
  )
}
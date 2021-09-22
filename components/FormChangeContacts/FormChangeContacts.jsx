// React
import {
  useCallback,
  useState,
  useEffect
} from "react"
import Modal from 'react-modal';
import {
  Form,
  Button
} from "react-bootstrap"
import {
  useForm
} from 'react-hook-form';
import {
  useRouter
} from "next/router"
import {
  fetchUpdateContact
} from "../../slices/contacts";
import {
  useDispatch
} from "react-redux";
import {
  maskPhone,
  customStylesModal
} from "../../config"


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
    reset,
    formState: {
      errors
    },
  } = useForm();
  useEffect(() => {
    maskPhone.mask(document.querySelector(".Form_type_change-input"))
    Modal.setAppElement(`.Form_type_change`);
  }, [])

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
      reset({});
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
    <Form
      className={[
        "Form_type_change",
        "Form"
      ]
      }
      onSubmit={
        handleSubmit(onSubmit)
      }
    >
      <Button onClick={_ => router.back()} variant="secondary">Вернуться назад</Button>
      <h3>Форма обновления контакта</h3>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Имя*</Form.Label>
        <Form.Control
          {...register('name', {
            value: contactInfo.name,
            required: true
          })}
          type="text"
          placeholder="Введите имя" />
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
        <Form.Control
          {...register('number', {
            value: contactInfo.number,
            required: true,
            validate: value => {
              const input = document.querySelector(".Form_type_change-input");
              const reallyValuePhone = input.inputmask ? input.inputmask.unmaskedvalue() : value;
              console
              if (reallyValuePhone.length === 10) {
                return true;
              }
              return false;
            }
          })}
          className="Form_type_change-input"
          type="text"
          placeholder="Введите номер телефона"
        />
        {errors.number && <p className="error">Данное поле обязательно для заполнения</p>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Сохранить изменения
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStylesModal}
        contentLabel="Example Modal"
      >
        <p className="success">Данные контакта успешно изменены! Сейчас вас перенаправит на главную страницу.</p>
      </Modal>
    </Form>
  )
}
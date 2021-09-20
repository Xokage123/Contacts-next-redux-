import { ListGroup, CloseButton } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from "react"
import { Spinner, Button } from 'react-bootstrap'
import { fetchContacts } from "../../slices/contacts"
import uuid from 'react-uuid'

// Стили
import styles from "./list-contacts.module.scss"

console.log(styles);

import { contactsSelector, fetchDeleteContact } from "../../slices/contacts"

export const ListContacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const { listContacts, loading, loadingDelete } = useSelector(contactsSelector);
  const content = useCallback(() => {
    if (loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    }
    return (
      <ListGroup as="ul">
        {
          listContacts.map((element) => {
            return (
              <ListGroup.Item className={styles["List-item"]} as="li" key={element.uniqueKey}>
                <h4 key={uuid()}>{`${element.name} ${element.lastName}`}</h4>
                <a key={uuid()} href={`tel:${element.number}`}>{element.number}</a>
                <CloseButton className={styles["List-button_type_delete"]} key={uuid()} onClick={_ => dispatch(fetchDeleteContact(element.id))}></CloseButton>
                <Button className={styles["List-button_type_change"]} variant="info">
                  {
                    loadingDelete ? "Элемент удаляется" : "Изменить элемент"
                  }
                </Button>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    )
  }, [dispatch, listContacts, loading, loadingDelete]);

  return (
    <section className={styles["List-container"]}>
      <h3 className={styles["List-title"]}>
        {
          listContacts.length > 0 ? "Список контактов" : "Контакты отсутствуют"
        }
      </h3>
      {
        content()
      }
    </section>
  )
}
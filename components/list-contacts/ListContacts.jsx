// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from "react"
// Next
import Link from "next/link"
// Redux__slices
import { fetchContacts } from "../../slices/contacts"
import { contactsSelector, fetchDeleteContact } from "../../slices/contacts"
// Others
import uuid from 'react-uuid'
// Styles
import { ListGroup, CloseButton } from "react-bootstrap"
import SimpleBar from 'simplebar-react';
import { Spinner, Button } from 'react-bootstrap'
import styles from "./list-contacts.module.scss"

export const ListContacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const { listContacts, loading, loadingAdd } = useSelector(contactsSelector);
  const content = useCallback(_ => {
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
                <CloseButton className={styles["List-button_type_delete"]} key={uuid()} onClick={_ => confirm("Вы уверенны, что хотите удалить этот контакт?") ? dispatch(fetchDeleteContact(element.id)) : null}></CloseButton>
                <Link passHref href={`/contact/${element.id}`}>
                  <Button className={styles["List-button_type_change"]} variant="primary">
                    Изменить контакт
                  </Button>
                </Link>
              </ListGroup.Item>
            )
          })
        }
        {
          loadingAdd ?
            (
              <ListGroup.Item as="li">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </ListGroup.Item>
            )
            :
            null
        }
      </ListGroup>
    )
  }, [dispatch, listContacts, loading, loadingAdd]);

  return (
    <section className={styles["List-container"]}>
      <SimpleBar style={{ maxHeight: 500 }}>
        <h3 className={styles["List-title"]}>
          {
            listContacts.length > 0 ?
              "Список контактов"
              :
              "Контакты отсутствуют"
          }
        </h3>
        {
          content()
        }
      </SimpleBar>
    </section>
  )
}
import { ListGroup, CloseButton } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from "react";
import { Spinner } from 'react-bootstrap';
import { fetchContacts } from "../../slices/contacts";
import uuid from 'react-uuid'

import { contactsSelector, fetchDeleteContact } from "../../slices/contacts";

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
              <ListGroup.Item as="li" key={element.uniqueKey}>
                <h4 key={uuid()}>{element.name}</h4>
                <a key={uuid()} href={`tel:${element.number}`}>{element.number}</a>
                <CloseButton key={uuid()} onClick={_ => dispatch(fetchDeleteContact(element.id))}></CloseButton>
                {
                  loadingDelete ? <p>Элемент удаляется</p> : null
                }
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    )
  }, [dispatch, listContacts, loading, loadingDelete]);

  return (
    <section>
      <h3>Список контактов в хранилище</h3>
      <ListGroup as="ul">
        {
          content()
        }
      </ListGroup>
    </section>
  )
}
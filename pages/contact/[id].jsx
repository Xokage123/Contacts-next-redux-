import { useEffect, useCallback } from "react"
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { MyLayout } from "../../components/layout"
import { useRouter } from "next/router"
import { contactSelector } from "../../slices/contact"
import { fetchGetContact } from "../../slices/contact"
import { Spinner } from 'react-bootstrap'
import { FormChangeContacts } from "../../components/FormChangeContacts/FormChangeContacts"

export default function Contact() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { contact, loadGet, errorGet } = useSelector(contactSelector);
  useEffect(() => {
    router.query.id ? localStorage.setItem("lastContactId", router.query.id) : null;
    dispatch(fetchGetContact(localStorage.getItem("lastContactId")));
  }, [dispatch, router.query.id]);
  const generateContent = useCallback(() => {
    if (loadGet) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    }
    if (errorGet) {
      return (
        <div>Произошла ошибка при загрузке данных =(</div>
      )
    }
    return <FormChangeContacts contactInfo={contact} />
  }, [contact, errorGet, loadGet]);
  return (
    <MyLayout>
      {
        generateContent()
      }
    </MyLayout>
  )
}
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { MyLayout } from '../components/layout';
import { FormContacts } from '../components/form';
import { getAllContacts } from '../api';
import { contactsSelector, fetchContacts } from '../slices/contacts';

import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <MyLayout>
      <FormContacts />
    </MyLayout>
  )
}

export async function getStaticProps() {

  const contacts = await getAllContacts();
  return {
    props: {
      element: contacts
    }
  }
}
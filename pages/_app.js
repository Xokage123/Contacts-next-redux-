import NextNprogress from 'nextjs-progressbar';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';

//Стили
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss'

const mainStore = configureStore({
  reducer: rootReducer
})


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={mainStore}>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

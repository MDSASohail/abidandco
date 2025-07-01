import { configureStore } from '@reduxjs/toolkit';
import certificate from '../Store/CertificateSlice';

const store = configureStore({
  reducer: {
    certificate: certificate
  }
});

export default store;

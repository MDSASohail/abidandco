import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import CertificateVerificationPage from './Components/CertificateVerificationPage';
import CertificateForm from './Components/CertificateForm';
import AllCertificate from './Components/AllCertificates';
import DetailCertificate from './Components/DetailCertificate';
import { useReducer } from 'react';
import { useSelector } from 'react-redux';
import CertificateView from './Components/CertificateView.js';
function App() {
  const data = useSelector(state =>state);
  // console.log("Data is", data)
  return (
    <div >
      <Router>
        <Routes>
            <Route path='certificate/adminImamu' element={<AllCertificate/>}/>
            <Route path='certificate' element={<CertificateVerificationPage/>}/>
            <Route path='certificate/show/:id' element={<CertificateView/>}/>
            <Route path='certificate/adminImamu/detailCertificate' element={<DetailCertificate/>}/>
            <Route path='*'   element={<Navigate to="/certificate"/>}/>
        </Routes>
      </Router>
      {/* <AllCertificate/> */}
    </div>
  );
}

export default App;

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import CertificateVerificationPage from './Components/CertificateVerificationPage';
import CertificateForm from './Components/CertificateForm';
import AllCertificate from './Components/AllCertificates';
function App() {
  return (
    <div >
      <Router>
        <Routes>
            <Route path='adminImamu' element={<AllCertificate/>}/>
            <Route path='certificate' element={<CertificateVerificationPage/>}/>
            <Route path='*'   element={<Navigate to="/certificate"/>}/>
        </Routes>
      </Router>
      {/* <AllCertificate/> */}
    </div>
  );
}

export default App;

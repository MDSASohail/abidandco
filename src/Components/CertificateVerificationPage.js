import  { useState } from 'react';
import CertificateSearch from './CertificateSearch';
import CertificateResult from './CertificateResult';
import BackgroundIMG from '../Images/Background.png'
import { BaseURL, getCertificateByID } from '../Functions/certificate'
const CertificateVerificationPage = () => {

  const [certificateResult, setCertificateResult] = useState({loading:false, finishLoading:false, result:null});

  



  return (
    <div className="flex flex-col items-center text-center   ">
      <a href="#" ><img src={BackgroundIMG} /></a>
      <h1 className="text-3xl font-bold mb-2">Verification</h1>
      <p className="max-w-2xl text-gray-700 mb-2">
        All certificates issued by IQ-OHS and its ATP can be verified online with a unique certificate number. To verify a certificate, input the certificate no. below.
      </p>
      <p className="text-sm text-gray-600 mb-2">Please contact us regarding fraudulent certificates.</p>

      <CertificateSearch setCertificateResult={setCertificateResult} />
      <CertificateResult loading={certificateResult.loading} result={certificateResult.result} finishLoading={certificateResult.finishLoading} />
    </div>
  );
};

export default CertificateVerificationPage;

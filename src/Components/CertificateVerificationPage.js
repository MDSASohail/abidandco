import React, { useState } from 'react';
import CertificateSearch from './CertificateSearch';
import CertificateResult from './CertificateResult';
import BackgroundIMG from '../Images/Background.png'
import { BaseURL, getCertificateByID } from '../Functions/JSFunctions'
const CertificateVerificationPage = () => {
  const [loading, setLoading] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false)
  const [result, setResult] = useState(null);

  const fetchCertificate = async (certificateCode) => {
    setLoading(true);
    setResult(null);
    setFinishLoading(false)
    try {
      const response = await getCertificateByID(certificateCode)
      if (response.status) {
        setResult(response.data);
      }

    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
    setFinishLoading(true)
  };



  return (
    <div className="flex flex-col items-center text-center   ">
      <a href="https://iq-ohs.com/index.php" target='_black'><img src={BackgroundIMG} /></a>
      <h1 className="text-3xl font-bold mb-2">Verification</h1>
      <p className="max-w-2xl text-gray-700 mb-2">
        All certificates issued by IQ-OHS and its ATP can be verified online with a unique certificate number. To verify a certificate, input the certificate no. below.
      </p>
      <p className="text-sm text-gray-600 mb-2">Please contact us regarding fraudulent certificates.</p>

      <CertificateSearch onSearch={fetchCertificate} />
      <CertificateResult loading={loading} result={result} finishLoading={finishLoading} />
    </div>
  );
};

export default CertificateVerificationPage;

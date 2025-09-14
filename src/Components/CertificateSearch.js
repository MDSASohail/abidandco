import  { useState, useRef } from 'react';
import { getCertificateByID } from '../Functions/certificate';

const CertificateSearch = ({ setCertificateResult }) => {
  
  const certificateNumber = useRef(); // Holds certificate number

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (certificateNumber.current.value.trim()) {
      fetchCertificate(certificateNumber.current.value.trim())
    }

   
  };


  // Ferch certificate and also maintaining loading and results.
   const fetchCertificate = async (certificateCode) => {

    setCertificateResult(pre=>({...pre, loading:true}))
    setCertificateResult(pre =>({...pre, result:null}))
    setCertificateResult(pre =>({...pre, finishLoading:false}))
    try {
      const response = await getCertificateByID(certificateCode)
      if (response.status) {
        setCertificateResult(pre =>({...pre, result:response.data}))
      }

    } catch (err) {
      console.error('Fetch error:', err);
    }
     setCertificateResult(pre=>({...pre, loading:false}))
     setCertificateResult(pre =>({...pre, finishLoading:true}))
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
      <input
        type="text"
        ref={certificateNumber}
        placeholder="Enter Certificate Code"
        className="px-4 py-2 border border-gray-300 rounded-md w-72 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default CertificateSearch;

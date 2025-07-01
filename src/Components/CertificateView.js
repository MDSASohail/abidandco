import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPDFOfaUser, formatDateToDDMMYYYY, getCertificateByID } from "../Functions/JSFunctions";


export default function CertificateView() {
  const [pdfURL, setPdfUrl] = useState(null);
  const [certificate, setCertificate] = useState({name:"", date:""});
  const params = useParams();
  console.log("Params is ", params)

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await fetchPDFOfaUser(params.id);
        const certificateDetail = await getCertificateByID(params.id);
        // console.log("Certificate response", certificateDetail)
        setCertificate(certificateDetail.data)

        if (response.status) {
          // console.log("Fetch pdf", response)
          setPdfUrl(response.data);
        } else {
          console.log("Failed: ", response.message);
        }
      } catch (error) {
        console.log("Error in fetching PDF", error);
      }
    };
    fetchPDF();
  }, []);
  return (
    <div
      className="w-screen  bg-no-repeat bg-cover flex items-center justify-center "
      style={{
        backgroundImage: "url('https://very.iosh.com/images/hex_map_bg.jpg')",
      }}
    >
      <div className="h-fit bg-white rounded-lg shadow-lg w-[95%] mx-10 p-3 m-6">
        <div className="flex justify-between items-center p-4">
          <img
            src="https://very.iosh.com/img/logo-default.png"
            alt="IOSH Training"
            className="h-20  object-contain"
          />
          <img
            src="https://very.iosh.com/images/Smart-Verify-Plus-Logo.png"
            alt="Smart Verify Plus"
            className="h-20 object-contain"
          />
        </div>
        <div className="h-10 my-3 bg-[#007A5A] rounded-sm flex items-center text-white pl-10"> <span><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" className="text-white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </span><span className="pl-4 text-sm">This document is valid and was issued by IOSH (Institution of Occupational Safety and Health) to {certificate.name} on {formatDateToDDMMYYYY(certificate.dateOfIssue)}</span></div>

        <div className="border-t border-gray-300">
          {
            pdfURL === null ? <div  className="w-full h-[120vh]">PDF not uploded</div> : <iframe
            src={pdfURL} 
            title="Certificate PDF"
            className="w-full h-[120vh]"
          ></iframe>
          }
        </div>
      </div>
    </div>
  );
}

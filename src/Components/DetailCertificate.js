import { useEffect, useState } from "react";
import { fetchPDFOfaUser, formatDateToDDMMYYYY, deletePDF, BaseURL, getCertificateByID } from "../Functions/certificate";
import { useSelector } from "react-redux";

import PDFUpload from "./PDFUpload";

import {  useParams } from "react-router-dom";
const DetailCertificate = () => {
    const [isPDFAvailable, setIsPDFAvailable] = useState(null);
    const [copySuccess, setCopySuccess] = useState("");
    const [upload, setUpload] = useState(false);
    const currentURL = useParams();
    const [certificateDetail, setCertificateDetail] = useState({name:"", description:"", issuedBy:"", id:currentURL.id, dateOfIssue:"", validThrough:""})
    
    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const response = await fetchPDFOfaUser(currentURL.id);
                setIsPDFAvailable(response);
            } catch (error) {
                console.log("Error in fetching PDF", error.message);
            }


            try {
                  const response = await getCertificateByID(currentURL.id)
                  if (response.status) {
                    setCertificateDetail({name:response.data.name, description:response.data.description, issuedBy:response.data.issuedBy, id:currentURL.id, dateOfIssue:response.data.dateOfIssue, validThrough:response.data.validThrough})
                  }
            
                } catch (err) {
                  console.error('Fetch error:', err);
                }
        };

        
        fetchPDF();
    }, [upload]);


    const handleUpload = () => {
        // alert("Upload PDF clicked");
        setUpload(true)
        // Add your upload logic here
    };

    const handleDelete = async() => {
        try {
            const response = await deletePDF(currentURL.id);
            if(response.status){
                setIsPDFAvailable(null);
            }
            
        } catch (error) {
            console.log("Error in deleting message.", error.message);
        }
    };

    const handleCopyUrl = () => {
        const productionURL = `https://abidandconode-8gax.vercel.app/certificate/show/${currentURL.id}`
        navigator.clipboard.writeText(productionURL)
            .then(() => setCopySuccess("URL copied!"))
            .catch(() => setCopySuccess("Failed to copy URL"));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {
                upload && <div onClick={()=>{setUpload(false)}} className="absolute  top-0 left-0 min-h-screen w-screen flex justify-center items-center  bg-[rgba(243,244,246,0.5)] ">
                    <div onClick={(e)=>{e.stopPropagation()}}><PDFUpload userID={currentURL.id} setUpload={setUpload}/></div>
                </div>
           
            }
             <nav className="bg-white shadow flex items-center justify-between p-2 ">
                <div className="flex gap-4">
                    <button
                        onClick={handleUpload}
                        className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Upload PDF
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    >
                        Delete PDF
                    </button>
                    <button
                        onClick={handleCopyUrl}
                        className="bg-green-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                    >
                        Copy URL
                    </button>
                </div>
                {copySuccess && (
                    <span className="text-sm text-gray-600">{copySuccess}</span>
                )}
            </nav>

            {/* Main content */}
            <div className=" p-4 gap-4">
                {/* Left 40% section */}
                <div className=" bg-white p-4 rounded-2xl shadow">
                
                    <table className="min-w-full border border-gray-300 text-sm text-center">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-4 py-2 border">NAME</th>
                            <th className="px-4 py-2 border">DESCRIPTION</th>
                            <th className="px-4 py-2 border">ISSUED BY</th>
                            <th className="px-4 py-2 border">CERTIFICATION NO</th>
                            <th className="px-4 py-2 border">DATE OF ISSUE</th>
                            <th className="px-4 py-2 border">VALID THROUGH</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             <tr  className="bg-gray-100 ">
                                <td className="px-4 py-2 border">{certificateDetail.name}</td>
                                <td className="px-4 py-2 border">{certificateDetail.description}</td>
                                <td className="px-4 py-2 border">{certificateDetail.issuedBy}</td>
                                <td className="px-4 py-2 border">{certificateDetail.id}</td>
                                <td className="px-4 py-2 border">{formatDateToDDMMYYYY(certificateDetail.dateOfIssue)}</td>
                                <td className="px-4 py-2 border">{certificateDetail.validThrough}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                </div>

                {/* Right 60% section */}
                <div className=" bg-white p-4 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">PDF Preview</h2>
                    <div className="border border-gray-300 rounded-lg h-[900px]">
                        {
                            isPDFAvailable ? <iframe  className="h-full w-full" src={`https://abidandconode.vercel.app/certificate/getPDF/${currentURL.id}`} frameborder="0"></iframe> : <p>PDF is not available right now. Please try again later.</p>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCertificate;

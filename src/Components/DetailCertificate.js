import { useEffect, useState } from "react";
import pdfFile from '../Images/563.pdf'
import { fetchPDFOfaUser, formatDateToDDMMYYYY, deletePDF } from "../Functions/JSFunctions";
import { useSelector } from "react-redux";

import PDFUpload from "./PDFUpload";
const DetailCertificate = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [copySuccess, setCopySuccess] = useState("");
    const currentUser = useSelector(state => state.certificate.currentUser);
    const [upload, setUpload] = useState(false);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const response = await fetchPDFOfaUser(currentUser.certificateNo);
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
    }, [upload]);


    const handleUpload = () => {
        // alert("Upload PDF clicked");
        setUpload(true)
        // Add your upload logic here
    };

    const handleDelete = async() => {
        try {
            const response = await deletePDF(currentUser.certificateNo);
            if(response.status){
                setPdfUrl(null);
            }else{
                alert(response.error)
            }
            
        } catch (error) {
            console.log("Error in deleting message");
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(pdfUrl)
            .then(() => setCopySuccess("URL copied!"))
            .catch(() => setCopySuccess("Failed to copy URL"));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {
                upload && <div onClick={()=>{setUpload(false)}} className="absolute  top-0 left-0 min-h-screen w-screen flex justify-center items-center  bg-[rgba(243,244,246,0.5)] ">
                    <div onClick={(e)=>{e.stopPropagation()}}><PDFUpload userID={currentUser.certificateNo} setPdfUrl={setPdfUrl} setUpload={setUpload}/></div>
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
            <div className="flex flex-row p-4 gap-4">
                {/* Left 40% section */}
                <div className="w-2/5 bg-white p-4 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">PDF Details</h2>
                    <div className="space-y-2">
                        <div><span className="font-semibold">NAME:</span> {currentUser.name}</div>
                        <div><span className="font-semibold">DESCRIPTION:</span> {currentUser.description}</div>
                        <div><span className="font-semibold">ISSUED BY:</span> {currentUser.issuedBy}</div>
                        <div><span className="font-semibold">CERTIFICATION NO:</span> {currentUser.certificateNo}</div>
                        <div><span className="font-semibold">DATE OF ISSUE:</span> {formatDateToDDMMYYYY(currentUser.dateOfIssue)}</div>
                        <div><span className="font-semibold">VALID THROUGH:</span> {currentUser.validThrough}</div>
                        <div><a href={pdfUrl} download={"myFile.pdf"}>Downlod PDF</a></div>
                    </div>
                </div>

                {/* Right 60% section */}
                <div className="w-3/5 bg-white p-4 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">PDF Preview</h2>
                    <div className="border border-gray-300 rounded-lg overflow-hidden h-[500px]">
                        {
                            pdfUrl !== null ? <iframe
                            src={pdfUrl}
                            title="PDF Viewer"
                            className="w-full h-full"
                        ></iframe> : <div>PDF not uploaded</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCertificate;

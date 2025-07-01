import React, { useState } from "react";
import {savePDFOfAUser} from '../Functions/JSFunctions'

const PDFUpload = ({userID, setPdfUrl, setUpload}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("User id in PDF", userID)
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append('userID', userID)

      try {
        const response = await savePDFOfAUser(formData, userID);
        
        if(response.status){
          // console.log("Status in PDG", response)
          // setPdfUrl(response.data);
          setUpload(false)
        }else{
          alert(response.data)
        }

      } catch (error) {
        alert(error.message)
      }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload PDF</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save File
        </button>
      </form>
    </div>
  );
};

export default PDFUpload;

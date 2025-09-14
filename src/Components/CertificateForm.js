import React, { useState } from 'react';
import {BaseURL, saveCertificate} from '../Functions/certificate'
const CertificateForm = ({setShowForm}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    issuedBy: '',
    certificationNo: '',
    dateOfIssue: '',
    validThrough: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await saveCertificate(formData);
    if(response.status){
      console.log("Form saved")
    }else{
      console.log("Form not saved");
    }
    setShowForm(false);
  };

  return (
    <div onClick={()=>setShowForm(false)} className=" flex items-center justify-center bg-gray-50 px-4  fixed top-0 left-0 w-screen h-screen ">
      <form
        onClick={(e)=>{e.stopPropagation()}}
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Add Certification</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="OSHA GENERAL INDUSTRY - 30Hrs"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Issued By</label>
            <input
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Certification No</label>
            <input
              name="certificationNo"
              value={formData.certificationNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Date of Issue</label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Valid Through</label>
            <input
              name="validThrough"
              value={formData.validThrough}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Life Time"
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;

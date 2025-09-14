import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { formatDateToDDMMYYYY } from '../Functions/certificate';


const CertificateResult = ({ loading, result, finishLoading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if(!result && finishLoading) return <div>Invalid Certificate Number</div>
  
  if (!result) return null;

  return (
    <div className="w-full max-w-5xl mt-2">
      <h2 className="text-xl font-semibold mb-4">Search Result</h2>
      <div className="overflow-x-auto">
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
            <tr className="bg-gray-100">
              <td className="px-4 py-2 border">{result.name}</td>
              <td className="px-4 py-2 border">{result.description}</td>
              <td className="px-4 py-2 border">{result.issuedBy}</td>
              <td className="px-4 py-2 border">{result.certificateNo}</td>
              <td className="px-4 py-2 border">{formatDateToDDMMYYYY(result.dateOfIssue)}</td>
              <td className="px-4 py-2 border">{result.validThrough}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateResult;

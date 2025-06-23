import { useEffect, useState } from "react"
import CertificateForm from './CertificateForm';
import CertificateResult from "./CertificateResult";
import { formatDateToDDMMYYYY, fetchAllCertificate } from "../Functions/JSFunctions";
const AllCertificate = () => {
    const [showForm, setShowForm] = useState(false);
    const [allCertificatesToPopulate, setAllCertificates] = useState([]);

    // const cer = {
    //     name: 'HIRAN HUSSAIN',
    //     description: 'OSHA GENERAL INDUSTRY - 30Hrs',
    //     issuedBy: 'IQ-OHS',
    //     certificationNo: 'IQ-263438',
    //     dateOfIssue: '29/Mar/2024',
    //     validThrough: 'Life Time',
    // }

    useEffect(() => {
        const fetchCertificate = async () => {
            console.log("Fetching user")
            const response =await fetchAllCertificate();
            console.log("Res", response)
            setAllCertificates(response)
        }

        fetchCertificate()

    }, [])
    return (
        <div>
            <div className="flex justify-between h-14 bg-black text-white items-center px-4 py-4">
                <div></div>
                <div>All Certificates</div>
                <div><button className="bg-white p-2 rounded-2xl cursor-pointer text-black hover:bg-black hover:text-white  transition-colors" onClick={() => setShowForm(true)}>Add Certificate</button></div>
            </div>
            <div className="mt-10">
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
                           Array.isArray(allCertificatesToPopulate) &&   allCertificatesToPopulate.map(eachCertificate => <tr key={eachCertificate.certificateNo} className="bg-gray-100">
                                <td className="px-4 py-2 border">{eachCertificate.name}</td>
                                <td className="px-4 py-2 border">{eachCertificate.description}</td>
                                <td className="px-4 py-2 border">{eachCertificate.issuedBy}</td>
                                <td className="px-4 py-2 border">{eachCertificate.certificateNo}</td>
                                <td className="px-4 py-2 border">{formatDateToDDMMYYYY(eachCertificate.dateOfIssue)}</td>
                                <td className="px-4 py-2 border">{eachCertificate.validThrough}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                showForm && <div className="fixed w-screen h-screen"><CertificateForm setShowForm={setShowForm} /></div>
            }
        </div>
    )
}

export default AllCertificate;
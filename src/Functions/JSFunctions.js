import { data } from "react-router-dom";

const productionBaseURL = "https://abidandconode.vercel.app/";
const localBaseURL = "http://localhost:8000/";

export const BaseURL = productionBaseURL;

export const formatDateToDDMMYYYY = function (isoDateString) {
    const date = new Date(isoDateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


export const fetchAllCertificate = async () => {

    // console.log("Fetching start")
    try {

        const URL = `${BaseURL}certificate/getAllCertificate`
        const response = await fetch(URL, { method: 'POST' });
        const certificates = await response.json();
        // console.log("Fetched certificates are", certificates);
        return certificates;
    } catch (error) {
        console.log("error in fetching certificatees", error.message);
        return [];
    }
}

export const saveCertificate = async (formData) => {
    try {
        const URL = `${BaseURL}certificate/saveCertificate`
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        return { status: true, message: "Form submitted successfully" }
    } catch (error) {
        return { status: false, message: error.message }
    }
}

export const getCertificateByID = async (id) => {
    try {
        const URL = `${BaseURL}certificate/getCertificate`
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
        const responseParseData = await response.json();
        return { status: true, data: responseParseData }
    } catch (error) {
        return { status: false, data: null }
    }
}

export const fetchPDFOfaUser = async (id) => {
    console.log("ID to search", id);
    try {
        const response = await fetch(`${BaseURL}certificate/getPDF`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });


        if (!response.ok) {
            throw new Error("Failed to fetch PDF");
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
            return { status: true, data: null };
        }


        const blob = await response.blob();
        console.log("Fetch pdf ", blob)
        const url = URL.createObjectURL(blob);
        // console.log("Blob", blob)
        return { status: true, data: url };
    } catch (error) {
        return { status: false, message: error.message };
    }
};

export const savePDFOfAUser = async (formData) => {
    try {

        const response = await fetch(`${BaseURL}certificate/uploadPDF`, {
            method: "POST",
            body: formData

        })

        if (!response.ok) {
            return { status: false, error: "Something went wrong" }

        }
        const blob = await response.blob();
        console.log("Blob is ", blob)
        const url = URL.createObjectURL(blob)
        return { status: true, data: url }

    } catch (error) {
        console.error("Error uploading file:", error);
        return { status: false, data: error.message }
    }
}

export const deletePDF = async (id) => {
    console.log("Deleting", id)
    try {
        const response = await fetch(`${BaseURL}certificate/deletePDF`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ userID: id })
        })

        // const parseData = await response.json();
        return { status: true };
        console.log("Delete response", response);
    } catch (error) {
        return { status: false, error: error.message }
    }
}







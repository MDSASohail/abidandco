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

        const URL = `${BaseURL}certificate/getAllCertificate`
        const response = await fetch(URL, { method: 'GET' });
        const certificates = await response.json();
        return certificates;
    
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
        // console.log("ID to search", id);
    
        const response = await fetch(`${BaseURL}certificate/getPDF/${id}`);


        // Throw error if PDF not found
        if (!response.ok) {
            const message = await response.json()
            throw new Error(message.message);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
   
};

export const savePDFOfAUser = async (formData) => {
    

        const response = await fetch(`${BaseURL}certificate/uploadPDF`, {
            method: "POST",
            body: formData

        })

        // console.log("Uploading PDF", response)

        if (!response.ok) {
            // return { status: false, error: "Something went wrong" };
            const error = await response.json()
            throw new Error({status:false, error:error.message})

        }
        // const blob = await response.blob();
        // console.log("Blob is ", blob)
        // const url = URL.createObjectURL(blob)
        return { status: true }

   
}

export const deletePDF = async (id) => {
        const response = await fetch(`${BaseURL}certificate/deletePDF`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ userID: id })
        })

        if(response.ok){
            return {status:true}
        }else{
            return {status:false};
        }


    
}







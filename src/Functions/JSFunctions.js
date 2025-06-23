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
         const production = 'https://abidandconode.vercel.app/certificate/getAllCertificate';
         const local = 'http://localhost:8000/certificate/getAllCertificate'
        const response = await fetch(production, { method: 'POST' });
        const certificates = await response.json();
        // console.log("Fetched certificates are", certificates);
        return certificates;
    } catch (error) {
        console.log("error in fetching certificatees", error.message);
        return [];
    }
}


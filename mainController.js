// const getAutomationprocess = require('./automationProcess');

exports.patientDetails = async (req, res) => {
    try {
        const { first_name, last_name, dob, document_type, afterDate, beforeDate, emr_url, request_id } = req.body;
        if (!first_name || !last_name || !dob || !document_type || !request_id) {
            const missingParams = [];
            if (!first_name) missingParams.push('FirstName');
            if (!last_name) missingParams.push('LastName');
            if (!dob) missingParams.push('DateOfBirth');
            if (!document_type) missingParams.push('DocumentType');
            if (!request_id) missingParams.push('RequestId');
            
            return res.status(400).json({ message: `${missingParams.join(", ")} not found.` });
        }

        // Send response before starting the automation process
        res.status(200).json({
            Status: true,
            Message: "Patient credentials updated",
            request_id: `${request_id}`
        });

        // Start automation process
        // await getAutomationprocess(req, res, first_name, last_name, dob, document_type, afterDate, beforeDate, emr_url);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// const puppeteer = require('puppeteer');
// const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve,ms))
// const moment = require('moment');
// const path = require('path');
// const fs = require('fs').promises;

// const DOWNLOAD_PATH = path.join(__dirname,'downloads');
// exports.automationProcess = async (req,res) => {
//   const {first_name, last_name, dob, document_type, afterDate, beforeDate, emr_url} = req.body
//   const formatedDob = moment(dob,'YYYYMMDD').format('MM/DD/YYYY')
//   const formatedAfterDate = moment(afterDate,'YYYYMMDD').format('MM/DD/YYYY')
//   const formatedBeforeDate = moment(beforeDate,'YYYYMMDD').format('MM/DD/YYYY')
//     try {
//         const browser = await puppeteer.launch({ headless: false });
//         const page = await browser.newPage();
//         const client = await page.target().createCDPSession();
//         await client.send('Page.setDownloadBehavior', {
//             behavior: 'allow',
//             downloadPath: DOWNLOAD_PATH,
//         });
//         await page.setViewport({height:750,width:1500})
    
//         await page.goto(emr_url);
//         await page.keyboard.press('Tab');
//         await page.keyboard.type(process.env.USERNAMEA,{delay:300})
//         await page.keyboard.press('Tab');
//         await page.keyboard.type(process.env.PASSWORDA,{delay:300})
//         await page.keyboard.press('Enter');
//         await sleep(5000);
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Enter',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.type(first_name,2000);
//         await page.keyboard.press('Tab');
//         await page.keyboard.type(last_name,2000);
//         await page.keyboard.press('Tab');
//         await page.keyboard.type(formatedDob,2000);
//         await sleep(3000);
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.type(formatedAfterDate,2000);
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.press('Tab',{delay:200});
//         await page.keyboard.type(formatedBeforeDate,2000);
//         await page.click('.btn.btn-secondary');
//         await sleep(5000);
//         await page.click('.nav-tabs .nav-item:nth-child(2) .nav-link')
//         await sleep(3000);
//         await page.click('.Chart.btn.btn-success')
//         await sleep(5000);
//         await page.click('.nav-tabs .nav-item:nth-child(3) .nav-link')
//         await sleep(3000);
//         await page.click('.Billing.btn.btn-success')
//         await sleep(5000);

//         const files = await fs.readdir(DOWNLOAD_PATH);
//         const medicalPdf = files.find(file => file.includes('Chart'));
//         const billingPdf =  files.find(file => file.includes('Billing'));

//         const base64MedicalFile = medicalPdf ? await convertFileToBase64(path.join(DOWNLOAD_PATH, medicalPdf)) : null;
//         const base64BillingFile = billingPdf ? await convertFileToBase64(path.join(DOWNLOAD_PATH, billingPdf)) : null;
//         await browser.close();
//         return res.status(200).json({
//             Status :"True",
//             Code:"R-200 Successfully Retrieval",
//             message: "All Records Retrieval Successfully",
//             medicalFile: base64MedicalFile,
//             billingFile: base64BillingFile,
//         });
//     } catch (error) {
//         console.error("Error in Puppeteer automation process", error);
//         res.status(500).json({ message: "Puppeteer launch Error found" });
    
// }}

// const convertFileToBase64 = async (filePath) => {
//     const fileData = await fs.readFile(filePath);
//     const base64Data = fileData.toString('base64');
//     await fs.unlink(filePath); // Delete the file after reading
//     return base64Data;
// };





// const puppeteer = require('puppeteer');
// const sleep =(ms)=>new Promise((resolve)=>setTimeout(resolve,ms))
// const path = require('path')
// const DOWNLOAD_PATH = path.join(__dirname,'downloads')
// const fs = require('fs').promises;

// exports.automationProcess=async(req,res)=>{
//     const {first_name, last_name, dob, document_type, afterDate, beforeDate, emr_url, request_id}=req.body
    
//     try{
//         const browser = await puppeteer.launch({headless:false});
//         const page = await browser.newPage();
//         const client = await page.target().createCDPSession();
//         await client.send('Page.setDownloadBehavior',{
//             behavior:'allow',
//             downloadPath:DOWNLOAD_PATH,
//         })
//         await page.setViewport({height:750,width:1500});
//         await page.goto(emr_url);
//         await page.type('#email',process.env.USERNAMEA,1000);
//         await sleep(2000);
//         await page.type('#password',process.env.PASSWORDA,1000);
//         await sleep(2000);
//         await page.click('#submit-login');
//         await sleep(20000);
//         await page.click('#dashboardHeaderRpm');
//         await sleep(20000);
//         await page.click('span.px-3.border-radius-10px.box-inset-shadow.card-value.heading-2.click-to-navigate-text')
//         await sleep(10000);
//         // await page.click('tr.graph-color > th.table-user-row.text-left.sticky-table-cells');

//         await page.evaluate(() => {
//             const rows = document.querySelectorAll('th');
//             rows.forEach(row => {
//                 if (row.textContent.includes("Miss. Abigail Tay")) {
//                     row.style.backgroundColor = "yellow"; 
//                     row.setAttribute('data-click-target', 'true');
//                 }
//             });
//         });
//         await sleep(2000)
//         await page.click('th[data-click-target="true"]');
//         await sleep(5000);
//         await page.click('#ccmReportDownloadIcon');
//         await sleep(2000);
//         await page.click('button.button2.buttonOkBackground.btn.btn-primary');
//         await sleep(60000);
//         await page.click('div.home-image.my-auto');
//         await sleep(3000)
//         await page.click('button.button2.button-popup-cancel.btn.btn-primary');
//         await sleep(2000)
//         await page.keyboard.press('Enter');
//         await sleep(2000);
//         await page.click('div.d-flex.my-auto.mr-2');
//         await sleep(3000);

//         const files = await fs.readdir(DOWNLOAD_PATH);
//         const pdfRecord = files.find(file =>file.includes('CCM_Report'));
//         const excelRecord = files.find(file =>file.includes('Dashboard'))
//         const base64PdfRecord = pdfRecord? await convertPdfFileToBase64(path.join(DOWNLOAD_PATH,pdfRecord)):null;
//         const base64ExcelRecord = excelRecord? await convertExcelFileToBase64(path.join(DOWNLOAD_PATH,excelRecord)):null;
//         await browser.close();
//         return res.status(200).json({
//             Status:"True",
//             Code:"R-200 Successfully Retrieval",
//             message:"All Record Retrieval  successfully",
//             pdfFile :base64PdfRecord,
//             excelFile :base64ExcelRecord
//         })

//     }catch(error){
//         console.log(error)
//          res.status(500).json({message:"Internal Server Error",error})
//     }
// }
// const convertPdfFileToBase64 = async (filePath)=>{
//     const fileData = await fs.readFile(filePath);
//     const base64Data =  fileData.toString('base64');
//     await fs.unlink(filePath);
//     return base64Data
// }
// const convertExcelFileToBase64 = async (filePath)=>{
//     const fileData = await fs.readFile(filePath);
//     const base64Data =  fileData.toString('base64');
//     // await fs.unlink(filePath);
//     return base64Data
// }




const puppeteer = require('puppeteer');
const sleep =(ms)=>new Promise((resolve)=>setTimeout(resolve,ms))
const path = require('path')
const DOWNLOAD_PATH = path.join(__dirname,'downloads')
const fs = require('fs').promises;
const xlsx = require('xlsx');
const { MongoClient } = require('mongodb');

const mongoUri = process.env.DATA_BASE; 
const dbName = "proclee";
const collectionName ="data";

exports.automationProcess=async(req,res)=>{
    const {first_name, last_name, dob, gender,document_type, afterDate, beforeDate, emr_url, request_id}=req.body
    
    const patientName = `Mr. ${first_name} ${last_name}`
    console.log(">>>",patientName)

    try{
        const browser = await puppeteer.launch({headless:false,defaultViewport:null});
        const page = await browser.newPage();
        const client = await page.target().createCDPSession();
        await client.send('Page.setDownloadBehavior',{
            behavior:'allow',
            downloadPath:DOWNLOAD_PATH,
        })
        
        await page.goto(emr_url);
        await page.evaluate(() => {
            const input = document.querySelector('#email');
            if (input) {
                input.type = 'password'; 
            }
        });
        await page.type('#email', process.env.USERNAMEA, { delay: 300 });
        await sleep(2000);
        await page.type('#password',process.env.PASSWORDA,1000);
        await sleep(2000);
        await page.click('#submit-login');
        await sleep(20000);
        await page.click('span[title="Consent Forms"]');
        await sleep(5000);
        await page.waitForSelector('.fa-spinner', { hidden: true ,timeout:60000});
        await sleep(2000)
        await page.click('img[title="Download Report"]')
        await sleep(2000);
        await page.click('img[alt="Home Icon"]');
        await sleep(5000)
        await page.click('#dashboardHeaderRpm');
        await sleep(10000);
        await page.click('span.px-3.border-radius-10px.box-inset-shadow.card-value.heading-2.click-to-navigate-text')
        await sleep(10000);
        // // await page.click('tr.graph-color > th.table-user-row.text-left.sticky-table-cells');

        await page.evaluate((patientName) => {
            const rows = document.querySelectorAll('th');
            rows.forEach(row => {
                if (row.textContent.includes(patientName)) {
                    row.style.backgroundColor = "yellow"; 
                    row.setAttribute('data-click-target', 'true');
                }
            });
        },patientName);
        await sleep(2000)
        await page.click('th[data-click-target="true"]');
        await sleep(10000);
        await page.click('#ccmReportDownloadIcon');
        await sleep(2000);
        await page.click('button.button2.buttonOkBackground.btn.btn-primary');
        await page.waitForSelector('.fa-spinner', { hidden: true ,timeout:60000});
        console.log("spinner completed")
        await sleep(5000);
        await page.click('div.home-image.my-auto');
        await sleep(3000)
        await page.click('button.button2.button-popup-cancel.btn.btn-primary');
        await sleep(2000)
        await page.keyboard.press('Enter');
        await sleep(2000);
        await page.click('div.d-flex.my-auto.mr-2');
        await sleep(3000);

        const files = await fs.readdir(DOWNLOAD_PATH);
        const pdfRecord = files.find(file =>file.includes('CCM_Report'));
        const excelRecord = files.find(file =>file.includes('Dashboard'));
        const onBoardingExcelRecord = files.find(file =>file.includes('OnBoarding'));
        const base64PdfRecord = pdfRecord? await convertPdfFileToBase64(path.join(DOWNLOAD_PATH,pdfRecord)):null;
        const base64ExcelRecord = excelRecord? await convertExcelFileToBase64(path.join(DOWNLOAD_PATH,excelRecord)):null;
        const base64OnBoardingRecord = onBoardingExcelRecord?await convertExcelFileToBase64(path.join(DOWNLOAD_PATH,onBoardingExcelRecord)):null;
       
        

        if (excelRecord || onBoardingExcelRecord) {
            const excelFilePath = excelRecord ? path.join(DOWNLOAD_PATH, excelRecord) : null;
            const onboardingFilePath = onBoardingExcelRecord ? path.join(DOWNLOAD_PATH, onBoardingExcelRecord) : null;

            const jsonData1 = excelFilePath ? await convertExcelToJson(excelFilePath, 'Dashboard') : [];
            const jsonData2 = onboardingFilePath ? await convertExcelToJson2(onboardingFilePath, 'OnBoarding') : [];

            const mergedData = [...jsonData1, ...jsonData2];
            await saveDataToMongo(mergedData);
        }

        await browser.close();
        return res.status(200).json({
            Status:"True",
            Code:"R-200 Successfully Retrieval",
            message:"All Record Retrieval  successfully",
            // pdfFile :base64PdfRecord,
            // excelFile :base64ExcelRecord
        })

    }catch(error){
        console.log(error)
         res.status(500).json({message:"Internal Server Error",error})
    }
}
const convertPdfFileToBase64 = async (filePath)=>{
    const fileData = await fs.readFile(filePath);
    const base64Data =  fileData.toString('base64');
    await fs.unlink(filePath);
    return base64Data
}
const convertExcelFileToBase64 = async (filePath)=>{
    const fileData = await fs.readFile(filePath);
    const base64Data =  fileData.toString('base64');
    return base64Data
}

const convertExcelToJson = async (filePath,fileIdentifier) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 7 }); 
    const jsonData = []; 
    const currentDate = new Date();

    rawData.forEach((row, rowIndex) => {
        const rowData = {};
        if (row[0]) rowData["Name"] = row[0];
        if (row[1]) rowData["Enrolling Physician Name"] = row[1];
        if (row[2]) rowData["CTMName"] = row[2];
        if (row[3]) rowData["EffortsSpentByDr.AgniPathak"] = row[3];
        if (row[4]) rowData["TotalTimeSpent"] = row[4];
        if (row[5]) rowData["CallCompliance/No. of days_since_lastcheckin"] = row[5];
        if (row[6] != null && row[6] !== "") rowData["CallCompliance/No. of attempts"] = row[6];
        if (row[7]) rowData["99490/Check_in_Status"] = row[7];
        if (row[8]) rowData["99490/Billing Readiness"] = row[8];
        if (row[9]) rowData["99439/Check_in_Status"] = row[9];
        if (row[10]) rowData["99439/Billing Readiness"] = row[10];
        if (row[11]) rowData["Notes"] = row[11];

        rowData["FileIdentifier"] = fileIdentifier;
        rowData["ProcessedDate"] = currentDate.toISOString();
        if (Object.keys(rowData).length > 0) {
            jsonData.push(rowData);
        }
    });
    await fs.unlink(filePath);

    return jsonData;
};
const convertExcelToJson2 = async (filePath,fileIdentifier) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 3 }); 
    const jsonData = []; 
    const currentDate = new Date();

    rawData.forEach((row, rowIndex) => {
        const rowData = {};
        if (row[0]) rowData["Org Name"] = row[0];
        if (row[1]) rowData["Name"] = row[1];
        if (row[2]) rowData["DOB"] = row[2];
        if (row[3]) rowData["Enrolling Physician"] = row[3];
        if (row[4]) rowData["Program Type"] = row[4];
        if (row[5]) rowData["Mobile Number"] = row[5];
        if (row[6]) rowData["Address"] = row[6];
        if (row[7]) rowData["Shipping Address"] = row[7];
        if (row[8]) rowData["Address Verified"] = row[8];
        if (row[9]) rowData["Insurance Details"] = row[9];
        if (row[10]) rowData["Insurance Covered"] = row[10];
        if (row[11]) rowData["Insurance Verified"] = row[11];
        if (row[12]) rowData["Device(Vital)"] = row[12];
        if (row[13]) rowData["OEM"] = row[13];
        if (row[14]) rowData["IMEI"] = row[14];

        rowData["FileIdentifier"] = fileIdentifier;
        rowData["ProcessedDate"] = currentDate.toISOString();
        if (Object.keys(rowData).length > 0) {
            jsonData.push(rowData);
        }
    });
    await fs.unlink(filePath);

    return jsonData;
};


// const saveDataToMongo = async (jsonData1 = [], jsonData2 = []) => {
//     const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         // Validate input data
//         if (!Array.isArray(jsonData1) || !Array.isArray(jsonData2)) {
//             throw new Error("Input data is not in the expected array format.");
//         }

//         // Map for quick lookup of Excel2 data by "Enrolling Physician"
//         const excel2Map = new Map();
//         jsonData2.forEach(record => {
//             if (record["Enrolling Physician"]) {
//                 excel2Map.set(record["Enrolling Physician"], record);
//             }
//         });

//         const mergedData = [];

//         // Merge data based on matching "EnrollingPhysicianName" and "Enrolling Physician"
//         jsonData1.forEach(record1 => {
//             const enrollingPhysicianName = record1["Enrolling Physician Name"];
//             const excel2Record = excel2Map.get(enrollingPhysicianName);

//             if (excel2Record) {
//                 // Merge data from Excel2 with Excel1, including the new fields
//                 const mergedRecord = { ...record1 };

//                 // Fields from Excel2 to merge
//                 if (excel2Record["Program Type"]) mergedRecord["Program Type"] = excel2Record["Program Type"];
//                 if (excel2Record["Mobile Number"]) mergedRecord["Mobile Number"] = excel2Record["Mobile Number"];
//                 if (excel2Record["Address"]) mergedRecord["Address"] = excel2Record["Address"];
//                 if (excel2Record["Shipping Address"]) mergedRecord["Shipping Address"] = excel2Record["Shipping Address"];
//                 if (excel2Record["Insurance Details"]) mergedRecord["Insurance Details"] = excel2Record["Insurance Details"];
//                 if (excel2Record["Insurance Covered"]) mergedRecord["Insurance Covered"] = excel2Record["Insurance Covered"];
//                 if (excel2Record["Insurance Verified"]) mergedRecord["Insurance Verified"] = excel2Record["Insurance Verified"];
//                 if (excel2Record["Device(Vital)"]) mergedRecord["Device(Vital)"] = excel2Record["Device(Vital)"];
//                 if (excel2Record["OEM"]) mergedRecord["OEM"] = excel2Record["OEM"];
//                 if (excel2Record["IMEI"]) mergedRecord["IMEI"] = excel2Record["IMEI"];

//                 // Add merged record to mergedData array
//                 mergedData.push(mergedRecord);
//             } else {
//                 // No match found, include Excel1 data
//                 mergedData.push(record1);
//             }
//         });

//         // Save merged data to MongoDB
//         for (const record of mergedData) {
//             const { Name, ...rest } = record;

//             await collection.updateOne(
//                 { Name },
//                 {
//                     $set: { ...rest },
//                     $push: { MergeHistory: rest.ProcessedDate }
//                 },
//                 { upsert: true }
//             );
//         }

//         console.log("Merged Excel data saved to MongoDB successfully");
//     } catch (error) {
//         console.error("Error saving data to MongoDB:", error);
//     } finally {
//         await client.close();
//     }
// };



const saveDataToMongo = async (jsonData1 = [], jsonData2 = []) => {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Validate input data
        if (!Array.isArray(jsonData1) || !Array.isArray(jsonData2)) {
            throw new Error("Input data is not in the expected array format.");
        }

        // Create a map for quick lookup of Excel2 data by "Enrolling Physician"
        const excel2Map = new Map();
        jsonData2.forEach(record => {
            // if (record["Enrolling Physician"]) {
            //     excel2Map.set(record["Enrolling Physician"].trim(), record);
            // }
            const enrollingPhysician = record["Enrolling Physician"]?.trim().toLowerCase();
            if (enrollingPhysician) {
                excel2Map.set(enrollingPhysician, record);
            }
        });

        const mergedData = [];

        // Merge data based on matching "EnrollingPhysicianName" and "Enrolling Physician"
        jsonData1.forEach(record1 => {
            const enrollingPhysicianName = record1["Enrolling Physician Name"]?.trim().toLowerCase(); // Normalize the field for comparison
            const excel2Record = excel2Map.get(enrollingPhysicianName);

            if (excel2Record) {
                // Merge data from Excel2 with Excel1
                const mergedRecord = { ...record1,...excel2Record };

                // Fields from Excel2 to merge
                if (excel2Record["Program Type"]) mergedRecord["Program Type"] = excel2Record["Program Type"];
                if (excel2Record["Mobile Number"]) mergedRecord["Mobile Number"] = excel2Record["Mobile Number"];
                if (excel2Record["Address"]) mergedRecord["Address"] = excel2Record["Address"];
                if (excel2Record["Shipping Address"]) mergedRecord["Shipping Address"] = excel2Record["Shipping Address"];
                if (excel2Record["Insurance Details"]) mergedRecord["Insurance Details"] = excel2Record["Insurance Details"];
                if (excel2Record["Insurance Covered"]) mergedRecord["Insurance Covered"] = excel2Record["Insurance Covered"];
                if (excel2Record["Insurance Verified"]) mergedRecord["Insurance Verified"] = excel2Record["Insurance Verified"];
                if (excel2Record["Device(Vital)"]) mergedRecord["Device(Vital)"] = excel2Record["Device(Vital)"];
                if (excel2Record["OEM"]) mergedRecord["OEM"] = excel2Record["OEM"];
                if (excel2Record["IMEI"]) mergedRecord["IMEI"] = excel2Record["IMEI"];

                // Add merged record to mergedData array
                mergedData.push(mergedRecord);
            } else {
                // No match found, include Excel1 data
                mergedData.push(record1);
            }
        });

        // Save merged data to MongoDB
        for (const record of mergedData) {
            const { Name, ...rest } = record;

            await collection.updateOne(
                { Name },
                {
                    $set: { ...rest },
                    $push: { MergeHistory: rest.ProcessedDate }
                },
                { upsert: true }
            );
        }

        console.log("Merged Excel data saved to MongoDB successfully");
    } catch (error) {
        console.error("Error saving data to MongoDB:", error);
    } finally {
        await client.close();
    }
};

    




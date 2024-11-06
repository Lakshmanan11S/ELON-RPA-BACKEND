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





const puppeteer = require('puppeteer');
const sleep =(ms)=>new Promise((resolve)=>setTimeout(resolve,ms))
const path = require('path')
const DOWNLOAD_PATH = path.join(__dirname,'downloads')
const fs = require('fs').promises;

exports.automationProcess=async(req,res)=>{
    const {first_name, last_name, dob, document_type, afterDate, beforeDate, emr_url, request_id}=req.body
    
    try{
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const client = await page.target().createCDPSession();
        await client.send('Page.setDownloadBehavior',{
            behavior:'allow',
            downloadPath:DOWNLOAD_PATH,
        })
        await page.setViewport({height:750,width:1500});
        await page.goto(emr_url);
        await page.type('#email',process.env.USERNAMEA,1000);
        await sleep(2000);
        await page.type('#password',process.env.PASSWORDA,1000);
        await sleep(2000);
        await page.click('#submit-login');
        await sleep(20000);
        await page.click('#dashboardHeaderRpm');
        await sleep(20000);
        await page.click('span.px-3.border-radius-10px.box-inset-shadow.card-value.heading-2.click-to-navigate-text')
        await sleep(10000);
        // await page.click('tr.graph-color > th.table-user-row.text-left.sticky-table-cells');

        await page.evaluate(() => {
            const rows = document.querySelectorAll('th');
            rows.forEach(row => {
                if (row.textContent.includes("Miss. Abigail Tay")) {
                    row.style.backgroundColor = "yellow"; 
                    row.setAttribute('data-click-target', 'true');
                }
            });
        });
        await sleep(2000)
        await page.click('th[data-click-target="true"]');
        await sleep(5000);
        await page.click('#ccmReportDownloadIcon');
        await sleep(2000);
        await page.click('button.button2.buttonOkBackground.btn.btn-primary');
        await sleep(60000);
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
        const excelRecord = files.find(file =>file.includes('Dashboard'))
        const base64PdfRecord = pdfRecord? await convertPdfFileToBase64(path.join(DOWNLOAD_PATH,pdfRecord)):null;
        const base64ExcelRecord = excelRecord? await convertExcelFileToBase64(path.join(DOWNLOAD_PATH,excelRecord)):null;
        await browser.close();
        return res.status(200).json({
            Status:"True",
            Code:"R-200 Successfully Retrieval",
            message:"All Record Retrieval  successfully",
            pdfFile :base64PdfRecord,
            excelFile :base64ExcelRecord
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
    await fs.unlink(filePath);
    return base64Data
}
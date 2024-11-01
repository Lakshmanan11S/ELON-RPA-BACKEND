const puppeteer = require('puppeteer');
const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve,ms))
const moment = require('moment');
const path = require('path');
const fs = require('fs').promises;

const DOWNLOAD_PATH = path.join(__dirname,'downloads');
exports.automationProcess = async (req,res) => {
  const {first_name, last_name, dob, document_type, afterDate, beforeDate, emr_url} = req.body
  const formatedDob = moment(dob,'YYYYMMDD').format('MM/DD/YYYY')
  const formatedAfterDate = moment(afterDate,'YYYYMMDD').format('MM/DD/YYYY')
  const formatedBeforeDate = moment(beforeDate,'YYYYMMDD').format('MM/DD/YYYY')
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const client = await page.target().createCDPSession();
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: DOWNLOAD_PATH,
        });
        await page.setViewport({height:750,width:1500})
    
        await page.goto(emr_url);
        await page.keyboard.press('Tab');
        await page.keyboard.type(process.env.USERNAMEA,{delay:300})
        await page.keyboard.press('Tab');
        await page.keyboard.type(process.env.PASSWORDA,{delay:300})
        await page.keyboard.press('Enter');
        await sleep(5000);
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Enter',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.type(first_name,2000);
        await page.keyboard.press('Tab');
        await page.keyboard.type(last_name,2000);
        await page.keyboard.press('Tab');
        await page.keyboard.type(formatedDob,2000);
        await sleep(3000);
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.type(formatedAfterDate,2000);
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.press('Tab',{delay:200});
        await page.keyboard.type(formatedBeforeDate,2000);
        await page.click('.btn.btn-secondary');
        await sleep(5000);
        await page.click('.nav-tabs .nav-item:nth-child(2) .nav-link')
        await sleep(3000);
        await page.click('.Chart.btn.btn-success')
        await sleep(5000);
        await page.click('.nav-tabs .nav-item:nth-child(3) .nav-link')
        await sleep(3000);
        await page.click('.Billing.btn.btn-success')
        await sleep(5000);

        const files = await fs.readdir(DOWNLOAD_PATH);
        const medicalPdf = files.find(file => file.includes('Chart'));
        const billingPdf =  files.find(file => file.includes('Billing'));

        const base64MedicalFile = medicalPdf ? await convertFileToBase64(path.join(DOWNLOAD_PATH, medicalPdf)) : null;
        const base64BillingFile = billingPdf ? await convertFileToBase64(path.join(DOWNLOAD_PATH, billingPdf)) : null;
        await browser.close();
        return res.status(200).json({
            Status :"True",
            Code:"R-200 Successfully Retrieval",
            message: "All Records Retrieval Successfully",
            medicalFile: base64MedicalFile,
            billingFile: base64BillingFile,
        });
    } catch (error) {
        console.error("Error in Puppeteer automation process", error);
        res.status(500).json({ message: "Puppeteer launch Error found" });
    
}}

const convertFileToBase64 = async (filePath) => {
    const fileData = await fs.readFile(filePath);
    const base64Data = fileData.toString('base64');
    await fs.unlink(filePath); // Delete the file after reading
    return base64Data;
};
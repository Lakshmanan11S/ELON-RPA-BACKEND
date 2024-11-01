const express = require('express');
const controller = require('./mainController');
const pdfController = require('./automationProcess');

const api = express.Router();

api.post('/patientDetails',controller.patientDetails);
api.post('/patientData',pdfController.automationProcess);


module.exports = api;
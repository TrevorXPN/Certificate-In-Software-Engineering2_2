const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const LoanApplication = require('./LoanApplication');

const app = express();
const port = 3000; // change if needed

const mongoURI = 'mongodb://localhost:27017/loanapplication';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(bodyParser.json());

// Create a new loan application record
app.post('/loan-application', async (req, res) => {
    try {
        const loanApplication = new LoanApplication(req.body);
        await loanApplication.save();
        res.status(201).json(loanApplication);
    } catch (error) {
        res.status(400).json({ error: 'Error creating loan application' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to fetch all loan application records
async function getAllLoanApplications() {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('loanapplication'); // Specify the database name

        // Fetch all loan application records from the 'loanapplication' collection
        const collection = db.collection('loanapplication');
        const loanApplications = await collection.find({}).toArray();
        return loanApplications;
    } catch (error) {
        console.error('Error fetching loan applications:', error);
        return [];
    } finally {
        client.close();
    }
}

// API endpoint to retrieve all loan applications
app.get('/loan-applications', async (req, res) => {
    try {
        const loanApplications = await getAllLoanApplications();
        res.status(200).json(loanApplications);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving loan applications' });
    }
});

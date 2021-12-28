require('dotenv').config();
const Airtable = require('airtable');
Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY
});
const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE);

exports.handler = async (event) => {
   
        const records = await table.firstPage();
        const formattedRecords = records.map((record) => ({
            id: record.id,
            fields: record.fields
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(formattedRecords)
        };
    
};
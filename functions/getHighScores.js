require('dotenv').config();
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
});
const base = Airtable.base('appKbu6WMQiKJEvAx');
const table = base.table('Table1');

exports.handler = async (event) => {
    try {
    const records = await table
    .select({
        sort:[{field: "score", direction: "desc"}],
        filterByFormula: `AND(name != " ", score > 0)`, 
    })
    .firstPage();
    const formattedRecords = records.map((record) => ({
        id: record.id,
        fields: record.fields,  
    }));

    return {
        statusCode: 200,
        body: JSON.stringify(formattedRecords),
    };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({err: "Records not found"}),
        };
    }

};
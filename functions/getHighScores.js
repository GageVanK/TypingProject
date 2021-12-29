var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key4cFwk1ynHHzTTL'
});
const base = Airtable.base('appKbu6WMQiKJEvAx');
const table = base.table("Table1");

exports.handler = async (event, context) => {
    try{
    const records = await table.select({}).firstPage();
    const formattedRecords = records.map((record) => ({
        if: record.id,
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
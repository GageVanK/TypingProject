const Airtable = require('airtable');

Airtable.configure({
    apiKey: 'key4cFwk1ynHHzTTL',
});

const base = require('airtable').base('appKbu6WMQiKJEvAx');
const table = base('TypingGame');

exports.handler = async (event) => {

    const records = await table.select().firstPage();
    const formattedRecords = records.map((record) => ({
        id: record.id,
        fields: record.fields
    }));

    return {
        statusCode: 200,
        body: JSON.stringify(formattedRecords),
    };
};
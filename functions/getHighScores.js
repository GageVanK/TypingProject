var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key4cFwk1ynHHzTTL'
});
const base = Airtable.base('appKbu6WMQiKJEvAx');
const table = base.table('TypingGame');

exports.handler = async (event, context) => {

    const records = await table.select({}).firstPage();

    return {
        statusCode: 200,
        body: JSON.stringify(records),
    };
};
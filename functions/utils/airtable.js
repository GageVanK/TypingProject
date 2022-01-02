require('dotenv').config();
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
});
const base = Airtable.base('appKbu6WMQiKJEvAx');
const table = base.table('Table1');

const getHighScores = async (filterEmptyRecords) => {
    const queryOptions = {
        sort: [{ field: 'score', direction: 'desc' }],
    };
    if (filterEmptyRecords) {
        queryOptions.filterByFormula = `AND(name != "", score > 0)`;
    }
    const records = await table.select(queryOptions).firstPage();
    const formattedRecords = records.map((record) => ({
        id: record.id,
        fields: record.fields,
    }));
    return formattedRecords;
};

module.exports = {
    table,
    getHighScores,
};
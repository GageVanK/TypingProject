require('dotenv').config();
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
});
const base = Airtable.base('appKbu6WMQiKJEvAx');
const table = base.table('Table1');

exports.handler = async (event) => {
//https://www.w3schools.com/tags/ref_httpmethods.asp
//POST is used to send data to a server to create/update a resource
if(event.httpMethod !== "POST")
{
    return {
        //405 error code = Method Not Allowed
        statusCode: 405,
        body: JSON.stringify({err: 'Method not Allowed'}),
    };

}
    
const { score, name } = JSON.parse(event.body);

if(typeof score === 'undefined' || !name){
    return{
        statusCode:400,
        body: JSON.stringify({err: "Bad Request"}),
    };
}

try {
    const records = await table
    .select({
        sort:[{field: "score", direction: "desc"}],
    })
    .firstPage();
    const formattedRecords = records.map((record) => ({
        id: record.id,
        fields: record.fields,  
    }));

    const lowestRec = formattedRecords[9];
    if(typeof lowestRec.fields.score === "undefined" || 
    score > lowestRec.fields.score){
        const updateRec = {
            id: lowestRec.id,
            fields: { name, score },
        };
        await table.update([updateRec]);
        return {
            statusCode: 200,
            body: JSON.stringify(updateRec),
        };
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({}),
        };
    }

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({err: "Could not update scores"}),
        };
    }

}; 
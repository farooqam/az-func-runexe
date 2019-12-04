const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const currentDir = context.executionContext.functionDirectory;
    const configText = fs.readFileSync(path.join(currentDir, 'config.json'));
    const config = JSON.parse(configText);

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
const mysql = require('mysql');
const conn = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE
});

const defaultHeaders = {
	"Access-Control-Allow-Methods": "*",
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Origin" : process.env.CORS_ORIGIN,
	"Access-Control-Allow-Credentials" : true
};

const responseError = {
    statusCode: 400,
    headers: defaultHeaders,
    body: JSON.stringify({
        message: 'error'
    })
};

const createEvent = (event, callback) => {
	const json = JSON.parse(event.body);
	const { organizer, venue, date } = json;

	if (!validateStringFields([organizer, venue, date])) {
		callback(null, responseError);
		return;
	}

	conn.query(`INSERT INTO event (organizer, venue, date) VALUES ("${organizer}", "${venue}", "${date}")`, function (error, result) {
	    if (error) {
		   callback(error, responseError);
		} else {
		   callback(undefined, {
		       statusCode: 200,
		       headers: defaultHeaders,
		       body: JSON.stringify({
		           message: 'ok'
		       })
		   });
		}
	 });
};

const getEvents = (event, callback) => {
	conn.query("SELECT * FROM event", function (error, results) {
	    if (error) {
		   callback(error, responseError);
		} else {
		   callback(undefined, {
		       statusCode: 200,
		       headers: defaultHeaders,
		       body: JSON.stringify({
		           message: 'ok',
		           results
		       })
		   });
		}
	 });
};

const updateEvent = (event, callback) => {
	const json = JSON.parse(event.body);
	const { id, organizer, venue, date } = json;

	if (!validateIdField(id)) {
		callback(null, responseError);
		return;
	}

	let query = 'UPDATE event SET';
	if (validateStringFields(organizer)) {
		query += ` organizer="${organizer}"`;
	}
	if (validateStringFields(venue)) {
		query += ` venue="${venue}"`;
	}
	if (validateStringFields(date)) {
		query += ` date="${date}"`;
	}

	query += ` WHERE id=${id}`;

	conn.query(query, function (error, result) {
	    if (error) {
		   callback(error, responseError);
		} else {
		   callback(undefined, {
		       statusCode: 200,
		       headers: defaultHeaders,
		       body: JSON.stringify({
		           message: 'ok'
		       })
		   });
		}
	 });
};

const deleteEvent = (event, callback) => {
	const json = JSON.parse(event.body);
	const { id } = json;

	if (!validateIdField(id)) {
		callback(null, responseError);
		return;
	}

	conn.query(`DELETE FROM event WHERE id=${id}`, function (error, result) {
	    if (error) {
		   callback(error, responseError);
		} else {
		   callback(undefined, {
		       statusCode: 200,
		       headers: defaultHeaders,
		       body: JSON.stringify({
		           message: 'ok'
		       })
		   });
		}
	 });
};

const validateIdField = (id) => {
	return id && typeof id === 'number' && id > 0;
};

const validateStringFields = (fields) => {
	return (fields && Array.isArray(fields)
		&& fields.every(field => !!field && field.trim() !== "" && field.length <= 50));
};

exports.handler = function(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;

    switch (event.httpMethod) {
        case 'POST':
        	createEvent(event, callback);
            break;
        case 'GET':
        	getEvents(event, callback);
            break;
        case 'PUT':
        	updateEvent(event, callback);
            break;
        case 'DELETE':
        	deleteEvent(event, callback);
            break;
        case 'OPTIONS':
        	callback(undefined, {
		       statusCode: 200,
		       headers: defaultHeaders,
		       body: JSON.stringify({
		           message: 'ok'
		       })
		   });
            break;
        default:
            callback(`Unknown operation: ${event.httpMethod}`);
    }
};
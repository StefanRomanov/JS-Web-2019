const staticFilesHandler = require('./static-file-handler');
const homeHandler = require('./home-handler');
const moviesHandler = require('./movie-handler');
const statusHandler = require('./status-handler');

module.exports = [staticFilesHandler, homeHandler, moviesHandler, statusHandler];
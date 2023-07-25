const config = require('./config/config');
const port = config.server.port;
const app = require("./index");

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
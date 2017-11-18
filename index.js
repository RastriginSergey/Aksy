const Koa = require('koa');
const config = require('config');
const app = new Koa();
const database = require('./libs/mongoose');
const middleware = require('./middlewares');
const router = require('./routes');

database.connect();
middleware.init(app);
router.init(app);

app.listen(config.get('PORT'));
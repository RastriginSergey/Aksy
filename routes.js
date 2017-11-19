const Router = require('koa-router');
const router = new Router();
const {auth, base, user, facebook} = require('./controllers');

router.get('/', base.renderWelcome);
router.get('/users/:id', user.getUser);
router.get('/users', user.getUsers);
router.get('/signin', auth.renderSignin);
router.get('/signup', auth.renderSignup);

// Facebook
router.get('/login/facebook', facebook.authenticate);
router.get('/connect/facebook', facebook.authorize);
router.get('/oauth/facebook', facebook.oauth);

// Local auth
router.post('/signin', auth.signin);
router.post('/signup', auth.signup);
router.post('/logout', auth.logout);

router.patch('/users/:id', user.updateUser);

router.delete('/users/:id', user.deleteUser);

exports.init = app => app.use(router.routes());
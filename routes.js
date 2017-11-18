const Router = require('koa-router')
const router = new Router()
const authCtrl = require('./controllers/auth')
const baseCtrl = require('./controllers/base')
const userCtrl = require('./controllers/user')

router.get('/', baseCtrl.renderWelcome)
router.get('/users/:id', userCtrl.getUser)
router.get('/users', userCtrl.getUsers)
router.get('/signin', authCtrl.renderSignin)
router.get('/signup', authCtrl.renderSignup)

router.post('/signin', authCtrl.signin)
router.post('/signup', authCtrl.signup)
router.post('/logout', authCtrl.logout)

router.patch('/users/:id', userCtrl.updateUser)

router.delete('/users/:id', userCtrl.deleteUser)

exports.init = app => app.use(router.routes())
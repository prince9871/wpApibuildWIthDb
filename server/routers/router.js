const Express=require('express')
const Router=Express.Router()
const createController=require('../controllers/createController')

Router.get('/api', (req, res) => {

  return res.send({ message: 'hello from api' })
})
Router.post('/dataCreate', createController.dbCreate) 
Router.post('/dataGet', createController.dbGet) 

module.exports = Router


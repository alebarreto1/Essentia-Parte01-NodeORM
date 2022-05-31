//routes/index.js

const bodyParser = require('body-parser')

const pessoas = require('./pessoasRoute.js')
//adicionamos as rotas de niveis e turmas
const niveis = require('./niveisRoute.js')
const turmas = require('./turmasRoute.js')

//adicionamos as instâncias de níveis e turmas
//e refatoramos um pouco a função
module.exports = app => {
 app.use(
   bodyParser.json(),
   pessoas,
   niveis,
   turmas
   )
 }
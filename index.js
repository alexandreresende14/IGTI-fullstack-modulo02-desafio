import express from 'express'
import { promises as fs } from 'fs'
import winston from 'winston'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import gradesRouter from './routes/grades.js'
import { swaggerDocument } from './docs.js'

const app = express()
app.use(express.json())
app.use('/grade', gradesRouter)

// Utilização do cors para habilitar acesso em outro servidor
app.use(cors())
//acesso ao swagger pelo localhost:3000/doc
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// acesso ao arquivo de forma global
global.gradesFile = 'grades.json'

// Formatação para a criação de log
const { printf, combine, label, timestamp } = winston.format
const myFormat = printf(({ timestamp, message, level, label }) => {
  return `${timestamp} ${label} ${level} ${message}`
})

// Criação de log
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control-api.log' }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat,
  ),
})

// localhost
app.listen(3000, async () => {
  try {
    await fs.readFile(global.gradesFile)
    global.logger.info('API Started.')
  } catch (error) {
    global.logger.error(error)
  }
})

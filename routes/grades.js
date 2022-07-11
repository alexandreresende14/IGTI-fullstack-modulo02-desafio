import express from 'express'
import { promises as fs } from 'fs'

const { readFile, writeFile } = fs

const router = express.Router()

// get para retornar todos os registros
router.get('/', async (_req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.gradesFile))
    res.send(data)
  } catch (error) {
    next(error)
  }
})

//  get para retornar um registro específico pelo id
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.gradesFile))
    const searchedId = req.params.id
    const searchedGrade = data.grades.find(
      (grade) => grade.id === parseInt(searchedId),
    )

    if (!searchedGrade) {
      throw new Error('Register not found.')
    }

    res.send(searchedGrade)
    global.logger.info('GET /grade/:id')
  } catch (error) {
    next(error)
  }
})

// post para inserir um novo registro
router.post('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.gradesFile))

    let newGrade = req.body
    if (
      !newGrade.student ||
      !newGrade.subject ||
      !newGrade.type ||
      newGrade.value == null
    ) {
      throw new Error('Student, subject, type and value are required')
    }

    newGrade = {
      id: data.nextId++,
      student: newGrade.student,
      subject: newGrade.subject,
      type: newGrade.type,
      value: newGrade.value,
      timestamp: new Date(),
    }

    data.grades.push(newGrade)

    await writeFile(global.gradesFile, JSON.stringify(data, null, 2))

    res.send(newGrade)
    global.logger.info('POST /grade')
  } catch (error) {
    next(error)
  }
})

// put para atualizar um registro informando o id
router.put('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.gradesFile))

    let updatedGrade = req.body
    if (
      !updatedGrade.student ||
      !updatedGrade.subject ||
      !updatedGrade.type ||
      updatedGrade.value == null
    ) {
      throw new Error('Student, subject, type and value are required')
    }

    const gradeId = parseInt(req.params.id)

    const gradeIndex = data.grades.findIndex((grade) => grade.id === gradeId)

    if (gradeIndex === -1) {
      throw new Error('Register id not found.')
    }

    updatedGrade = {
      id: gradeId,
      student: updatedGrade.student,
      subject: updatedGrade.subject,
      type: updatedGrade.type,
      value: updatedGrade.value,
      timestamp: new Date(),
    }

    data.grades[gradeIndex] = updatedGrade

    await writeFile(global.gradesFile, JSON.stringify(data, null, 2))

    res.send(updatedGrade)
  } catch (error) {
    next(error)
  }
})

// deletar um registro
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.gradesFile))
    const deletedGradeId = parseInt(req.params.id)

    const deletedGrade = data.grades.find(
      (grade) => grade.id === deletedGradeId,
    )
    if (!deletedGrade) {
      throw new Error('Register id not found.')
    }

    data.grades = data.grades.filter((grade) => grade.id !== deletedGradeId)

    await writeFile(global.gradesFile, JSON.stringify(data, null, 2))

    res.send(deletedGrade)
  } catch (error) {
    next(error)
  }
})

// get para somar todas as notas de um student e subject específicos
router.get('/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.gradesFile))
    const student = req.params.student
    const subject = req.params.subject

    const filteredGrades = data.grades.filter(
      (grade) => grade.student === student && grade.subject === subject,
    )
    if (!filteredGrades) {
      throw new Error('Student or subject not found.')
    }

    const totalStudentSubjectGrades = filteredGrades.reduce((acc, curr) => {
      return acc + curr.value
    }, 0)

    const sumStudentGrades = {
      student: student,
      subject: subject,
      total_value: totalStudentSubjectGrades,
    }

    res.send(sumStudentGrades)
    global.logger.info(JSON.stringify(sumStudentGrades))
  } catch (error) {
    next(error)
  }
})

// get para mostrar a nota média de um subject e type específicos
router.get('/media/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.gradesFile))
    const subject = req.params.subject
    const type = req.params.type

    const filteredGrades = data.grades.filter(
      (grade) => grade.subject === subject && grade.type === type,
    )
    if (!filteredGrades) {
      throw new Error('Subject or type not found.')
    }

    const totalMediaGrades =
      filteredGrades.reduce((acc, curr) => {
        return acc + curr.value
      }, 0) / filteredGrades.length

    const mediaGrades = {
      subject: subject,
      type: type,
      media: totalMediaGrades,
    }

    res.send(mediaGrades)
    global.logger.info(JSON.stringify(mediaGrades))
  } catch (error) {
    next(error)
  }
})

// tratamento de erros padrão
router.use((err, req, res, _next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
  res.status(400).send({ error: err.message })
})

export default router

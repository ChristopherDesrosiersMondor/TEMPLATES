// run the mondoDB_express_router snippet
const express = require('express')
const router = express.Router()
const Student = require('../Models/Student')

// Tous les Student
router.get('/', async (req, res) => {
    /*
        #swagger.tags = ['Student']
        #swagger.description = 'Endpoint to get all Student'
    */
    try {
        /*
            #swagger.responses[200] = {
                schema: { "$ref: "#/definitions/Student" },
                description: "Student added successfully."
            }
        */
        const students = await Student.find()
        res.status(200).send(students)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})


// Student par id
router.get('/:id', getStudent,  (req, res) => {
    /*
        #swagger.tags = ['Student']
        #swagger.description = 'Endpoint to get Student by id'
    */
    /*   #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Getting a Student by id',
            schema: { $ref: '#/definitions/Student' }
        }
    */
    try {
        /* #swagger.responses[200] = {
            description: 'Getting a Student successfully',
            schema: { $ref: '#/definitions/Student' }
        */
        res.status(200).send(res.student)
    } catch (err) {
        /* #swagger.responses[400] = {
            description: 'Failed to find student',
            schema: { 
                message: "Student not found in db."
             }
        */
        return res.status(404).json({ message: "Student not found in db."})
    }
})


// Creer un Student dans la base de donnees
router.post('/', async (req, res) => {
    /*
        #swagger.tags = ['Student']
        #swagger.description = 'Endpoint to add a new student'
    */
   /*   #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Adding new student.',
        schema: { $ref: '#/definitions/Student' }
   }
   */
    const student = new Student({
        titre: req.body.titre,
        synopsis: req.body.synopsis,
        annee: req.body.annee,
        duree: req.body.duree,
        posterImage: req.body.posterImage
    })

    try {
        const student = await student.save()
        /* #swagger.responses[201] = {
            description: 'Student successfully created',
            schema: { $ref: '#/definitions/Student' }
        */
        res.status(201).json(student)
    } catch (err) {
        /* #swagger.responses[400] = {
            description: 'Bad data from client',
            schema: { $ref: '#/definitions/Student' }
        */
        res.status(400).json({ message: err.message })
    }
})


router.patch('/:id', getStudent, async (req, res) => {
    /*
        #swagger.tags = ['Student']
        #swagger.description = 'Endpoint to patch a student'
    */
   /*   #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Getting confirmation of updated student',
        schema: { $ref: '#/definitions/Student' }
   }
   */
    if (req.body.titre != null && res.student.titre != req.body.titre) {
        res.student.titre = req.body.titre
    }

    try {
        const student = await res.student.save()
        res.status(200).json(student)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.delete('/:id', getStudent, async (req, res) => {
    /*
        #swagger.tags = ['Student']
        #swagger.description = 'Endpoint to delete a student by its id.'
    */
    try {
        await res.student.remove()
        res.status(200).json({ message: 'Student retirer de la base de donnees.'})
    } catch (err) {
        // Erreur au niveau du serveur - 500
        res.status(500).json({ message:err.message })
    }
})


async function getStudent(req, res, next) {
    let student
    try {
        student = await Student.findById(req.params.id)
        if (student == null) {
            return res.status(404).json({ message: "Student not found in db."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.student = student
    next()
}

module.exports = router
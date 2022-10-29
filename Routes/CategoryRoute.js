const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/CategoryController')

router.get('/view', EmployeeController.RetrieveCategories)
router.post('/create', EmployeeController.CreateCategory)
router.post('/update', EmployeeController.UpdateCategories)
router.post('/delete', EmployeeController.DeleteCategory)

module.exports = router
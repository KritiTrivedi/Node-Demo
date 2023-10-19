const express = require('express');
const { getAll, createRecord,createRecords, updateRecord, deleteRecord } = require('../controller/userController');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/", getAll);
router.post("/",createRecord);
router.post("/singup",createRecords);
router.put("/:id",updateRecord);
router.delete("/:id",deleteRecord);
module.exports = router
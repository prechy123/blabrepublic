const express = require("express");
const { getAll, createItem, deleteItem } = require('../controller/post.controller')
const { verify_jwt, verify_editor } = require('../middleware/authorization/authenticate');
const upload = require('../middleware/uploadFIles');


const router = express.Router();

router.get('/', verify_jwt, getAll);
router.post('/new', verify_jwt, verify_editor, upload.single('file'), createItem);
router.delete('/:id', verify_jwt, verify_editor, deleteItem);

module.exports = router;
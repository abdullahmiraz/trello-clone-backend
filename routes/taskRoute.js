const express = require("express");
const router = express.Router();

const fileUploadController = require("../controllers/fileUploadController");

// POST request to handle file upload
router.post("/upload", fileUploadController.upload);
router.get("/folder-details", fileUploadController.getFolderDetails);

module.exports = router;

const express = require("express");

const {
    addContact,
    getContacts,
    deleteContact
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add trusted contact
router.post("/", authMiddleware, addContact);

// Get trusted contacts
router.get("/", authMiddleware, getContacts);

// Delete trusted contact
router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;
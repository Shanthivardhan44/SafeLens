const Contact = require("../models/Contact");


// ==============================
// ADD CONTACT
// ==============================
const addContact = async (req, res) => {
    try {
        const { name, phone, relationship, isPrimary } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and phone are required"
            });
        }

        const contact = await Contact.create({
            user: req.user.userId,
            name,
            phone,
            relationship,
            isPrimary: isPrimary || false
        });

        res.status(201).json({
            success: true,
            message: "Trusted contact added successfully",
            contact
        });

    } catch (error) {
        console.error("Add contact error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while adding contact"
        });
    }
};


// ==============================
// GET CONTACTS
// ==============================
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            contacts
        });

    } catch (error) {
        console.error("Get contacts error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching contacts"
        });
    }
};


// ==============================
// DELETE CONTACT
// ==============================
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });

    } catch (error) {
        console.error("Delete contact error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while deleting contact"
        });
    }
};


module.exports = {
    addContact,
    getContacts,
    deleteContact
};
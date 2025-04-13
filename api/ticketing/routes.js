const express = require("express");
const router = express.Router();
const TicketController = require("./ticket.controller");

// POST /tickets
router.post("/", TicketController.create);

// GET /tickets
router.get("/", TicketController.getAll);

// GET /tickets/:id
router.get("/:id", TicketController.getById);

// PUT /tickets/:id
router.put("/:id", TicketController.update);

// DELETE /tickets/:id
router.delete("/:id", TicketController.delete);

module.exports = router;

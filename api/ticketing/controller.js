const TicketService = require("./ticket.service");

class TicketController {
  async create(req, res) {
    try {
      const { userId, subject, message, category, priority } = req.body;
      const ticket = await TicketService.createTicket({ userId, subject, message, category, priority });
      res.status(201).json(ticket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const tickets = await TicketService.getTickets();
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const ticket = await TicketService.getTicketById(req.params.id);
      if (!ticket) return res.status(404).json({ error: "Ticket not found" });
      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const ticket = await TicketService.updateTicket(req.params.id, req.body);
      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await TicketService.deleteTicket(req.params.id);
      res.status(200).json({ message: "Ticket deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TicketController();

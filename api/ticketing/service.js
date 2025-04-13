const Ticket = require("./ticket.model");

class TicketService {
  async createTicket(data) {
    return await Ticket.create(data);
  }

  async getTickets() {
    return await Ticket.find().populate("userId", "name email");
  }

  async getTicketById(id) {
    return await Ticket.findById(id).populate("userId", "name email");
  }

  async updateTicket(id, data) {
    data.updatedAt = new Date();
    return await Ticket.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTicket(id) {
    return await Ticket.findByIdAndDelete(id);
  }
}

module.exports = new TicketService();

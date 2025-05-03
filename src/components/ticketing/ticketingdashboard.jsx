// src/components/ticketing/TicketingDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function TicketingDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("..app/api/ticketing"); // Updated endpoint to match backend routes
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!statusUpdate || !selectedTicket) return;
    try {
      await axios.put(`..app/api/ticketing/${selectedTicket._id}`, {
        status: statusUpdate,
      });
      fetchTickets();
      setSelectedTicket(null);
      setStatusUpdate("");
    } catch (err) {
      console.error("Error updating ticket status:", err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Support Tickets</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        tickets.map((ticket) => (
          <Card key={ticket._id} className="shadow-md">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{ticket.subject}</h2>
                <Badge>{ticket.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">Ticket ID: {ticket._id}</p>
              <p className="text-sm">Category: {ticket.category}</p>
              <p className="text-sm">Priority: {ticket.priority}</p>
              <p className="text-sm">Created At: {new Date(ticket.createdAt).toLocaleString()}</p>
              <p className="text-sm">User: {ticket.userId?.name || "N/A"} ({ticket.userId?.email})</p>
              <p className="text-sm">Message: {ticket.message}</p>
              <div className="flex items-center gap-2 pt-2">
                <Input
                  placeholder="Update status (e.g., in-progress)"
                  value={selectedTicket?._id === ticket._id ? statusUpdate : ""}
                  onChange={(e) => {
                    setSelectedTicket(ticket);
                    setStatusUpdate(e.target.value);
                  }}
                />
                <Button
                  onClick={handleStatusUpdate}
                  disabled={selectedTicket?._id !== ticket._id || !statusUpdate}
                >
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

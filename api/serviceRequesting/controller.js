const ServiceRequestService = require("./service");

class ServiceRequestController {
  async createRequest(req, res) {
    try {
      const { userId, serviceType, description, location, reason } = req.body;

      if (!location || !location.latitude || !location.longitude || !location.address) {
        return res.status(400).json({ error: "Location details are required" });
      }

      if (!reason) {
        return res.status(400).json({ error: "Reason for service request is required" });
      }

      const request = await ServiceRequestService.createServiceRequest({
        userId,
        serviceType,
        description,
        location,
        reason
      });

      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRequests(req, res) {
    try {
      const requests = await ServiceRequestService.getServiceRequests();
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateRequest(req, res) {
    try {
      const updatedRequest = await ServiceRequestService.updateServiceRequest(req.params.id, req.body);
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRequest(req, res) {
    try {
      await ServiceRequestService.deleteServiceRequest(req.params.id);
      res.status(200).json({ message: "Service Request Deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ServiceRequestController();

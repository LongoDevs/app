const ServiceRequest = require("./model");

class ServiceRequestService {
  async createServiceRequest(data) {
    return await ServiceRequest.create(data);
  }

  async getServiceRequests() {
    return await ServiceRequest.find().populate("userId", "name"," email"); // Show user details
  }

  async updateServiceRequest(id, updateData) {
    return await ServiceRequest.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteServiceRequest(id) {
    return await ServiceRequest.findByIdAndDelete(id);
  }
}

module.exports = new ServiceRequestService();

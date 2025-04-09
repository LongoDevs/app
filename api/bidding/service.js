const { Job, Bid } = require("./model");

class JobService {
  async postJob(data) {
    return await Job.create(data);
  }

  async getJobs() {
    return await Job.find().populate("postedBy", "name email");
  }

  async closeJob(jobId) {
    return await Job.findByIdAndUpdate(jobId, { status: "closed" }, { new: true });
  }

  async placeBid(data) {
    return await Bid.create(data);
  }

  async getBidsForJob(jobId) {
    return await Bid.find({ jobId }).populate("bidderId", "name email");
  }
}

module.exports = new JobService();

const JobService = require("./service");

class JobController {
  async createJob(req, res) {
    try {
      const { title, description, budget, postedBy } = req.body;
      const job = await JobService.postJob({ title, description, budget, postedBy });
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllJobs(req, res) {
    try {
      const jobs = await JobService.getJobs();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async closeJob(req, res) {
    try {
      const job = await JobService.closeJob(req.params.jobId);
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async placeBid(req, res) {
    try {
      const { jobId, bidderId, amount, message } = req.body;
      const bid = await JobService.placeBid({ jobId, bidderId, amount, message });
      res.status(201).json(bid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBids(req, res) {
    try {
      const bids = await JobService.getBidsForJob(req.params.jobId);
      res.status(200).json(bids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new JobController();

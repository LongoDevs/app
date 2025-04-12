const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

exports.approveService = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.service.update({
      where: { id },
      data: { status: 'approved' }
    });

    res.status(200).json({ message: 'Service approved', service: updated });
  } catch (error) {
    console.error('Error approving service:', error);
    res.status(500).json({ message: 'Failed to approve service' });
  }
};

exports.rejectService = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.service.update({
      where: { id },
      data: { status: 'rejected' }
    });

    res.status(200).json({ message: 'Service rejected', service: updated });
  } catch (error) {
    console.error('Error rejecting service:', error);
    res.status(500).json({ message: 'Failed to reject service' });
  }
};

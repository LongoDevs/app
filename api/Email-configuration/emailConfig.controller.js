const { sendEmail } = require('./lService'); // Assuming mailService.js is in the services folder

// Controller to handle sending the email
exports.sendEmail = async (req, res) => {
  const { emailTemplate, users, subject, message } = req.body;

  try {
    // Prepare email content based on the template
    let htmlContent = '';
    switch (emailTemplate) {
      case 'welcome':
        htmlContent = `<p>Welcome to our service! ${message}</p>`;
        break;
      case 'service-update':
        htmlContent = `<p>Here is your service update: ${message}</p>`;
        break;
      case 'newsletter':
        htmlContent = `<p>Latest Newsletter: ${message}</p>`;
        break;
      default:
        htmlContent = `<p>${message}</p>`;
    }

    // Call the mail service to send the email
    await sendEmail(users, subject, htmlContent);

    res.status(200).send({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Error sending email' });
  }
};

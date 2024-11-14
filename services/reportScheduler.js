const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { format } = require('date-fns');

class ReportScheduler {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    this.schedules = new Map();
  }

  async sendReport(type, recipients) {
    try {
      // Generate report data
      const reportData = await this.generateReport(type);
      
      // Send email
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: recipients.join(', '),
        subject: `${type.charAt(0).toUpperCase() + type.slice(1)} Shift Report - ${format(new Date(), 'PP')}`,
        html: reportData
      });

      console.log(`${type} report sent successfully`);
    } catch (error) {
      console.error(`Error sending ${type} report:`, error);
    }
  }

  async generateReport(type) {
    // Generate report HTML based on type
    // This would include your report generation logic
    return `
      <h1>Shift Report</h1>
      <p>Report Type: ${type}</p>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <!-- Add your report content here -->
    `;
  }

  scheduleReport(type, config) {
    // Clear existing schedule if any
    if (this.schedules.has(type)) {
      this.schedules.get(type).destroy();
    }

    if (!config.enabled) {
      return;
    }

    let cronExpression = '';
    const [hours, minutes] = config.time.split(':');

    switch (type) {
      case 'daily':
        cronExpression = `${minutes} ${hours} * * *`;
        break;
      case 'weekly':
        const dayNum = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          .indexOf(config.day);
        cronExpression = `${minutes} ${hours} * * ${dayNum}`;
        break;
      case 'monthly':
        cronExpression = `${minutes} ${hours} ${config.day} * *`;
        break;
    }

    const job = cron.schedule(cronExpression, () => {
      this.sendReport(type, config.emails);
    });

    this.schedules.set(type, job);
  }

  updateSchedules(schedules) {
    Object.entries(schedules).forEach(([type, config]) => {
      this.scheduleReport(type, config);
    });
  }
}

module.exports = new ReportScheduler();
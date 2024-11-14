const mysql = require('mysql2/promise');
require('dotenv').config();

class ShiftComparisonService {
  constructor() {
    this.actualShiftsDb = mysql.createPool({
      host: process.env.ACTUAL_SHIFTS_DB_HOST,
      user: process.env.ACTUAL_SHIFTS_DB_USER,
      password: process.env.ACTUAL_SHIFTS_DB_PASSWORD,
      database: process.env.ACTUAL_SHIFTS_DB_NAME
    });
  }

  async getActualShifts(startDate, endDate) {
    try {
      const [rows] = await this.actualShiftsDb.execute(
        'SELECT * FROM actual_shifts WHERE date BETWEEN ? AND ?',
        [startDate, endDate]
      );
      return rows;
    } catch (error) {
      console.error('Error fetching actual shifts:', error);
      throw error;
    }
  }

  async compareShifts(scheduledShifts, actualShifts) {
    const comparison = {
      matchedShifts: [],
      missingShifts: [],
      extraShifts: [],
      lateArrivals: [],
      earlyDepartures: []
    };

    // Compare scheduled vs actual shifts
    scheduledShifts.forEach(scheduled => {
      const actual = actualShifts.find(
        a => a.employeeId === scheduled.employeeId && a.date === scheduled.date
      );

      if (!actual) {
        comparison.missingShifts.push(scheduled);
      } else {
        const timeDiffStart = this.calculateTimeDiff(scheduled.startTime, actual.startTime);
        const timeDiffEnd = this.calculateTimeDiff(scheduled.endTime, actual.endTime);

        if (timeDiffStart > 15) { // 15 minutes threshold
          comparison.lateArrivals.push({ scheduled, actual, difference: timeDiffStart });
        }
        if (timeDiffEnd < -15) { // 15 minutes threshold
          comparison.earlyDepartures.push({ scheduled, actual, difference: Math.abs(timeDiffEnd) });
        }
        comparison.matchedShifts.push({ scheduled, actual });
      }
    });

    return comparison;
  }

  calculateTimeDiff(time1, time2) {
    const [h1, m1] = time1.split(':').map(Number);
    const [h2, m2] = time2.split(':').map(Number);
    return ((h2 * 60 + m2) - (h1 * 60 + m1));
  }
}

module.exports = new ShiftComparisonService();
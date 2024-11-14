// /services/reportService.js
import axios from 'axios';

export class ReportService {
  constructor() {
    this.base_url = 'http://localhost:3000/api'; // Adjust based on your backend URL
  }

  // Fetch attendance data
  async getAttendanceData(startDate, endDate) {
    try {
      const response = await axios.get(`${this.base_url}/attendance`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Fetch scheduled shifts
  async getScheduledShifts(startDate, endDate) {
    try {
      const response = await axios.get(`${this.base_url}/shifts`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get comparison between scheduled and actual hours
  async getHoursComparison(startDate, endDate) {
    try {
      const response = await axios.get(`${this.base_url}/hours-comparison`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate new report
  async generateReport(reportConfig) {
    try {
      const response = await axios.post(`${this.base_url}/reports/generate`, reportConfig);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get employee attendance logs
  async getEmployeeLogs(employeeId, startDate, endDate) {
    try {
      const response = await axios.get(`${this.base_url}/employee-logs`, {
        params: { employeeId, startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get variance analysis
  async getVarianceAnalysis(startDate, endDate) {
    try {
      const response = await axios.get(`${this.base_url}/variance-analysis`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Helper method to handle errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        status: error.response.status,
        message: error.response.data.message || 'שגיאת שרת',
        error: error.response.data
      };
    } else if (error.request) {
      // Request made but no response received
      return {
        status: 503,
        message: 'לא ניתן להתחבר לשרת',
        error: error.request
      };
    } else {
      // Error in request setup
      return {
        status: 400,
        message: 'שגיאה בבקשה',
        error: error.message
      };
    }
  }
}

// Create singleton instance
export const reportService = new ReportService();

// Export types
export const ReportTypes = {
  ATTENDANCE: 'attendance',
  HOURS_COMPARISON: 'hours_comparison',
  VARIANCE: 'variance',
  EMPLOYEE_LOGS: 'employee_logs'
};
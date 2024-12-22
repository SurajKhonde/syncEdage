import fs from 'fs';
import path from 'path';

const logDirectory = path.join(__dirname, 'errorLogs');

// Create a directory for today's date if it doesn't exist
const createLogDirectoryForToday = () => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const dailyLogDir = path.join(logDirectory, today);
  if (!fs.existsSync(dailyLogDir)) {
    fs.mkdirSync(dailyLogDir, { recursive: true });
  }
  return dailyLogDir;
};

export const logError = (error: Error, functionName: string, additionalInfo: string = '') => {
  const dailyLogDir = createLogDirectoryForToday(); // Get today's log directory
  const timestamp = new Date().toISOString();
  const errorId = `${timestamp.replace(/[-:.]/g, '')}`;
  const errorMessage = error.message || 'Unknown error';
  const errorStack = error.stack || 'No stack trace available';

  const errorLog = `
    <html>
      <head>
        <title>Error Report - ${errorId}</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          h1 { color: #ff0000; }
          .error-details { background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          .info { color: #333; font-size: 16px; }
          pre { background-color: #f7f7f7; padding: 10px; border-radius: 4px; font-size: 14px; }
        </style>
      </head>
      <body>
        <h1>Error Report</h1>
        <div class="error-details">
          <p class="info"><strong>Error ID:</strong> ${errorId}</p>
          <p class="info"><strong>Function Name:</strong> ${functionName}</p>
          <p class="info"><strong>Timestamp:</strong> ${timestamp}</p>
          <p class="info"><strong>Message:</strong> ${errorMessage}</p>
          <pre><strong>Stack Trace:</strong>\n${errorStack}</pre>
          ${additionalInfo ? `<p class="info"><strong>Additional Info:</strong> ${additionalInfo}</p>` : ''}
        </div>
        <footer>
          <p>Generated by Error Logging System</p>
        </footer>
      </body>
    </html>
  `;

  const errorFilePath = path.join(dailyLogDir, `error_${errorId}.html`);
  fs.writeFileSync(errorFilePath, errorLog);

  return `file://${errorFilePath}`;
};
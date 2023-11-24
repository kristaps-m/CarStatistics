const { exec } = require('child_process');
const open = require('open');
const path = require('path');

async function runCommands() {
  try {
    // Next.js app commands
    const nextjsFolder = 'car_statistics-nextjs-app';
    await runCommand(`cd ${nextjsFolder} && npm run dev`);
    
    // .NET API commands
    const dotnetApiFolder = 'CarStatisticsAPI/CarStatisticsAPI';
    await runCommand(`cd ${dotnetApiFolder} && dotnet run`);
    
    // Open web browser
    await open('http://localhost:3000');
  } catch (error) {
    console.error('Error:', error.message || error);
  }
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(stdout);
      console.error(stderr);
      resolve();
    });
  });
}

runCommands();

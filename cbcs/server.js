const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/ask-gemini', async (req, res) => {
  const { query } = req.body;
  let stdoutData = '';
  let stderrData = '';

  const pythonExecutable = '.\\rag-backend\\venv\\Scripts\\python.exe';
  const pythonProcess = spawn(pythonExecutable, ['rag-backend/query.py', query]);

  pythonProcess.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    stdoutData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    stderrData += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.json({ answer: stdoutData.trim() });
    } else {
      console.error(`Python script exited with code ${code}. Error: ${stderrData}`);
      res.status(500).json({ error: `Python script error: ${stderrData}` });
    }
  });
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
const express = require('express'); //express 모듈 불러오기
const cors = require('cors'); //cors 모듈 불러오기
const path = require('path');
// const { spawn } = require('child_process');
const { error } = require('console');
const spawn = require('child_process').spawn;
const port = 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/random/:count', (req, res) => {
  const scriptPath = path.join(__dirname, 'resolver.py');
  const pythonPath = path.join(__dirname, 'venv', 'Scripts', 'python.exe');

  const result = spawn(pythonPath, [scriptPath]);

  let responseData = '';

  result.stdout.on('data', function (data) {
    responseData += data.toString();
  });

  result.on('close', (code) => {
    if (code === 0) {
      const jsonResponse = JSON.parse(responseData);
      res.status(200).json(jsonResponse);
    } else {
      res.status(500).json({ error: `child process exited with code ${code}` });
    }
  });

  result.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  res.send('random request');
});

app.get('/latest/:count', (req, res) => {
  res.send('latest');
});

app.get('/genres/:genres/:count', (req, res) => {
  res.send('genres');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

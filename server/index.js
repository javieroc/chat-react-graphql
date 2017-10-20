import config from './config';
import app from './app';

const { port } = config;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

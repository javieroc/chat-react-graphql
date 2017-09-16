const config = require('./config')
const app = require('./app')

const port = config.port

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

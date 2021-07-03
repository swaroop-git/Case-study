const app = require('./index');
const port = process.env.PORT || 2000;

// Server
app.app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});

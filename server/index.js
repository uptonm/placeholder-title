const app = require('./app');

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${process.env.PORT || 8000}`);
});

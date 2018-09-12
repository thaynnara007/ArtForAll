const app = require('./index');
const PORT = process.env.PORT || 3000;

console.log(process.env);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
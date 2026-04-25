const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Keep startup log minimal for hosting providers.
  console.log(`Server is running on port ${PORT}`);
});

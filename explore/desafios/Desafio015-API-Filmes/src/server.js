const express = require("express");
const routes = require("./routes")

const app = express();

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Serving is running in port ${PORT}`));
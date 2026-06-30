const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const scanRoutes = require("./routes/scanRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const helmet = require("helmet");
const compression = require("compression");
const limiter = require("./middleware/rateLimiter");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(limiter);
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(errorHandler);
app.use(cookieParser());
app.disable("x-powered-by");
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", scanRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.send("EcoLife API Running 🚀");
});

module.exports = app;
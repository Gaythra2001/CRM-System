const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const leadRoutes = require("./routes/leadRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { PORT } = require("./config/config");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/tasks", taskRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
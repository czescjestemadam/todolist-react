import express from "express";
import cors from "cors";

import * as auth from "./routers/auth.js";
import * as lists from "./routers/lists.js";
import * as notes from "./routers/notes.js";
import * as last from "./routers/last.js";
import * as shared from "./routers/shared.js";

import { checkTokenMiddleware } from "./authUtils.js";


const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/api/auth", auth.router);

app.use("/api/lists", checkTokenMiddleware, lists.router);
app.use("/api/notes", checkTokenMiddleware, notes.router);
app.use("/api/last", checkTokenMiddleware, last.router);
app.use("/api/shared", shared.router);

app.get("/api/status", checkTokenMiddleware, (req, res) => res.json({ status: "jajo" }));
app.all("/", (req, res) => res.redirect("/api/status"));

app.listen(port, () => console.log(`[${new Date().toLocaleTimeString()}] listening on ${port}`));

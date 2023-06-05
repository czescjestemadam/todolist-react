import { checkCredentialsMiddleware, checkTokenMiddleware, getUserByName, createUser, loginUser, registerCheckCredentialsMiddleware } from "../authUtils.js";

import { Router } from "express";

export const router = Router();

router.post("/", checkCredentialsMiddleware, (req, res) =>
{
	if (!getUserByName(req.user.name))
		return res.json({ error: "Invalid user" });

	loginUser(req.user).then(user =>
	{
		if (user)
			return res.json(user);
		res.status(401).json({ error: "Wrong credentials" });
	});
});

router.put("/", checkCredentialsMiddleware, registerCheckCredentialsMiddleware, (req, res) =>
{
	if (getUserByName(req.user.name))
		return res.status(409).json({ error: "User already exists" });

	createUser(req.user).then(user => res.status(201).json({ token: user.token }));
});

// todo add removing user

router.get("/", checkTokenMiddleware, (req, res) => res.json(req.user));

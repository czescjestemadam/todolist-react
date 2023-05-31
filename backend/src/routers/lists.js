import { Router } from "express";

import { checkElementErrors, getPreviews, getUserElement, putElement, removeUserElement } from "../contentUtils.js";
import { listDB } from "../db.js";

export const router = Router();

router.get("/previews", (req, res) =>
{
	res.json(getPreviews(req.user.id, listDB));
});

router.get("/:id", (req, res) =>
{
	const element = getUserElement(req.user.id, req.params.id, listDB);
	if (!element)
		return res.status(404).json({ error: "List not found" });

	res.json(element);
});

router.delete("/:id", (req, res) =>
{
	const element = removeUserElement(req.user.id, req.params.id, listDB);
	if (!element)
		return res.status(404).json({ error: "List not found" });

	res.status(202).json(element);
});

router.put("/new", (req, res) =>
{
	const element = req.body;

	const elementError = checkElementErrors(element);
	if (elementError)
		return res.status(400).json(elementError);

	const id = putElement(element, req.user.id, listDB);
	res.status(201).json({ id: id });
});

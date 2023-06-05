// import { listDB, noteDB } from "./db.js";

import genRandomv1 from "./uuid.js";

export function getPreviews(userId, db)
{
	const userElements = structuredClone(db.data.filter(e => e.owner === userId));
	for (const element of userElements)
		delete element.content;
	return userElements;
}

function getElement(id, db)
{
	for (const element of db.data)
		if (element.id === id)
			return element;
	return null;
}

export function getUserElement(userId, elementId, db)
{
	const element = getElement(elementId, db);
	if (element && element.owner === userId)
		return element;
	return null;
}

export function removeUserElement(userId, elementId, db)
{
	let idx = -1;

	for (const element of db.data)
	{
		if (element.id === elementId && element.owner === userId)
		{
			idx = db.data.indexOf(element);
			break;
		}
	}

	if (idx < 0)
		return null;

	const element = db.data.splice(idx, 1);
	db.write();
	return element;
}

// returns element id
export function putElement(element, userId, db)
{
	const e = element;
	e.id = genRandomv1();
	e.owner = userId;
	e.created_at = Date.now();

	db.data.push(e);
	db.write();

	return e.id;
}

export function checkElementErrors(element)
{
	if (!element.title)
		return { error: "No title" };

	if (element.title.length > 128)
		return { error: "Title too long (128)" };

	if (!element.content)
		return { error: "No content" };

	if (element.content.length > 8192)
		return { error: "Content too long (8192)" };

	return null;
}

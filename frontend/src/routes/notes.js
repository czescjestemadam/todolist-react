import { createEditElementFunc, createElementAction, createElementFunc, createElementLoader, createElementsFunc } from "./utils/elementutils";

export function notesLoader({ request })
{
	return null;
}

export const Notes = createElementsFunc("note");

export const noteLoader = createElementLoader("note");

export const noteAction = createElementAction("note");

export const EditNote = createEditElementFunc("note");

export const Note = createElementFunc("note");

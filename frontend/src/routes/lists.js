import { createEditElementFunc, createElementAction, createElementFunc, createElementLoader, createElementsFunc } from "./utils/elementutils";

export function listsLoader({ params })
{
	return null;
}

export const Lists = createElementsFunc("list");

export const listLoader = createElementLoader("list");

export const listAction = createElementAction("list");

export const EditList = createEditElementFunc("list");

export const List = createElementFunc("list");

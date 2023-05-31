import { useOutletContext, useLoaderData, redirect, Form, Link } from "react-router-dom";
import { useState } from "react";

import { api } from "../../utils/api";

import HomeLink from "../components/homelink";

export function createElementsFunc(element)
{
	return function ()
	{
		const previews = useOutletContext().previews[`${element}s`];

		const elements = [];
		for (const preview of previews)
			elements.push(
				<HomeLink key={preview.id} link={`/${element}/${preview.id}`}>
					<code>[{preview.id.substring(0, 6)}]</code> {preview.title}
				</HomeLink>
			);

		return elements;
	};
}

export function createElementLoader(element)
{
	return async function ({ params })
	{
		const { id } = params;

		const res = await api.get(`/api/${element}s/${id}`);
		if (res.data)
			return res.data;

		return null;
	};
}

export function createElementAction(element)
{
	return async function ({ params, request })
	{
		if (request.method === "DELETE")
		{
			await api.delete(`/api/${element}s/${params.id}`);
			return redirect(`/${element}s`);
		}
		else if (request.method === "PUT")
		{
			const data = Object.fromEntries(await request.formData());
			const res = await api.put(`/api/${element}s/new`, data);
			return redirect(`/${element}/${res.data.id}`);
		}

		return null;
	};
}

export function createEditElementFunc(element)
{
	return function ()
	{
		let data = useLoaderData();

		const [title, setTitle] = useState(data ? data.title : "Title");
		const [content, setContent] = useState(data ? data.content : "Content");

		return (
			<div className={`element ${element}-edit`}>
				<Form method="put">
					<p>
						<input type="text" name="title" className="element-edit" value={title} onChange={e => setTitle(e.target.value)}/>
					</p>
					<p>
						<textarea name="content" className="element-edit" value={content} onChange={e => setContent(e.target.value)}/>
					</p>
					<input type="submit" value="Save"/>
				</Form>
			</div>
		);
	};
}

export function createElementFunc(element)
{
	return function ()
	{
		const { title, content } = useLoaderData();

		return (
			<>
				<div className={`element ${element}`}>
					<p>{title}</p>
					<p>{content}</p>
				</div>
				<div>
					<Form method="delete">
						<input type="submit" value="Delete" className="red"/>
					</Form>
					{/*<Link>*/}
					{/*	<input type="submit" value="Delete" className="red"/>*/}
					{/*</Link>*/}
				</div>
			</>
		);
	};
}

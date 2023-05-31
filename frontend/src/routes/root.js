import { redirect, Outlet, useLoaderData } from "react-router-dom";

import * as store from "../utils/localStor";
import { api, apiSetup } from "../utils/api";

import Header from "./components/header";
import Navbar from "./components/navbar";

export async function rootLoader({ request })
{
	if (store.getServer() == null || store.getToken() == null)
		return redirect("/login");

	apiSetup(store.getServer(), store.getToken());

	try
	{
		const user = await api.get("/api/auth");
		if (user.status !== 200)
			return redirect("/login");

		const status = await api.get("/api/status");

		const listsPreviews = await api.get("/api/lists/previews");
		const notesPreviews = await api.get("/api/notes/previews");

		return {
			status: status.data.status,
			user: user.data,
			previews: {
				lists: listsPreviews.data,
				notes: notesPreviews.data
			}
		};
	}
	catch (e)
	{
		store.clearServerToken();
		console.error(e.message);
		return redirect("/login");
	}
}

export default function Root()
{
	const { user, status, previews } = useLoaderData();

	return (
		<main>
			<Header user={user} apiStatus={status} previews={previews}/>
			<div>
				<Navbar previews={previews}/>
				<div className="content">
					<Outlet context={{ previews }}/>
				</div>
			</div>
		</main>
	);
}

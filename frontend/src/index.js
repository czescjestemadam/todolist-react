import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Login, { loginLoader } from "./routes/login";
import Home, { homeLoader } from "./routes/home";
import { Lists, List, listsLoader, listLoader, EditList, listAction } from "./routes/lists";
import { Notes, Note, notesLoader, noteLoader, EditNote, noteAction } from "./routes/notes";
import ErrorPage from "./routes/error/errorpage";
import ContentError from "./routes/error/contenterror";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login/>,
		loader: loginLoader
	},
	{
		path: "/",
		element: <Root/>,
		loader: rootLoader,
		// errorElement: <ErrorPage/>,
		children: [
			{
				index: true,
				element: <Home/>,
				loader: homeLoader
			},
			{
				path: "lists",
				element: <Lists/>
			},
			{
				path: "list/new",
				element: <EditList/>,
				action: listAction,
				errorElement: <ContentError/>
			},
			{
				path: "list/:id",
				element: <List/>,
				loader: listLoader,
				action: listAction,
				errorElement: <ContentError/>
			},
			{
				path: "notes",
				element: <Notes/>
			},
			{
				path: "note/new",
				element: <EditNote/>,
				action: noteAction,
				errorElement: <ContentError/>
			},
			{
				path: "note/:id",
				element: <Note/>,
				loader: noteLoader,
				action: noteAction,
				errorElement: <ContentError/>
			}
		]
	}
]);

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<RouterProvider router={router}/>
	</StrictMode>
);

import { useState } from "react";

import NavElement from "./navelement";
import ListsBar from "./listsbar";
import NotesBar from "./notesbar";

export default function Navbar({ previews })
{
	const [visible, setVisible] = useState(true);

	return (
		<nav className={visible ? "" : "hidden"}>
			<div>
				<section>
					<NavElement link="/lists" className="nav-category">Lists</NavElement>
					<ListsBar previews={previews.lists}/>
					<NavElement link="/list/new" className="nav-add">+</NavElement>
				</section>
				<section>
					<NavElement link="/notes" className="nav-category">Notes</NavElement>
					<NotesBar previews={previews.notes}/>
					<NavElement link="/note/new" className="nav-add">+</NavElement>
				</section>
			</div>
			<input type="button" value={visible ? "Hide" : ">"} onClick={() => setVisible(!visible)}/>
		</nav>
	);
}


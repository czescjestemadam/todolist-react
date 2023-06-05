import { createElementsFunc } from "./utils/elementutils";

export function homeLoader({ request })
{
	return null;
}

export default function Home()
{
	return (
		<div className="home">
            <p>Lists</p>
            {createElementsFunc("list")()}
            <p>Notes</p>
            {createElementsFunc("note")()}
        </div>
	);
}

import NavElement from "./navelement";

export default function ListsBar({ previews })
{
	const elements = [];

	for (const preview of previews)
		elements.push(
			<NavElement key={preview.id} link={`/list/${preview.id}`}>
				<code>[{preview.id.substring(0, 6)}]</code> {preview.title}
			</NavElement>
		);

	return elements;
}

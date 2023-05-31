import { Link } from "react-router-dom";

export default function ErrorPage()
{
	return (
		<>
			<h1>erroro</h1>
			<Link to="/">home</Link><br/>
			<Link to="/login">login</Link>
		</>
	);
}

import { Link } from "react-router-dom";

export default function HomeLink({ link, children })
{
	return <Link to={link} className="home-link">{children}</Link>;
}

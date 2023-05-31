import { NavLink } from "react-router-dom";

const linkClass = className => ({ isActive }) => isActive ? "active " + className : className;

export default function NavElement({ children, link, className })
{
	return <NavLink to={link} className={linkClass(className)}>{children}</NavLink>;
}

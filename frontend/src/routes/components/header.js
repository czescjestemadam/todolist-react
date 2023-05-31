import { useNavigate } from "react-router-dom";

import { clearServerToken } from "../../utils/localStor";

import logo from "./img/logo48.png";
import NavElement from "./navelement";

export default function Header({ user, apiStatus })
{
	const navigate = useNavigate();

	const logout = () =>
	{
		clearServerToken();
		navigate("/login");
	};

	return (
		<header>
			<NavElement link="/" className="nolink">
				<img src={logo} alt="logo"/>
				<span>TodoList</span>
			</NavElement>
			<section>
				<span>status: {apiStatus}</span>
				<input type="button" value={`${user.name}: logout`} onClick={logout}/>
			</section>
		</header>
	);
}

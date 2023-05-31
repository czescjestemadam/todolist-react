import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";

import * as store from "../utils/localStor";
import { api, apiSetup } from "../utils/api";

import InfoMsg from "./components/infomsg";

export function loginLoader({ request })
{
	return store.getServer() != null && store.getToken() != null ? redirect("/") : null;
}

export default function Login()
{
	const [server, setServer] = useState("http://localhost:8080");
	const [user, setUser] = useState("");
	const [passwd, setPasswd] = useState("");

	const [err, setErr] = useState();

	const navigate = useNavigate();

	const login = () =>
	{
		store.setServer(server);
		apiSetup(server);

		api.post("/api/auth", {
			user: user,
			passwd: passwd
		}).then(res =>
		{
			const d = res.data;
			if (!d.token && d.error)
				return setErr(d.error);

			store.setToken(d.token);
			navigate("/");
		}).catch(err => {
			if (err.response && err.response.data && err.response.data.error)
				setErr(err.response.data.error);
			else
				setErr(err.message)
			console.error(err);
		});
	};

	return (
		<div className="login-wrapper">
			<div className="login-main">
				<InputSection name="Server" type="text" val={server} setFunc={setServer}/>
				<InputSection name="User" type="text" val={user} setFunc={setUser}/>
				<InputSection name="Password" type="password" val={passwd} setFunc={setPasswd}/>

				<div></div>

				<input type="button" value="Log in" onClick={login}/>

				{
					err ? <InfoMsg msg={err} color="red"/> : null
				}
			</div>
		</div>
	);
}

function InputSection({ name, type, val, setFunc })
{
	return (
		<section>
			<input type={type} placeholder={name} value={val} onChange={e => setFunc(e.target.value)}/>
		</section>
	);
}

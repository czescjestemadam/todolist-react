import { useState } from "react";
import { redirect, useNavigate, Link } from "react-router-dom";

import * as store from "../utils/localStor";
import {api, apiSetup} from "../utils/api";
import InputSection from "./components/inputsection";
import InfoMsg from "./components/infomsg";

export function registerLoader()
{
    return store.getServer() != null && store.getToken() != null ? redirect("/") : null;
}

export default function Register()
{
    const [server, setServer] = useState("http://localhost:8080");
    const [user, setUser] = useState("");
    const [passwd, setPasswd] = useState("");
    const [passwd1, setPasswd1] = useState("");

    const [err, setErr] = useState();

    const navigate = useNavigate();

    const register = () =>
    {
        if (passwd !== passwd1)
            return setErr("Passwords dont match");

        store.setServer(server);
        apiSetup(server);

        api.put("/api/auth", {
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
                <InputSection name="Repeat password" type="password" val={passwd1} setFunc={setPasswd1}/>

                <div></div>

                <input type="button" value="Register" onClick={register}/>

                <Link to="/login" className="nolink">
                    <input type="button" value="or Log in"/>
                </Link>

                {
                    err ? <InfoMsg msg={err} color="red"/> : null
                }
            </div>
        </div>
    );
}

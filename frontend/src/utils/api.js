import axios from "axios";

export let api;

export function apiSetup(server, token = null)
{
	console.log(`creating api for server:${server} token:${token}`);

	const cfg = {
		baseURL: server,
		timeout: 5000,
		withCredentials: false,
		crossOrigin: true,
		crossdomain: true
	};
	if (token)
		cfg.headers = {"Authorization": token};
	api = axios.create(cfg);
}

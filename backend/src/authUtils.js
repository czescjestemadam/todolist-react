import { genSalt, hash, compare } from "bcrypt";
import { userDB } from "./db.js";
import genRandomv1 from "./uuid.js";


export function genToken(user)
{
	return `id:${user.id};name:${user.name}:${user.passwd}`;
}


// returns promise
export function createUser(user)
{
	return genSalt(10).then(salt => hash(user.passwd, salt)).then(hash =>
	{
		user.id = genRandomv1();
		user.passwd = hash;
		user.token = genToken(user);
		user.created_at = Date.now();

		userDB.data.push(user);
		userDB.write();

		return copyUser(user);
	});
}

// returns promise
export function loginUser(user)
{
	const dbUser = getUserByName(user.name);
	if (!dbUser)
		return Promise.resolve();
	return compare(user.passwd, dbUser.passwd).then(success =>
	{
		if (!success)
			return null;

		return copyUser(dbUser);
	});
}


export function getUserByName(name)
{
	for (const user of userDB.data)
		if (user.name === name)
			return user;

	return null;
}

export function getUserByToken(token)
{
	for (const user of userDB.data)
		if (user.token === token)
			return user;

	return null;
}


// middlewares

export function checkCredentialsMiddleware(req, res, next)
{
	let user = req.body.user;
	const passwd = req.body.passwd;

	if (!user)
		return res.json({ error: "Empty user" });

	if (!passwd)
		return res.json({ error: "Empty password" });

	user = user.trim();

	if (!user.length)
		return res.json({ error: "Empty user" });

	req.user = {
		name: user,
		passwd: passwd
	};
	next();
}

export function registerCheckCredentialsMiddleware(req, res, next)
{
	const { name, passwd } = req.user;

	if (name.length < 3)
		return res.json({ error: "User too short (2 < x < 33)" });

	if (name.length > 32)
		return res.json({ error: "User too long (2 < x < 33)" });


	if (passwd.length < 6)
		return res.json({ error: "Password too short (5 < x < 65)" });

	if (passwd.length > 64)
		return res.json({ error: "Password too long (5 < x < 65)" });

	// todo check password strength

	next();
}

export function checkTokenMiddleware(req, res, next)
{
	const token = req.header("Authorization");
	const user = token ? getUserByToken(token) : null;
	if (token && user)
	{
		req.user = copyUser(user);
		return next();
	}

	res.status(401).json({ error: "Invalid token" });
}


const copyUser = user =>
{
	const cuser = Object.assign({}, user);
	delete cuser.passwd;
	return cuser;
};

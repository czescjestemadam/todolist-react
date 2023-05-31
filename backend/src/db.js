import fs from "fs";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

if (!fs.existsSync("./db/"))
{
	fs.mkdirSync("./db/");
	console.log("./db/ dir created");
}

export const userDB = await loadDB("users");
export const listDB = await loadDB("lists");
export const noteDB = await loadDB("notes");

export function dbSaveAll()
{
	userDB.write();
	listDB.write();
	noteDB.write();
	console.log("dbs saved");
}

async function loadDB(file)
{
	const db = new Low(new JSONFile(`./db/${file}.json`));
	await db.read();
	db.data = db.data || [];
	return db;
}

// process.on("SIGINT", dbSaveAll);

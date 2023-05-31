import { v1 } from "uuid";

export default function genRandomv1()
{
	const rnd = [];
	for (let i = 0; i < 16; i++)
		rnd.push(Math.floor(Math.random() * 255));
	return v1({ msecs: Date.now(), random: rnd });
}

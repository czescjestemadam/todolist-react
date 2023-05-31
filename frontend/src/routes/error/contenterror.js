import { useRouteError } from "react-router-dom";

import InfoMsg from "../components/infomsg";

export default function ContentError()
{
	const { message, response } = useRouteError();

	return (
		<div className="content-error">
			<InfoMsg msg={response ? response.data.error : message} color="red"/>
		</div>
	);
}

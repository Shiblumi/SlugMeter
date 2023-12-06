import HeatMapMonth from "./HeatMapMonth.js";
import Card from "../ui/Card";

export function SigninGraph(props) {
    let fetchRequest = "signinsOfMonth";
    let currentDate = new Date();
    let title = `${currentDate.toLocaleString('default', { month: 'long' })} Sign-ins`;
    let live = false;


    return (
        <Card>
            <HeatMapMonth text={title} request={fetchRequest} live={live} />
        </Card>
    );
}

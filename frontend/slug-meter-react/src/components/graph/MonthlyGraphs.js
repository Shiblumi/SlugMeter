import HeatMapMonth from "./HeatMapMonth.js";
import Card from "../ui/Card";

export function SigninGraph(props) {

    let fetchRequest="signinsOfMonth"
    let title = "Monthly Sign-ins";
    let live = false;

    return (
          <Card><HeatMapMonth text={title} request={fetchRequest} live={live}/></Card>
      );
}
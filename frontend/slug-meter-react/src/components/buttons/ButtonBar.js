import classes from "./ButtonBar.module.css";
import Button from "./Button";

function ButtonBar() {
  return (
    <div className={classes.bar}>
      <Button text="Sun"></Button>
      <Button text="Mon"></Button>
      <Button text="Tue"></Button>
      <Button text="Wed"></Button>
      <Button text="Thu"></Button>
      <Button text="Fri"></Button>
      <Button text="Sat"></Button>
    </div>
  );
}

export default ButtonBar;

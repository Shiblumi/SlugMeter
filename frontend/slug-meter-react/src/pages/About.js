import classes from "./About.module.css";
function PageTwo() {
  return (
    <div>
      <h2 style={{color:'white', marginBottom:'0rem'}}>Created by:</h2>
      <p style={{color:'white', fontSize:'0.8rem', marginTop:'0rem', marginLeft:'1rem'}}>(Alphabetical order)</p>
      <div className={classes.devShowcase}>
        <div className={classes.devProfile}>a</div>
        <div className={classes.devProfile}>b</div>
        <div className={classes.devProfile}>c</div>
        <div className={classes.devProfile}>d</div>
        <div className={classes.devProfile}>e</div>
        <div className={classes.devProfile}>f</div>
      </div>
    </div>
  );
}

export default PageTwo;

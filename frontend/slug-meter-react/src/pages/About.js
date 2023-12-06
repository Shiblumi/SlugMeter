import classes from "./About.module.css";
import DevProfile from "../components/ui/DevProfile";
import pic from "../assets/slugpic.png";


function PageTwo() {
  return (
    <div>
      <h2 style={{color:'white', marginBottom:'0rem'}}>Created by:</h2>
      <p style={{color:'white', fontSize:'0.8rem', marginTop:'0rem', marginLeft:'1.5rem'}}><em>Alphabetical order</em></p>
      <br />
      <div className={classes.devShowcase}>
        <DevProfile profilePic={pic} photoAlt="Profile Pic" name="Aidan Gilmore" bio="idk brooo" link="https://github.com/Shiblumi" linkText="Github" />
        <DevProfile profilePic={pic} photoAlt="Profile Pic" name="Arul Bangari" bio="idk brooo" link="https://github.com/Shiblumi" linkText="Github" />
        <DevProfile profilePic={pic} photoAlt="Profile Pic" name="Dirk Wilson" bio="idk brooo" link="https://github.com/Shiblumi" linkText="Github" />
        <DevProfile profilePic={pic} photoAlt="Profile Pic" name="Joshua Angel" bio="idk brooo" link="https://github.com/Shiblumi" linkText="Github" />
        <DevProfile profilePic={pic} photoAlt="Profile Pic" name="Jacob Herman" bio="idk brooo" link="https://github.com/Shiblumi" linkText="Github" />
        <DevProfile profilePic={pic} photoAlt="Profile Pic" name="Kaito Kudo" bio="idk brooo" link="https://github.com/Shiblumi" linkText="Github" />

      </div>
    </div>
  );
}

export default PageTwo;

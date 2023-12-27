import classes from "./DevProfile.module.css";

// Developer profile component. Contains a profile picture, name, bio, and link to the developer's Github.
function DevProfile(props) {
  return (
    <div className={classes.devProfile}>
      <div className={classes.devProfilePic}>
        <img src={props.profilePic} alt={props.photoAlt} />
      </div>
      <div className={classes.rightCol}>
        <div className={classes.devProfileName}>{props.name}</div>
        <div className={classes.devProfileBio}>{props.bio}</div>
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          {props.linkText}
        </a>
      </div>
    </div>
  );
}

export default DevProfile;

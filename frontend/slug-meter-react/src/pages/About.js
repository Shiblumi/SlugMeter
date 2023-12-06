import classes from "./About.module.css";
import DevProfile from "../components/ui/DevProfile";
import pic from "../assets/slugpic.png";
import Arul_Bangari_PFP from "../assets/Arul_Bangari_PFP.jpg";
import Aidan_Gilmore_PFP from "../assets/Aidan_Gilmore_PFP.jpg";
import Dirk_Wilson_PFP from "../assets/Dirk_Wilson_PFP.jpg";
import Jacob_Herman_PFP from "../assets/Jacob_Herman_PFP.jpg";
import Joshua_Angel_PFP from "../assets/Joshua_Angel_PFP.jpg";
import Kaito_Kudo_PFP from "../assets/Kaito_Kudo_PFP.jpg";

function PageTwo() {
  return (
    <div>
      <h2
        style={{
          color: "white",
          marginBottom: "0rem",
          fontFamily: "Inter,  sans-serif",
          textShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        Description:
      </h2>
      <p
        style={{
          color: "white",
          fontSize: "1rem",
          marginTop: "0.5rem",
          fontFamily: "Inter,  sans-serif",
          lineHeight: "1.5rem",
          textAlign: "justify",
          textAlignLast: "justify",
          textShadow: "0px 2px 8px rgba(0, 0, 0, 0.4)",
        }}
      >
        SlugMeter was made by UCSC students as a proof-of-concept for a crowd
        meter for the UCSC gym. Trained using occupancy data sourced from other
        UC gyms, SlugMeter uses machine learning to predict the occupancy of the
        gym for any given day. It also allows you to view live and historical
        true occupancy (i.e. not predictive), as well as a heatmap for intuitive
        monthly relative comparisons. SlugMeter was created with a
        privacy-forward design, as it utilizes only timestamps to generate
        charts, and knows nothing about who is actually using the gym. React and
        Chartjs are leveraged on the frontend for quick, fluid transitions with
        the foremost goal of
        <p style={{ textAlign: "left", textAlignLast: "left", marginTop: 0 }}>
          delivering a delightful user experience.
        </p>
      </p>
      <br />
      <h2
        style={{
          color: "white",
          marginBottom: "0rem",
          fontFamily: "Inter,  sans-serif",
          textShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        Created by:
      </h2>
      <p
        style={{
          color: "white",
          fontSize: "0.8rem",
          marginTop: "0rem",
          marginLeft: "1.5rem",
          fontFamily: "Inter,  sans-serif",
          textShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <em>Alphabetical order</em>
      </p>
      <br />
      <div className={classes.devShowcase}>
        <DevProfile
          profilePic={Aidan_Gilmore_PFP}
          photoAlt="Aidan Gilmore PFP"
          name="Aidan Gilmore"
          bio="Full-Stack Dev"
          link="https://github.com/A-Gilmore"
          linkText="Github"
        />
        <DevProfile
          profilePic={Arul_Bangari_PFP}
          photoAlt="Arul Bangari PFP"
          name="Arul Bangari"
          bio="Graph Engineer"
          link="https://github.com/ArulBangari"
          linkText="Github"
        />
        <DevProfile
          profilePic={Dirk_Wilson_PFP}
          photoAlt="Dirk Wilson PFP"
          name="Dirk Wilson"
          bio="Front-End Dev"
          link="https://github.com/Shiblumi"
          linkText="Github"
        />
        <DevProfile
          profilePic={Joshua_Angel_PFP}
          photoAlt="Joshua Angel PFP"
          name="Joshua Angel"
          bio="ML Engineer"
          link="https://github.com/Josh396s"
          linkText="Github"
        />
        <DevProfile
          profilePic={Jacob_Herman_PFP}
          photoAlt="Jacob Herman PFP"
          name="Jacob Herman"
          bio="Front-End Dev"
          link="https://github.com/StrangeOdor"
          linkText="Github"
        />
        <DevProfile
          profilePic={Kaito_Kudo_PFP}
          photoAlt="Kaito Kudo PFP"
          name="Kaito Kudo"
          bio="Graph Engineer"
          link="https://github.com/kuk4i"
          linkText="Github"
        />
      </div>
    </div>
  );
}

export default PageTwo;

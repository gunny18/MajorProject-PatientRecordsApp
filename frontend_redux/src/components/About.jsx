import React from "react";
import "./About.css";
import bann1 from "./images/banner1.jpg";
import bann2 from "./images/banner2.jpg";
import bann3 from "./images/banner3.jpg";
import intra_hosp from "./images/intra.png";
import inter_hosp from "./images/inter.png";
import main_pic from "./images/about_pic.png";
import dot from "./images/dots_abt.png";

const About = () => {
  return (
    <section>
      <div>
        <section className="abstract zoom">
          <h1>Our Mission</h1>
          <p className="fnt">
            To incorporate RFID Technology in hospitals and to provide quicker
            access to previous health history of patients, thereby minimizing
            delays caused due to different departments of the hospital
          </p>
        </section>
        <img src={bann1} className="ban1" alt="txt"></img>
        <img src={main_pic} className="ab_pic" alt="txt"></img>
      </div>

      <div>
        <img src={bann2} className="ban1" alt="txt"></img>
      </div>
      <div className="ban2">
        <section className="intra zoom2">
          <p className="fnt">
            In an hospital, there are several departments like oncology,
            radiology, pathology, neurology etc. In most cases, a patient will
            be referred to several departments for conclusive diagnosis. Most
            often than not, a lot of time is wasted during the communication
            between these departments, sending the appropriate reports etc. A
            lot of time is also wasted when the final patient summary has to be
            prepared and given to the billing section to process the
            discharge of a patient.
          </p>
        </section>
        <img src={intra_hosp} className="Intra" alt="txt"></img>
        <img src={dot} className="dot_intra" alt="txt"></img>
      </div>

      <div className="ban3_back">
        <section className="inter zoom2">
          <p className="fnt">
            Now there can be another scenario where a patient is not satisfied
            with the initial diagnosis and wants a second opinion, here also a
            lot time and energy will be wasted to redo all the tests. An
            extension to such a scenario would be where a part of the patients
            problem is solved by initial treatment and another part of it has to
            be referred to a specialist.
          </p>
        </section>
        <img src={bann3} className="ban3" alt="txt"></img>
        <img src={inter_hosp} className="Inter" alt="txt"></img>
        <img src={dot} className="dot_inter" alt="txt"></img>
      </div>
    </section>
  );
};

export default About;

import React from "react"
import './styles.scss';


const Home = () => {
  return (
    <>
      <section className="top">
        <img src="logo_side.png" />
        <div className="manifesto">
          <div className="container">
            <div className="headline">
               <h2>Manifesto</h2>
               <div className="line" />
            </div>
            <div className="content">
              <div className="side">
                <p>We are here for the revolution. We are here to amplify the movement. Every revolution and every movement is dependent on the works and <span className="purple">curious minds of creatives, innovators, artists, and boundary pushers; their pain, their cries, their anger and ultimately, their commitment to their hope and joy for a better tomorrow.</span></p>
                <p>We are here to celebrate the empathetic beauty of storytellers, those who have chosen to tell their own stories as well as interpret the narratives of those <span className="red">who have been silenced</span>. We are here to encourage creation and to hold space for the brilliant minds who have inspired us to move forward even when some of us have grown weary.</p>
              </div>
              <p>These are the minds that have shaped our context and understanding of our past and our present, and will shape our future. I REALLY LOVE THIS SONG is a platform to hold our collective love and protection for the Earth and her children. I REALLY LOVE THIS SONG is only some of the beautiful faces and brains of the revolution.</p>
            </div>
            <p className="last">But we promise you, the movement is you and everyone. We are here for the revolution. </p>
          </div>
        </div>
      </section>
      <section className="event">
        <div className="heart" />
        <div className="launch-date">
          Launching on June 22nd
        </div>
      </section>

      <section className="sponsor">
        <div className="container">
          <h2>GeGet your front row seat (free) tickets</h2>
          <p>First 100 to sign up to this event will receive a special gift from our partners at <img src="logo_runa.png" /></p>
        </div>
      </section>

      {/* <section className="form">
        <div className="container">
          <h2>Sign up</h2>
          <form>
            <div className="row">
              <div className="field">
                <label>First name</label>
                <input type="text"  name="firstname" />
              </div>
              <div className="field">
                <label>Last name</label>
                <input type="text"  name="lastname" />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label>Email</label>
                <input type="email"  name="email" />
              </div>
              <div className="field">
                <label>Address</label>
                <input type="text"  name="address" />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Zip Code</label>
                <input type="text"  name="firstname" />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
          <img src="logo_long.png" />
        </div>
      </section> */}


      <section className="bottom">
        Press inquiries: <a href="mailto:press@ireallylovethissong.com">press@ireallylovethissong.com</a> 
        <strong>A public service</strong>
        Climate & Culture
      </section>
    </>
  )
}

export default Home;

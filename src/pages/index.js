import React from "react"
import Tv from '../components/tv';
import { CATEGORIES, CATEGORIES_IDS } from '../components/constants';
import './styles.scss';

// const list_id = 'MUIEAExWpwqxf_uw0T3adGQF4dZAYYXQCh7OWlToSlL_tOerr9Uq-e_jaO-oP5EToicb4EghZfqf_3FwJCA8qearFySrjxdjDxHuCPStvEQH6SkDI7hVC2gdBSDA7uA3dwUaEYUUthY8kb_1FAN8U_ACf6v1GxfKg0dEqcHs9zi1cWORJnDLGFDNcxA50xX2xsI_QvDzCoCPw0-d';

const Home = () => {
  return (
    <>
      <div className="logo-tv"></div>
      <Tv />
      <section className="form">
        <div className="container">
          <h2>Sign up for front row seat (free) tickets</h2>
          <p>First 100 to sign up to this event will receive a ton of cool shit curated by Slow&nbsp;Factory&nbsp;and&nbsp;RUNA</p>
          <br/>
          <br/>

          <form>
            <div className="row">
              <div className="field">
                <label htmlFor="category">Category</label>
                <select id="category" name="prompt">
                  {CATEGORIES_IDS.map((key, index) => (
                    <option key={index} value={key}>
                      {CATEGORIES[key].name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="url">Video url</label>
                <input type="text" id="url" name="url" />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="email">User</label>
                <input type="text" id="user" name="user" />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

      <section className="top">
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

      <section className="sponsor">
        <div className="container">
          <p><img src="IRLTS_presented_powered_logos_white.png" alt="Presented by Slow Factory and powered with Runa" /></p>
          <br/>
          <br/>
          <p>RUNA is a clean energy drink that sources exclusively from farming families that grow guayusa (gwhy-you-sa) in sustainable, biodiverse forest gardens in the Amazon rainforest. Runa means “Fully Alive,” and is dedicated to bringing our good energy to life through action and through our products. RUNA provides a sustainable regenerative system for the communities that live, work and protect the rainforest. They use only natural ingredients certified by USDA Organic, Fair Trade™, and B-Corp.</p>
        </div>
      </section>

      <section className="footer">
        Press inquiries: <a href="mailto:press@ireallylovethissong.com">press@ireallylovethissong.com</a>
        <strong>A public service</strong>
        Climate & Culture
      </section>
    </>
  )
}

export default Home;

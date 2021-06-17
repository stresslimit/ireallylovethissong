import React from "react"
import { Formik } from 'formik';
import emailjs from "emailjs-com"
import Tv from '../components/tv';
import { CATEGORIES, CATEGORIES_IDS } from '../components/constants';
import * as FirestoreService from './firestoreService';
import './styles.scss';

const Home = () => {
  const sendEmail = (values, id) => {
    const templateParams = {
      from_name: 'Slow Factory',
      to_name: 'you',
      subject: 'subject',
      message: `Video link: ${values.url},
        Firebase new entry link: https://console.firebase.google.com/u/0/project/i-really-love-this-song/firestore/data/~2Fvideos~2F${id}
      `,
    }

    emailjs.send(
      'service_8znwq5p',
      'template_82lc1pj',
      templateParams,
      'user_ZhAiL6q9oUY9NIq56na11'
    ).then(
        result => {
          // console.log(result.text)
        },
        error => {
          // console.log(error.text)
        }
      )
  }

  const onSubmit = (values) => {
    FirestoreService.addVideo({
      ...values,
      active: false,
      videoId: values.url.match(/youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/)[1],
    })
      .then(docRef => {
        sendEmail(values, docRef.id)
        // console.log('new id', docRef.id)
      })
      .catch(reason => console.log(reason));
  }
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
          <Formik
            initialValues={{}}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <form onSubmit={handleSubmit} name="myForm">
                  <div className="row">
                    <div className="field">
                      <label htmlFor="category">Prompt</label>
                      <select
                        id="category"
                        name="prompt"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select your prompt</option>
                        {CATEGORIES_IDS.map((key, index) => (
                          <option key={index} value={key}>
                            {CATEGORIES[key].name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="url">Video url</label>
                      <input
                        type="text"
                        id="url"
                        name="url"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="field">
                      <label htmlFor="email">Author</label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )
            }}
          </Formik>
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

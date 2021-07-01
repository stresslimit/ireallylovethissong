import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { Helmet } from "react-helmet";
import emailjs from "emailjs-com";
import Tv from '../components/tv';
import { CATEGORIES, CATEGORIES_IDS } from '../components/constants';
import * as FirestoreService from '../firestoreService';
import './styles.scss';

const IndexPage = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setTimeout(() => {
      FirestoreService.addVideo({
        ...values,
        active: false,
        videoId: values.url.match(/youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/)[1],
      })
        .then(docRef => {
          sendEmail(values, docRef.id);
          setIsSubmitted(true);
        })
        .catch(reason => console.log(reason));
    }, 500);
  }

  const validateVideoUrl = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(value)) {
      error = 'Invalid video url';
    }
    return error;
  }

  const validateAuthor = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }

  const validatePrompt = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>I really love this song</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="logo-tv"></div>
      <Tv {...{ pathname: props.location.pathname.replace('/', '')}} />
      <section className="form">
        <div className="container">
        {isSubmitted && (
          <h2>Thank you for submitting your video.</h2>
        )}
        {!isSubmitted && (
            <>
              <h2>Create your own video and submit it here for a chance to see it live on the site</h2>
              {/* <p>Create your own video and submit it here for a chance to see it live on the site</p> */}
              <br/>
              <br/>
              <Formik
                initialValues={{
                  url: '',
                  author: '',
                  prompt: ''
                }}
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
                    <Form>
                      <div className="row">
                        <div className="field">
                          <label htmlFor="category">Prompt *</label>
                          <Field
                            as="select"
                            name="prompt"
                            validate={validatePrompt}
                          >
                            <option value="">Select your prompt</option>
                            {CATEGORIES_IDS.map((key, index) => (
                              <option key={index} value={key}>
                                {CATEGORIES[key] && CATEGORIES[key].name}
                              </option>
                            ))}
                          </Field>
                          <div className="error">
                            {errors.prompt && touched.prompt && <div>{errors.prompt}</div>}
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor="url">Video url *</label>
                          <Field
                            name="url"
                            validate={validateVideoUrl}
                          />
                          <div className="error">
                            {errors.url && touched.url && <div>{errors.url}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="field">
                          <label htmlFor="email">Author *</label>
                          <Field
                            name="author"
                            validate={validateAuthor}
                          />
                          <div className="error">
                            {errors.author && touched.author && <div>{errors.author}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="field">
                          <label htmlFor="email">Email *</label>
                          <Field
                            name="email"
                            validate={validateEmail}
                          />
                          <div className="error">
                            {errors.email && touched.email && <div>{errors.email}</div>}
                          </div>
                        </div>
                      </div>
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </Form>
                  )
                }}
              </Formik>
            </>
        )}
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
          <br/>
          <p>Media partner</p>
          <img src="logo-dazed.png" className="dazed" />
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



export default IndexPage;

import React from "react"
import Tv from '../components/tv';
import Manifesto from '../components/manifesto';
import './styles.scss';

const list_id = 'MUIEAExWpwqxf_uw0T3adGQF4dZAYYXQCh7OWlToSlL_tOerr9Uq-e_jaO-oP5EToicb4EghZfqf_3FwJCA8qearFySrjxdjDxHuCPStvEQH6SkDI7hVC2gdBSDA7uA3dwUaEYUUthY8kb_1FAN8U_ACf6v1GxfKg0dEqcHs9zi1cWORJnDLGFDNcxA50xX2xsI_QvDzCoCPw0-d';

const Home = () => {
  return (
    <>
      <div className="logo-tv"></div>
      <Tv />
      <Manifesto />
    </>
  )
}

export default Home;

import React from 'react'
import { Link } from 'react-router-dom'
import notfound from '../../assets/notfound.png'
const Notfound = () => {
  return (
    <section className='page notfound'>
      <div className="content">
        <img src={notfound} alt="notfound" />
        <Link to={"/home"}>Return to home</Link>
      </div>
    </section>
  )
}

export default Notfound

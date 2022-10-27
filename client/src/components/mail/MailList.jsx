import { useNavigate } from 'react-router-dom'
import './mailList.css'

const MailList = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/register')
  }
  return (
    <div className='mail'>
        <h1 className="mailTitle">Save time, save money</h1>
        <span className="mailDesc">Sign up and we'll send the best deals to you </span>
        <div className="mailInputContainer">
            <input type="text" placeholder='your email' />
            <button onClick={handleClick}>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList
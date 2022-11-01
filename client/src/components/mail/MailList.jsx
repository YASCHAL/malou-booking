import { useNavigate } from 'react-router-dom'
import './mailList.css'

const MailList = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/register')
  }
  return (
    <div className='mail'>
        <p className="mailTitle">Save time, save money !</p>
        <span className="mailDesc">Sign up and we'll send the best deals to you </span>
        <div className="mailInputContainer">
            <input type="text" placeholder='Your E-mail Here...' />
            <button onClick={handleClick}>Subscribe!</button>
        </div>
    </div>
  )
}

export default MailList
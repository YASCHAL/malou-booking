import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import "./reserve.css"
import {useNavigate} from 'react-router-dom'
import { axiosInstance } from '../../config'



const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const {data,loading} = useFetch(`/room/${hotelId}`)
    const {dates} = useContext(SearchContext)
    const getDatesInRange = (startDate,endDate)=>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
       

       const dates = []

        while(date <= end){
           dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return dates ;
    }
    /*const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)
    const isAvailable = (roomNumber) => {
       const isFound = roomNumber.unavailableDates.some(date => 
           alldates.includes(new Date(date).getTime())
         ) ;
         return !isFound
      }*/
    
    const handleSelect =(e) =>{
       const checked = e.target.checked
       const value = e.target.value
       setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item)=>item !== value)
        )
    }
      
      const navigate = useNavigate()

     const handleClick = async () => {
         try{
          await Promise.all(selectedRooms.map(roomId=>{
            const res = axiosInstance.put(`/rooms/availability/${roomId}`, {dates:alldates})
            return res.data
          }))
          setOpen(false)
          navigate('/')
         }catch(err){
        
         }
     }
      const datas = Array.from(data)

     const titles = datas.map(element=> element.title)
     const descrip = datas.map(element=> element.desc)
     const mpe = datas.map((element)=> element.maxPeople)
     const prix = datas.map((element)=> element.price)
     const ronum = datas.map((element)=> element.roomNumbers)
     const ronumnum = datas.map(roomNumber=> roomNumber.number)
     const ronumid = datas.map(roomNumber=> roomNumber._id)
     const ronumnu = datas.map(roomNumber=> roomNumber)

  return (
    <div className='reserve'>
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=>setOpen(false)}/>
            <span>Select your Rooms:</span>
            
              <div className="rItem">
                <div className="rItemInfo">
                    <div className="rTitle">{titles}</div>
                    <div className="rDesc">{descrip}</div>
                    <div className="rMax">Max People : <b>{mpe}</b></div>
                    <div className="rPrice">${prix}</div>
                    </div>
                    
                      <div className="room">  
                      <label>{ronumnum}</label>
                        <input type="checkbox" value={ronumid} onChange={handleSelect} disabled={!isAvailable(ronumnu)} />
                    </div>
                  
                </div>
              
            

            
             <button onClick={handleClick} className='rbutton'>Reserve Now</button>
        </div>
    </div>
  )
}

export default Reserve
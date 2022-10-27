
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './featured.css'

const Featured = () => {
    const {data,loading,error} = useFetch("/hotels/countByCity?cities=berlin,madrid,london,istanbul")
    const [destination,setDestination] = useState("")
    const navigate = useNavigate()
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [options,setOptions] = useState({
        adult:1,
        children:0,
        room:1
      });

    const {dispatch} = useContext(SearchContext)

    const handleSearch = ()=>{
        dispatch({type: "NEW_SEARCH", payload:{destination, dates, options}})
        navigate('/hotels' , {state:{destination, dates, options}})
      }

    
   
  return (
    <div className='featured'>
       { loading ? (
        "loading please wait"
        ):(
       <>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("berlin")}} onClick={handleSearch}>
            <img src="https://images.pexels.com/photos/1268127/pexels-photo-1268127.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Berlin</h1>
                <h2>{data[0]} propreties</h2>
                
            </div>
        </div>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("madrid")}} onClick={handleSearch}>
            <img src="https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=600" alt='' />
            <div className="featuredTitles">
                <h1>Madrid</h1>
                <h2>{data[1]} propreties</h2>
                
            </div>
        </div>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("london")}} onClick={handleSearch}>
            <img src="https://images.pexels.com/photos/220887/pexels-photo-220887.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>London</h1>
                <h2>{data[2]} propreties</h2>
                
            </div>
        </div>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("istanbul")}} onClick={handleSearch}>
            <img src="https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Istanbul</h1>
                <h2>{data[3]} propreties</h2>
                
            </div>
        </div></>)}
    </div>
  )
}

export default Featured

import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'

function App() {
 
   const [coords, setcoords] = useState()
   const [weather, setweather] = useState()
   const [temp, settemp] = useState()
   const [isloading, setisloading] = useState(true)
   const [haserror, sethaserror] = useState(false)
   const [showsms, setshowsms] = useState(false)
  
   useEffect(() => {
    
    setTimeout(()=>{
     setshowsms(true)
    },3000)

    const success = pos =>{
      setcoords({
        lat:pos.coords.latitude,
        long:pos.coords.longitude,
        
      })
   
    }
    const error = () =>{
      sethaserror(true)
      setisloading(false)
    }
  navigator.geolocation.getCurrentPosition(success,error)
  
  },[])


useEffect(() => {
  if (coords) {
    const API_ke='4a94e150d1dbce8d5c57825fa4a96508'
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${API_ke}`
    axios.get(url)
    .then(res=>{
       setweather(res.data)
       const celsius = (res.data.main.temp -273.15).toFixed(1)
       const Fahrenheit = (celsius * 9/5 + 32).toFixed(1)
       settemp({celsius , Fahrenheit})
      })

    .catch(err=> console.log(err))
    .finally(()=> setisloading(false))
  }
}, [coords])

  return (
    <div className='app'>

      {
        isloading
        ? 
       (
        <div>
         <Loading/>
         {
          showsms && <h2 className='smsseg'>por favor activar ubicacion</h2>
         }
         
       </div>
      )
        :
      (
      haserror
      ?<h1 className='showsmserror'> debe activar la ubicacion para ver el clima de tu ciudad</h1>
      :(
        <WeatherCard
        weather={weather}
        temp={temp}
        />

      )
    )
      }
    </div>
  )
}

export default App

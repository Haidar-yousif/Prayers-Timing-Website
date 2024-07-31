import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import {  Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
function CardContainer({children}){
    return (<div style={{
        display:"grid",
        gridTemplateColumns:"repeat(5,1fr)",
        gap:"10px",
        justifyContent:"center",
        marginTop:"20px"
        
    }}>
        {children}
    </div>);
}
function Card({imageSrc,moment,time,onClick}){

return (
    <div style={{
      padding:"10px",
      border:"1px solid #556555",
    
    }} onClick={onClick}>
      <img src={imageSrc} alt="no image"/>
      <h1>{moment}</h1> 
      <h2>{time}</h2> 
    </div>
);
}

export default function  MainComponent(){
const availablePayers=[
{displayName:"الفجر",keyName:"Fajr"},
{displayName:"الظهر",keyName:"Dhuhr"},
{displayName:"العصر",keyName:"Asr"},
{displayName:"المغرب",keyName:"Maghrib"},
{displayName:"العشاء",keyName:"Isha"},

]
  const availableCity=[{
    displayName:"سوريا",
    apiCityName:"Syria",
    apiCountryName:"Damascus"
  },{
    displayName:"تونس",
    apiCityName:"Tunisia",
    apiCountryName:"Tunisia"
  },{
    displayName:"الجزائر",
    apiCityName:"Algeria",
    apiCountryName:"Algiers"
  },{
    displayName:"عراق",
    apiCityName:"Iraq",
    apiCountryName:"Baghdad"
  },{
    displayName:"لبنان",
    apiCityName:"Lebanon",
    apiCountryName:"Beirut"
  }]
   const [diff, setDiff] = useState({ hours: 10, minutes: 0 });
  const [currDate,setCurrDate]=useState()
  const [country, setCountry] = useState("country");
  const [timing,setTiming]=useState({})
  const [nextPayerIndex,setNextPayerIndex]=useState(0)
  const handleChange = (event) => {
    const selectedCountry=availableCity.filter((item)=>{
      return item.apiCityName===event.target.value
    })
    
    setCountry(selectedCountry[0])
      };

const getResponse=async (url)=>{
 axios.get(url).then((res)=>{
  setTiming(res.data.data.timings)
 })
}

  useEffect(()=>{
    const url=`https://api.aladhan.com/v1/timingsByCity/27-07-2024?city=${country.apiCityName}&country=${country.apiCountryName}`
    getResponse(url)
    const now=moment().format("Do MMM  YYYY | h:mm")
    setCurrDate(now)
  },[country])  

 const setUpDownCounter=()=>{
 let now=moment();
 console.log(now.format("HH:MM"))
 let nextPrayer="";
 if(now.isBefore(moment(timing["Dhuhr"])) &&now.isAfter(moment(timing["Fajr"]))){
  nextPrayer="Dhuhr";
 }else if(now.isBefore(moment(timing["Asr"])) &&now.isAfter(moment(timing["Dhuhr"]))){
  nextPrayer="Asr";
 }else if(now.isBefore(moment(timing["Maghrib"])) &&now.isAfter(moment(timing["Asr"]))){
  nextPrayer="Maghrib";
 }else if(now.isBefore(moment(timing["Isha"])) &&now.isAfter(moment(timing["Maghrib"]))){
  nextPrayer="Isha";
 }else nextPrayer="Fajr"
}
  useEffect(()=>{
    
    let interval=setInterval(() => {
      setUpDownCounter()    }, 1000);
    return ()=>{clearInterval(interval)}
  },[])
 
  
    return ( 
        <>
    <Grid container >
        <Grid xs={6}>
                     <div >
            <h2>{currDate} </h2>
            <h1>{country.displayName}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
        <div >
            <h2>{availablePayers[nextPayerIndex].displayName }الوقت المتبقي لصلاة </h2>
            <h1>{diff.hours}:{diff.minutes}</h1>
          </div>
        </Grid>
      </Grid>
           <Divider style={{margin:"50px 0", borderColor:"white",opacity:"0.5"}} variant='middle'/>
           <CardContainer>
            {
            availablePayers.map((p)=>{
                      return  <Card    moment={p.displayName} imageSrc="/src/assets/react.svg" time={timing[p.keyName]}/>  
            }
            )}
           
           </CardContainer>
           <Stack direction={"row"} margin={"40px 0"} justifyContent={"center"} >
           <FormControl style={{width:"300px",border:"1px solid white"}}>
        <InputLabel style={{color:"white"}} id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          {availableCity.map((item)=><MenuItem  value={item.apiCityName}>{item.displayName}</MenuItem>)}
        </Select>
      </FormControl>           </Stack>
           </>
    );
}
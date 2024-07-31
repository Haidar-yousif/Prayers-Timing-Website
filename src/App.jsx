
import MainComponent from "./Components/MainComponent";
import Container from '@mui/material/Container';
import './App.css'
export default function App() {
  return (
    <div  style={{display:"flex",
      justifyContent:"center",
   
      width:"100vw",

    }}>
    <Container maxWidth="xl">
    <MainComponent/>
    </Container>
      


          
    </div>
  );
}


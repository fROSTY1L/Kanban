import BackgroundImage from "./components/Background/BackgroundImage"
import { GlobalStyle } from "./styles/GlobalStyle"
import Image from './assets/Background/image.png'
import Header from "./layout/Header/Header"
import Desk from "./layout/Desk/Desk"
import { AppBorder } from "./styles/AppBorder/AppBorder"

function App() {

  return (
    <AppBorder>
      <GlobalStyle/>
      <BackgroundImage src={Image}/>
      <Header/>
      <Desk/>
    </AppBorder>
  )
}

export default App

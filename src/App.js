import './App.css';
import Calendar from './Components/Calendar/Calendar';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import HomeFeed from './Components/HomeFeed/HomeFeed';

import {ThemeProvider, createTheme} from "@mui/material/styles";
// import theme from './Components/Theme/';

const theme = createTheme({
  palette: {
    primary: {
      main: "#43a047",
      light: "#76d276",
      dark: "#00701c"
    },
    secondary: {
      main: "#e040fb",
      light: "#ff79ff",
      dark: "#aa00c7",
    }
  }
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <Calendar /> */}
        <Navbar />
        <HomeFeed />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;

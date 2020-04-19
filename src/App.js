import React from 'react';
import './App.css';

import {ThemeProvider} from '@material-ui/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import InfoTab from "./Components/InfoTab";
import MainContent from "./Components/MainContent";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#ff5733'
        },
        primary: {
            main: '#75ff33'
        },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '"Lato"',
            'sans-serif'
        ].join(',')
    }
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <div>
                    <div>
                        <InfoTab/>
                    </div>
                    <div>
                        <MainContent/>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default App;
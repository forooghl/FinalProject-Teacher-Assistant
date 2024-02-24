import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./containers/Routers";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        );
    }
}

export default App;

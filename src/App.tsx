import React from "react";
import Theme from "./components/theme/index";
import Routes from "./Routes/Routes"; 

const App: React.FC = () => {
  return (
    <Theme>
      <Routes/>
    </Theme>
  );
};

export default App;
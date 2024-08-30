import React, { useState } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import SongList from "./Components/SongList";
import Stats from "./Components/Stats";
import styled from "@emotion/styled";

const Container = styled.div`
  text-align: center;
`;

const App: React.FC = () => {
  const [songChangeDependency, setSongChangeDependency] = useState(false);

  const handleSongChange = () => {
    setSongChangeDependency(!songChangeDependency);
  };
  return (
    <Provider store={store}>
      <Container>
        <Stats dependency={songChangeDependency} />
        <SongList onSongChange={handleSongChange} />
      </Container>
    </Provider>
  );
};

export default App;

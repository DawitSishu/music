import React, { useState } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import SongList from "./Components/SongList";
import Stats from "./Components/Stats"; // Import the Stats component
import styled from "@emotion/styled";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #efcfa9;
  margin-top: 2rem;
`;

const App: React.FC = () => {
  const [songChangeDependency, setSongChangeDependency] = useState(false);

  const handleSongChange = () => {
    setSongChangeDependency(!songChangeDependency);
  };
  return (
    <Provider store={store}>
      <Container>
        <Title>Music Stats</Title>
        <Stats dependency={songChangeDependency} />
        <SongList onSongChange={handleSongChange} />
      </Container>
    </Provider>
  );
};

export default App;

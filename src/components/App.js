import '../styles/App.css';
import {useEffect, useState} from 'react';
import callToApi from '../services/api';

const App = () => {
  const [friendsData, setFriendsData] = useState({});

  useEffect(() => {
    callToApi().then((response) => {
      setFriendsData(response);
    });
  }, []);

  return (
    <div>
      <h1>Frases de Friends</h1>
      <ul>
        <li>Quote: {friendsData.quote}</li>
        <li>Character: {friendsData.character}</li>
      </ul>
    </div>
  );
};

export default App;
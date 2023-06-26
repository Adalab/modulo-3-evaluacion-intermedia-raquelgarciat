import { useEffect, useState } from 'react';

function App() {
  const [listQuotes, setListQuotes] = useState([]);
  const [filterChar, setFilterChar] = useState('');

  useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((data) => setListQuotes(data));
  }, []);

  const handleChangeChar = (ev) => {
    setFilterChar(ev.target.value);
  };

  const renderQuotes = () => {
    return listQuotes
      .filter((oneQuote) =>
        oneQuote.character.toLowerCase().includes(filterChar.toLowerCase())
      )
      .map((oneQuote, index) => (
        <ul key={index} className='char_list'>
          <li className='char_list-each'>
            <span className='eachquote'>{oneQuote.quote}</span> -
            <span className='eachchar'>{oneQuote.character}</span>
          </li>
        </ul>
      ));
  };

  return (
    <div>
      <h1 className='title'>Frases de Friends</h1>
      <label htmlFor='character'>Filtrar por personaje</label>
      <select onChange={handleChangeChar}
              value={filterChar} name='character' id='character'>
        <option value='Todos'>Todos</option>
        <option value='Ross'>Ross</option>
        <option value='Monica'>Monica</option>
        <option value='Joey'>Joey</option>
        <option value='Phoebe'>Phoebe</option>
        <option value='Chandler'>Chandler</option>
        <option value='Rachel'>Rachel</option>
      </select>
      <section className='quotelist'>{renderQuotes()}</section>
    </div>
  );
}

export default App;

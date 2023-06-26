import { useEffect, useState } from 'react';
import '../styles/App.css';

function App() {
  const [listQuotes, setListQuotes] = useState([]);
  const [filterChar, setFilterChar] = useState('');
  const [filterQuote, setFilterQuote] = useState('');
  const [newQuote, setNewQuote] = useState('');

  useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((data) => setListQuotes(data));
  }, []);

  const handleNewQuote = (ev) => {
    const clonedNewquote = { ...newQuote };
    clonedNewquote[ev.target.id] = ev.target.value;
    setNewQuote(clonedNewquote);
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setListQuotes([...listQuotes, newQuote]);
  };

  const handleChangeChar = (ev) => {
    setFilterChar(ev.target.value);
  };

  const handleChangeQuote = (ev) => {
    setFilterQuote(ev.target.value);
  };

  const renderQuotes = () => {
    return listQuotes
      .filter(
        (oneQuote) =>
          oneQuote.character.toLowerCase().includes(filterChar.toLowerCase()) &&
          oneQuote.quote.toLowerCase().includes(filterQuote.toLowerCase())
      )
      .map((oneQuote, index) => (
        <ul key={index} className='char_list'>
          <li className='char_list-each'>
            <span className='eachquote'>{oneQuote.quote}</span>
            <span className='eachchar'> - {oneQuote.character}</span>
          </li>
        </ul>
      ));
  };

  return (
    <div className='mainbody'>
      <h1 className='title'>Frases de Friends</h1>
      <form className='formfilter'>
        <label htmlFor='quote'>Filtrar por frase:</label>
        <input
          type='text'
          placeholder='Escribe una frase'
          onInput={handleChangeQuote}
          value={filterQuote}
          name='quote'
          id='quote'
        />
        <label htmlFor='character'>Filtrar por personaje:</label>
        <select
          onChange={handleChangeChar}
          value={filterChar}
          name='character'
          id='character'
        >
          <option value='' selected>
            Todos
          </option>
          <option value='Ross'>Ross</option>
          <option value='Monica'>Monica</option>
          <option value='Joey'>Joey</option>
          <option value='Phoebe'>Phoebe</option>
          <option value='Chandler'>Chandler</option>
          <option value='Rachel'>Rachel</option>
        </select>
      </form>
      <section className='quotelist'>{renderQuotes()}</section>
      <section>
        <form className='newform' action=''>
          <label htmlFor='newQuote'>Añade una nueva frase</label>
          <input
            type='text'
            placeholder='Aquí la frase'
            id='quote'
            onInput={handleNewQuote}
            value={newQuote.quote}
          />
          <input
            type='text'
            placeholder='Aquí el personaje'
            id='character'
            onInput={handleNewQuote}
            value={newQuote.character}
          />
          <input type='submit' value='Agregar' onClick={handleClick} />
        </form>
      </section>
    </div>
  );
}

export default App;

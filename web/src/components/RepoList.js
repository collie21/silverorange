import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RepoList() {
  const [data, setData] = useState();
  const [language, setLanguage] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:4000/repos/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const list = response.data.map((item) => item.language);
        const buttonList = list.filter((item, index) => {
          return list.indexOf(item) === index;
        });
        setLanguage(buttonList);
        setData(response.data);
      });
  }, []);
  console.log('data: ', data);
  console.log('language: ', data);

  const showAll = () => {
    setFilteredData(data);
  };
  const showSelection = (item) => {
    const filt = data.filter((el) => el.language === item);
    console.log('filt:: ', filt);
    setFilteredData(filt);
  };

  console.log('filtered data:: ', filteredData);
  return (
    <div>
      <h1>Silver Orange</h1>
      <div>
        <button type="button" onClick={() => showAll()}>
          Show All
        </button>
        {language &&
          language.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => showSelection(item)}
            >
              {item}
            </button>
          ))}
      </div>
      <>
        {filteredData &&
          filteredData.map((item) => (
            <Link to={`/${item.name}`} key={item.id} state={item}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.language}</p>
              <p>{item.forks}</p>
            </Link>
          ))}
      </>
    </div>
  );
}

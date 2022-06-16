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
        setFilteredData(response.data);
      });
  }, []);

  const showAll = () => {
    setFilteredData(data);
  };
  const showSelection = (item) => {
    const filt = data.filter((el) => el.language === item);
    setFilteredData(filt);
  };

  return (
    <div className="main">
      <h1>Silver Orange Example</h1>
      <div className="btn-group">
        <button type="button" onClick={() => showAll()} className="btn">
          Show All
        </button>
        {language &&
          language.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => showSelection(item)}
              className={`btn btn-${item}`}
            >
              {item}
            </button>
          ))}
      </div>
      <div className="card">
        {filteredData &&
          filteredData.map((item) => (
            <Link
              to={`/${item.name}`}
              key={item.id}
              state={item}
              className="link"
            >
              <div className="repo-name">
                <span>Name </span>
                <p>{item.name}</p>
              </div>
              {item.description ? (
                <div className="repo-description">
                  <span>Description </span>
                  <p>{item.description}</p>
                </div>
              ) : null}
              <div className="repo-language">
                <span>Language </span>
                <p>{item.language}</p>
              </div>
              <div className="repo-forks">
                <span>Forks </span>
                <p>{item.forks}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

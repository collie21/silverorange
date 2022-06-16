import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RepoList() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:4000/repos/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);
  console.log('data: ', data);
  return (
    <div>
      <h1>Silver Orange</h1>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.language}</p>
            <p>{item.forks}</p>
          </div>
        ))}
    </div>
  );
}

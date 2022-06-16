import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

export default function CommitDetails() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  console.log('use location: ', location);
  console.log('use params: ', params);
  const fullname = location.state.full_name;
  console.log('fullname: ', fullname);
  const [commit, setCommit] = useState();
  const [readMe, setReadMe] = useState();

  useEffect(() => {
    console.log(params.name);
    axios
      .get(`http://localhost:4000/repos/commit/${params.name}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setCommit(response.data.slice(0, 1)[0].commit);
        console.log('.then slice data: ', response.data.slice(0, 1)[0].commit);
      });
    axios
      .get(`https://raw.githubusercontent.com/${fullname}/master/README.md`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('readme get fetch: ', response.data);
        setReadMe(response.data);
      });
  }, [params, fullname]);
  console.log('commit: ', commit);
  if (!commit) {
    return <p>error</p>;
  }

  return (
    <div>
      <p>name: {commit.author.name}</p>
      <p>date: {commit.author.date}</p>
      <p>message: {commit.message}</p>
      <button onClick={() => navigate('/')}>Back</button>
      <br />
      <div>{readMe}</div>
    </div>
  );
}

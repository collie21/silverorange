import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

export default function CommitDetails() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const fullname = location.state.full_name;
  const [commit, setCommit] = useState();
  const [readMe, setReadMe] = useState();

  useEffect(() => {
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
        setReadMe(response.data);
      });
  }, [params, fullname]);

  if (!commit) {
    return <p>error</p>;
  }

  return (
    <div className="commit-details">
      <h1>Latest Commit Details</h1>
      <button onClick={() => navigate('/')} className="btn">
        Back
      </button>
      <div>
        <span>name</span>
        <p>{commit.author.name}</p>
      </div>
      <div>
        <span>date</span>
        <p>{commit.author.date}</p>
      </div>
      <div>
        <span>message</span>
        <p>{commit.message}</p>
      </div>
      <br />
      <div>
        <span>README.md</span>
        <p>{readMe}</p>
      </div>
    </div>
  );
}

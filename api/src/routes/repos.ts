import axios from 'axios';
import { Router, Request, Response } from 'express';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  await axios
    .get('https://api.github.com/users/silverorange/repos', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      const repoData = response.data;
      const json = repoData.filter((item: any) => item.fork === false);
      JSON.stringify(json);
      console.log(JSON.stringify(json));
      res.send(json);
    })
    .catch((error: any) => {
      console.error(error);
      res.send(error);
    });
});
repos.get('/commit/:reponame', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.status(200);

  const reponame = _.params.reponame;

  await axios
    .get(`https://api.github.com/repos/silverorange/${reponame}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        repo: reponame,
      },
    })
    .then((response: any) => {
      const repoData = response.data;

      JSON.stringify(repoData);
      console.log(JSON.stringify(repoData));
      res.send(repoData);
    })
    .catch((error: any) => {
      console.error(error);
      res.send(error);
    });
});

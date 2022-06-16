import axios from 'axios';
import { Router, Request, Response } from 'express';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
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
    .catch((error:any) => {
      console.error(error);
      res.send(error);
    });
});

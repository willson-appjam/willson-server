import storyService from './story.service';

const getStoryCtrl = async (req: any, res: any) => {

  await storyService.getStoryService(req, res)
  .then((result: any) => {
    res.status(200).send(result);
  })
  .catch((e: Error) => {
    res.status(500).send(e);
  })
}

export {
  getStoryCtrl
}

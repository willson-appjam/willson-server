import profileService from './profile.service';

const getProfileCtrl = async (req: any, res: any) => {

  await profileService.getProfileService(req, res)
  .then((result: any) => {
    res.status(200).send(result);
  })
  .catch((e: Error) => {
    res.status(500).send(e);
  })
}

const putProfileCtrl = async (req: any, res: any) => {

  await profileService.putProfileService(req, res)
  .then((result: any) => {
    res.status(200).send(result);
  })
  .catch((e: Error) => {
    res.status(500).send(e);
  })
}

export{
  getProfileCtrl,
  putProfileCtrl
}
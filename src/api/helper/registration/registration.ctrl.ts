import registrationService from './registration.service';

const postRegistrationCtrl = async (req: any, res: any) => {

  await registrationService.postRegistrationService(req, res)
  .then((result: any) => {
    res.status(200).send(result);
  })
  .catch((e: Error) => {
    res.status(500).send(e);
  })
}

export{
  postRegistrationCtrl
}
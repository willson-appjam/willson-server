import listService from './list.service';

const getListCtrl = async(req:any, res:any) => {
  new Promise(async (resolve, reject) => {
    await listService.getListService(req, res)
  .then((result: any) => {
    res.status(200).send(result);
  })
  .catch((e: Error) => {
    res.status(500).send(e);
  })
  })
};

export {
  getListCtrl
}


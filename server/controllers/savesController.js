module.exports = {
    create: (req, res, next)  => {
        const db = req.app.get('db');
        const {id} = req.params

        db.create_new_save([id, req.body,new Date( Date.now())])
        .then( (created) => res.status(200).send(created) )
        .catch( (err) => {
            console.log(err)
            res.status(500).send(err)} )
    },
    getNewest: (req, res, next) => {
        const db = req.app.get('db');
        const { params } = req;

        db.read_newest_save([params.id])
        .then((save) => res.status(200).send(save))
        .catch(() => res.status(500).send());
    },
    getAll: (req, res, next) => {
        const db = req.app.get('db');
        const {params} = req;

        db.read_all_saves([params.id])
        .then((saves) => res.status(200).send(saves))
        .catch(() => res.status(500).send());
    } ,
    update: (req, res, next) => {
        const db = req.app.get('db');
        const {params, body} = req;

        db.update_save([params.saveID, params.userID, body,new Date(Date.now())])
        .then((updated) => res.status(200).send(updated))
        .catch((err) => {
            console.log(err)
            res.status(500).send()})
    },
    delete: (req, res, next) => {
        const db = req.app.get('db');
        const {params} = req

        db.delete_save([params.saveID, params.userID])
        .then((saves) => res.status(200).send(saves))
        .catch(() => res.status(500).send())
    } ,
}
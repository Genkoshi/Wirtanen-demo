module.exports = {
    create: (req, res, next)  => {
        const db = req.app.get('db');
        const {id} = req.body.user;

        db.creat_new_save([id, req.body])
        .then( (created) => res.status(200).send(created) )
        .catch( () => res.status(500).send() )
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

        db.update_save([params.id, body])
        .then((updated) => res.status(200).send(updated))
        .catch(() => res.status(500).send())
    },
    delete: (req, res, next) => {
        const db = req.app.get('db');
        const {params} = req;

        db.delete_save([params.id])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send())
    } ,
}
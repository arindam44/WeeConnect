const admin = require('../../functions/adminConfig');
const user = require('../../Models/users.model');
const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');


const uploadImage = (req, res, next) => {
    const busboy = new BusBoy({ headers: req.headers });
    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random()*10000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/weconnect-7a79a.appspot.com/o/${imageFileName}?alt=media`;
            user.update({'fbAuthId': req.user.uid}, {$set:{'imageUrl': imageUrl}})
                .then(() => {
                    return res.json({ messege: 'Image uploaded successfully!'});
                })
                .catch((err) => {
                    return res.status(500).json({ messege: 'from mongo', error: err.code});
                })
        })
        .catch((err) => {
            return res.status(500).json({ error: err.code});
        })
    });
    
    busboy.end(req.rawBody);
};

module.exports = uploadImage;


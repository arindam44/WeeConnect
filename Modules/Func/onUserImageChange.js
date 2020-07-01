const user = require('../../Models/users.model');



const onUserImageChange = () => {
    user.watch().on('change', data => {
        if(data.operationType == 'update') {
            console.log(data.updateDescription.updatedFields.imageUrl);
            if(data.updateDescription.updatedFields.imageUrl != null) {
                user.findById(data.documentKey)
                .then(userdata => {
                    if(userdata != null) {
                        return post.updateMany({ 'userHandle': userdata.userHandle }, 
                                                {$set: {'userImage': data.updateDescription.updatedFields.imageUrl }});
                    }
                })
                .then(() => {
                    return();
                })
            }
        }
    })
}

module.exports = onUserImageChange;
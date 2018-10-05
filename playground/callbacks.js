var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Vikram'
    };

    setTimeout(() => { callback(user); }, 3000);
};

var name = (user) => {
    console.log(user);
};

getUser(31, name)

var single = (resource, authUser) => ({
    comment: resource.coment,
    id_user:resource.id_user
});

var multiple = (resources, authUser) => resources.map((resource) => single(resource, authUser));

module.exports = {
    single,
    multiple,
};
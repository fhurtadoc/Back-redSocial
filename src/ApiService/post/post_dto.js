var single = (resource, authUser) => ({
    id: resource.id_user,
    description:resource.description,
    img:resource.img
});

var multiple = (resources, authUser) => resources.map((resource) => single(resource, authUser));

module.exports = {
    single,
    multiple,
};
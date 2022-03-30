var single = (resource, authUser) => ({
  id: resource.id_user,
  description: resource.description,
  img: resource.img,
  date: resource.date,
});

var multiple = (resources, authUser) =>
  resources.map((resource) => single(resource, authUser));

module.exports = {
  single,
  multiple,
};

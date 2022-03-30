var single = (resource, authUser) => ({
  id: resource.id_user,
  email: resource.email,
  nickname: resource.nickname,
});

var multiple = (resources, authUser) =>
  resources.map((resource) => single(resource, authUser));

module.exports = {
  single,
  multiple,
};

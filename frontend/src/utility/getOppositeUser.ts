const getOppositeUser = (userList: any, loggedUser: any) => {
  const oppositeUser = userList?.users?.filter((userItem: any) => {
    return userItem?._id !== loggedUser?._id;
  })?.[0];

  return oppositeUser;
};

export { getOppositeUser };

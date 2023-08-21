const getOppositeUser = (userList, loggedUser) => {
  const oppositeUser = userList?.users?.filter((userItem) => {
    return userItem?._id !== loggedUser?._id;
  })?.[0];

  return oppositeUser;
};

const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages?.length - 1 &&
    (messages[i + 1]?.sender?._id !== m.sender._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    messages[i]?.sender?._id === userId
  );
};

const isLastMessage = (messages, i, userId) => {
  return (
    i === messages?.length - 1 &&
    messages[messages?.length - 1]?.sender?._id !== userId &&
    messages[messages?.length - 1]?.sender?._id
  );
};

export { getOppositeUser, isLastMessage, isSameSender };

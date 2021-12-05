export default function (user = {}) {
  const expected = ['Permission', 'Image', 'Wallet'];

  const userInfo = Object.fromEntries(
    Object.entries(user).filter(prop => !expected.includes(prop[0])),
  );

  const permissions = Object.fromEntries(
    Object.entries(user).filter(prop => prop[0] === user.Permission),
  );

  const wallet = Object.fromEntries(
    Object.entries(user).filter(prop => prop[0] === user.Wallet),
  );

  const pictureUri = Object.fromEntries(
    Object.entries(user).filter(prop => prop[0] === user.Image),
  )?.url;

  return {
    userInfo,
    permissions,
    wallet,
    pictureUri,
  };
}

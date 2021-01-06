const getNonce = () => {
  let nonce = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return nonce;
};

export default getNonce;

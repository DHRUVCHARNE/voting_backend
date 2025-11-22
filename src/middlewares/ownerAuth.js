export const ownerAuth = (req, res, next) => {
  const { privatekey } = req.body;
  if (privatekey !== process.env.OWNER_PRIVATE_KEY) {
    return res.status(403).json({ error: "Only owner can perform this action" });
  }
  next();
};

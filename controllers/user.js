const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });
  if (targetUser) {
    const isCurPw = bc.compareSync(password, targetUser.password);
    if (isCurPw) {
      const payload = { name: targetUser.name, id: targetUser.id };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: Number(process.env.EXPIRES_TIMES),
      });

      res.status(200).send({
        message: "login Successful.",
        access_token: token,
        accessToken: token,
      });
    } else {
      res.status(400).send({ message: "username or passwlrd is wrong" });
    }
  } else {
    res.status(400).send({ message: "username or password is wrong" });
  }
};

const register = async (req, res) => {
  const { username, password, name } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });

  if (targetUser) {
    res.status(400).send({ message: "already taken" });
  } else {
    const salt = bc.genSaltSync(Number(process.env.SALT_ROUND));
    const hasedPW = bc.hashSync(password, salt);

    await db.User.create({
      password: hasedPW,
      username,
      name,
    });
    res.status(201).send({ message: "user create" });
  }
};

module.exports = {
  login,
  register,
};

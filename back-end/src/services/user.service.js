const md5 = require("md5");

const register = async ({ name, email, password, role='customer'}, user) => {
  const register = await user.findOne({
    where: {
      [Op.or]: [{ email }, { name }],
    },
  });
  if (register) return null;
  const result = await user.create({
    email,
    password: md5(password),
    name,
    role: "customer",
  });
  const token = token.create({ email: result.email });
  return { email, name, role: result.role, token };
};
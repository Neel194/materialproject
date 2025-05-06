const jwt = require("jsonwebtoken");

// Admin login
exports.login = (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};

// Verify admin token
exports.verifyAdmin = (req, res) => {
  res.json({ message: "Admin verified" });
};

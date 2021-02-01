const express = require("express");
const router = express.Router();
const axios = require("axios");
const { generateToken } = require("../util/jwt");

router.get("/callback", async (req, res, next) => {
  const code = req.query.code;
  try {
    const payload = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
    };
    const data = await axios.post(
      "https://github.com/login/oauth/access_token",
      payload,
      { headers: { Accept: "application/json" } }
    );
    const { access_token } = data.data;
    const userData = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: "application/json",
      },
    });
    const { email, name, id } = userData.data,
      username = userData.data.login;
    const newJwtToken = await generateToken(
      { username, email, name, id, access_token },
      { expiresIn: "30 days" }
    );
    res.cookie("Authorization", `Bearer ${newJwtToken}`, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect(302, "http://localhost:3000/feed");
  } catch (e) {
    res.redirect({ error: "Signin/Signup failed" }, 500);
    switch (e) {
      case e === "Token error":
        console.log("Token generation failed");
        break;
      default:
        console.log("Unknown error");
        break;
    }
  }
});

module.exports = router;

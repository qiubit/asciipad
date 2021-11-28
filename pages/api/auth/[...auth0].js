// pages/api/auth/[...auth0].js
import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';

// console.log(
//     'the AUTH0_SECRET env var is set: ',
//     !!process.env.AUTH0_SECRET
// );

export default handleAuth({
  async logout(req, res) {
    const returnTo = req.query.returnTo;
    try {
      await handleLogout(req, res, {
        returnTo
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  }
});
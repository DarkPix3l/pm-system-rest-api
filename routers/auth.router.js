import express from "express";

const router = express.Router();

// Router Level Middleware
function routerMiddleware(request, response, next) {
  console.log("Router Level Middleware");
  next();
}

router.use(routerMiddleware);

router.get("/signup", (request, response) => {
  response.send(`Creating a new user with email`);
});

// Endpoint is /auth/signup (/auth is mentioned in server.js)
router.post("/signup", (request, response) => {
  let { headline, firstname, lastname, email, password, birthday } =
    request.body;
  response.send(`Creating a new user with email: ${email}`);
});

router.post("/login", (request, response) => {
  let { email, password } = request.body;
  response.send(`Logging in user with email: ${email}`);
});

router.put("/forget-password", (request, response) => {
  let { email } = request.body;
  response.send(`Forget password for user with email: ${email}`);
});

export default router;

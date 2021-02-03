const express = require('express');
const source = require('rfr');

const LoginController = source('controllers/loginController');
const LogoutController = source('controllers/logoutController');
const AdminController = source('controllers/adminController');

const routes = express();

routes.get('/login', LoginController.get);
routes.post('/login', LoginController.post);

routes.get('/logout', LogoutController.get);

routes.get('/blog/compose', AdminController.getCompose);
routes.post('/blog/compose', AdminController.postCompose);

routes.get('/blog/:post/edit', AdminController.getEdit);
routes.post('/blog/:post/edit', AdminController.postEdit);

routes.get('/blog/:post/delete', AdminController.getDelete);
routes.post('/blog/:post/delete', AdminController.postDelete);

module.exports = routes;

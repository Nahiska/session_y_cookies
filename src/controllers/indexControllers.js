const { validationResult } = require("express-validator");

let colors = ["verde", "azul", "rosa"];

module.exports = {
    index: (req, res) => {
        res.render("index", {
            colors,
            session: req.session,
        });
    },
    data: (req, res) => {
        let errors = validationResult(req);
      
        if (errors.isEmpty()) {
            const { name, color, email, age, checkbox } = req.body;
        
            req.session.user = {
                name,
                color,
                email,
                age,
                checkbox,
            };
        
            if (checkbox) {
                res.cookie("color", color, {
                    maxAge: 10000 * 60,
                });
            } else {
                res.clearCookie("color");
            }
            return res.redirect("/");
        } else {
            return res.render("index", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session,
            });
        }
    },
    welcome: (req, res) => {
        if (req.session.user != undefined) {
            const { name, color, email, age } = req.session.user;
            res.render("index", {
              name,
              color,
              email,
              age,
              session: req.session,
            });
          } else {
            res.send("Completa el formulario");
          }
    },
    login: (req, res) => {
        if (req.session.user != undefined) {
            res.render("login", {
              session: req.session,
            });
          } else {
            res.send("Completa el formulario");
          }
    },
    destroy: (req, res) => {
        req.session.destroy();
        res.clearCookie("color");
        res.redirect("/");
    },
};
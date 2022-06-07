const mailgun = require("mailgun-js");

const DOMAIN = process.env.API_DOMAIN;

const mg = mailgun({
  apiKey: process.env.API_KEY,
  domain: DOMAIN,
});

const sendWelcomeEmail = (email, name) => {
  const data = {
    from: "Rajan <learn@nodejs.com>",
    to: email,
    subject: "Thanks for using mailgun mail service.",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};

const sendCancelationEmail = (email, name) => {
  const data = {
    from: "Rajan <learn@nodejs.com>",
    to: email,
    subject: "Sorry to see you go.",
    text: `Good Bye, ${name}. I hope to see you back soon.`,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};

module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apikey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: env("pavaoleonardo00@gmail.com"),
      defaultReplyTo: env("pavaoleonardo00@gmail.com"),
    },
  },
});

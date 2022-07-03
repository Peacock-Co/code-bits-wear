module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apikey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: env("EMAIL_DEFAULT_FROM"),
      defaultReplyTo: env("EMAIL_DEFAULT_REPLY_TO"),
    },
  },
});

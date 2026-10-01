module.exports = {
  extends: ["@lumina-w/dev-standards/commitlint"],
  plugins: [
    {
      rules: {
        "no-em-dash": ({ header }) => [
          !header.includes("—"),
          "commit message header must not contain an em dash",
        ],
      },
    },
  ],
  rules: {
    "no-em-dash": [2, "always"],
  },
};

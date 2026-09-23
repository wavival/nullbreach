const scopes = [
  "api",
  "ui",
  "db",
  "auth",
  "ci",
  "deploy",
  "docs",
  "config",
  "tests",
  "security",
  "deps",
  "core",
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "no-em-dash": ({ header }) => [
          !header.includes("\u2014"),
          "commit message header must not contain an em dash",
        ],
      },
    },
  ],
  helpUrl:
    "Use: type(scope): message. Types: feature, fix, chore. Scopes: api, ui, db, auth, ci, deploy, docs, config, tests, security, deps, core.",
  defaultIgnores: true,
  ignores: [(message) => message.startsWith("Merge pull request")],
  rules: {
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
    "header-case": [0],
    "header-max-length": [2, "always", 120],
    "no-em-dash": [2, "always"],
    "scope-enum": [2, "always", scopes],
    "scope-empty": [2, "never"],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "type-enum": [2, "always", ["feature", "fix", "chore"]],
  },
};

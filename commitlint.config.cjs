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
          !header.includes("—"),
          "commit message header must not contain an em dash",
        ],
      },
    },
  ],
  rules: {
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
    "header-case": [0],
    "header-max-length": [2, "always", 72],
    "no-em-dash": [2, "always"],
    "scope-enum": [2, "always", scopes],
    "scope-empty": [2, "never"],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
};

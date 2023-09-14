/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVERSE } = require("next/constants");
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVERSE)
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "nemo",
        mongodb_password: "IYBIICfUt82C83M5",
        mongodb_database: "next-blogs-dev",
      },
    };
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "nemo",
      mongodb_password: "IYBIICfUt82C83M5",
      mongodb_database: "next-blogs",
    },
  };
};

module.exports = nextConfig;

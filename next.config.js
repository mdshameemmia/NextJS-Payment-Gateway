const nextTranslate = require("next-translate");
const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false ,
});

const nextConfig = {
  reactStrictMode: false,
  ...nextTranslate(),
};

module.exports = withPWA(nextConfig);

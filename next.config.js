const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    reactStrictMode: true,
    env: {
        meilisearchHost: process.env.NATIVEDB_MEILISEARCH_HOST,
        meilisearchKey: process.env.NATIVEDB_MEILISEARCH_KEY
    }
}

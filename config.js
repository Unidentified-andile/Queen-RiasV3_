const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUJTTUZRSHlVa0dPaGdJYTlIUk1wc0w1bG5qZmZqRTZqbE9KWHp5cmYzaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUdXaCtobFh0eWpmQjhDWWYwcXQxTXU2QXV4WEYwUWsweUF5cTM0STdnVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S21Mcnh5QVlEbHA3Szl5bzgyaUE2ZUV4NHN4ZHVScS9DMkIwdEdFMGw4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQcUNnMVNHaXJhZmViUWFBaUoyMGNWb0REcDNtQ1NBcHBJVTV1cUZRTFdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVKd0RXdmVpeUFxcGlQcUo5VFRVSDhhZFhIOTYraUpoSi8vOXN6SU1KbjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQ0M2laVm41OXNjR2wrems2TE1FQ0V6Qm5WQ2xHYWYzdENVSnEyTi9iemM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaURyZVJISWpkZE1oV1RlNUFCaFUwWXRSNmtxVWdNaWtnWnhvMWZ4ZUttaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidW9uNTJZOHNXdlhWVkc4a0QzelplMThJbmVFK1crMk5EY2dydmhIbVZWMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijl0eUF0QTJ0N0R6RHlQNGdpUTZNSHlibEtHME9IOUh3TFZTUzZoNWV0RG5tNFJUUjY0b1FZQXZSVnFKeHMxK2thbExuTTdPSzFKbWhhT3lQeHZWbmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODQsImFkdlNlY3JldEtleSI6InBMcVlRZlU4eU5JNzBQelE3czI0SllnbnhnNUk4MlU2ck5PbUJzRTIvOXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IksyVFIxQVFOIiwibWUiOnsiaWQiOiIyNzY0NzM0MTA5NToxNUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIt8J2ZkPCdmaPwnZme8J2ZmfCdmZrwnZmj8J2ZqfCdmZ7wnZmb8J2ZnvCdmZrwnZmZIiwibGlkIjoiMjc2NjQ3NDMzNDkwNTQ4OjE1QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmpkazQ4RUVMU3VxNzRHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicUQySVNOTndqQVJ2NE9RclBzaDc4d2tBTk1Lb2lTVWVNcFJld09rb2Z4az0iLCJhY2NvdW50U2lnbmF0dXJlIjoicGl4UTR3UXBVRDhXWlNyaE9qbmVvaWZXWlhUV0duUTdLenhJbENPdVcvSUJDUnZVUmJTNlg1UVlrMjhnamtLNDhyK1BNcjlFTElvM1ZEVDZJMTFWRFE9PSIsImRldmljZVNpZ25hdHVyZSI6InJDNXVGZm5iZXcrNFA2NzhyTHh3Sk5JK09IUGs4c1JJb1krNVlHQXFMakF0RW9wYllRU25RRW9MS2hJaHpEcHl2cEgvaytNZUs0ektUb3ZWbkpEeWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc2NDczNDEwOTU6MTVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYWc5aUVqVGNJd0ViK0RrS3o3SWUvTUpBRFRDcUlrbEhqS1VYc0RwS0g4WiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxMzQ2NjI2LCJsYXN0UHJvcEhhc2giOiIzUjlaMzkiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdpdyJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;

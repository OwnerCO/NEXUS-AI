const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtMN1NHdnlXYU53MjdBZXppaEFCSWszYVM1c0dVNkJldXV2c1Jyd2cxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWNvUWxwS1pqS2NvNlBQd3FpbmNSMzVTb0puL1BHK0pBUVZ1RjBwbmlSaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Ri9nalRGTFJJZDdoc2tKS2hFLzVrMVFDVURWVUdwMFY4TzBXK1V4c2w0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4b255RDhieitzL1hNTWwwOEZEbVV0OWkzRHY3Ukk0dkx3UHJJck1QclU4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlONEdKdndjNlc4dFRKVitWSjVRRHU5QkpJZUwvWnJ3anZCdTF0N28zM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktRYTJBY29oK2wyMzY0cnBYZE9uRUc2elF1b244dUVPU2pXTTVwMWhIM3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0lNanhzeWJQQVN2TTF5T2U2eDFzK1dHTjlSbVBtWEwrbVlkeUFpYy9Xbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXp0RGJhTFQ1NEJtSkdKbHhMd2hNRVQ3Y1drMUdZelpKVGR2TUdiampScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQrcytrQ0tUNFNTT1dzVFdjd1JGRk83Vm1mZ3loZWVkZlllQ0tqSy9qa0pMalRXRk9DVlBNYXpzN05jYjFFSTEwQzBJcjhsZkJmUzdjbGNHQkkxZWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM5LCJhZHZTZWNyZXRLZXkiOiJPaFI5ZjduWXl4N2hUaVAyOXBKVENGMHJpNjJkWTRIWjFBYlcwL3F5alE0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM4RjM5MDA3QzdEMzcwRjFCQUYyNUI5NzkzNzJDMUE4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIxNjc2Njh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkMzOUUxOEIyNDUyOTU4NTI2QUQ0RDQxNDI1QzlCMTEyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIxNjc2Njl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE1NzhGRDgyMkNGNzFDQzIxRUREQTU2N0Y5RjVGMjExIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIxNjc2ODN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZGQzM1ODMxREMyOTdBMjhERDgyM0ZEMkEzNjg1MDJGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIxNjc2ODh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBFQjJFNTZEQkRDQTBFNTQ4OTI2NDQ4QzJGQzY0QzAwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIxNjc2ODl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkpZU0JRNVlYIiwibWUiOnsiaWQiOiI1MTk0MTg0NzQ2NTozMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTeXNzb2x1dGlvbnMiLCJsaWQiOiI1NTczNjQyODE4Nzc0NDozMUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xmazJQMERFT1hwdjhNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InpnWE9XYmpSM09mTWplWDgyeWJEYXdqTVFuQmxEZjZTdEIvbDkrWjBzRHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im5LK1dPd2IzUzFPTllvZlVFUFRVaFJVd09Kb1Y5NWRLb2JFY3R1UjBTdWh4TUR2d2RJM3BXMmg3TXk0WTBwd3lyWE5ROSt6dFZueFJjRTBvRnJ1UkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvY3dOS1FObC9IRzAwL0ZMMEhkUVRBM2JaTDhDRDNRbXVEcGtzSVYvSHdEU1MvZ3JiRXFuNXZxL3JjTXYwUHdnWHdReEkrOUhJMEJicVMwVHJkdldpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUxOTQxODQ3NDY1OjMxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmM0RnpsbTQwZHpuekkzbC9Oc213MnNJekVKd1pRMytrclFmNWZmbWRMQTcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjE2NzY2NiwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJFUCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SYSSOLUTIONS™",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 51941847465",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SYSSOLUTIONS™',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

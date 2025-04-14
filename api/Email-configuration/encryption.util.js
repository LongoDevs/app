const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_SECRET || 'your-secret-key';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (hash) => {
  const [ivStr, encryptedText] = hash.split(':');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivStr, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
  return decrypted.toString();
};

module.exports = { encrypt, decrypt };

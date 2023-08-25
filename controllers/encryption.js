const crypto = require ("crypto")
const algorithm = "aes-256-cbc"
const InitVector = "f5S?E@TX*H^^_yfa";
const SecurityKey = "5tbMhNYjf&qx-WK#_6Ss5NueE2?my6Z$";

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(SecurityKey), InitVector)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
}

function decrypt(text) {
    let encryptedText = Buffer.from(text, 'hex')
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(SecurityKey), InitVector)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}

module.exports = { encrypt, decrypt }
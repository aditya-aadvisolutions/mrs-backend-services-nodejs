import * as crypto from 'crypto';

class AesEncryption {
    private static readonly key: Buffer = Buffer.from('VeryLongSecret', 'utf-8'); // Secret key
    private static readonly iv: Buffer = Buffer.from('HR$2pIjHR$2pIj12', 'utf-8'); // InitializationVector

    public static encrypt(plainText: string): string {
        const aes = crypto.createCipheriv('aes-128-cbc', this.generate128BitKeyFromPassphrase(), this.iv);
        let encryptedData = aes.update(plainText, 'utf-8', 'base64');
        encryptedData += aes.final('base64');
        return encryptedData;
    }

    public static decrypt(cipherText: string): string {
        const aes = crypto.createDecipheriv('aes-128-cbc', this.key, this.iv);
        let decryptedData = aes.update(cipherText, 'base64', 'utf-8');
        decryptedData += aes.final('utf-8');
        return decryptedData;
    }

    private static generate128BitKeyFromPassphrase(): Buffer {
        // Use PBKDF2 to derive a 128-bit key
        return crypto.pbkdf2Sync(this.key, this.iv, 10000, 16, 'sha256'); // 16 bytes = 128 bits
    }
}

export default AesEncryption;

import crypto from 'crypto';

export class TokenUtils {

    public static genWorldServerLoginToken(uid: string, worldServerUrl: string, subWorldId: string, time: number) {
        const SECRET_KEY = 'do not forget to modify here when start your own project';
        let content = uid + worldServerUrl + subWorldId + time + SECRET_KEY;
        let token = crypto.createHash('md5').update(content).digest('hex');
        return token;
    }
}
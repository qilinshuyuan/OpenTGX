import fs from 'fs';
import crypto from 'crypto';
import * as uuid from 'uuid';

export interface DBUserInfo {
    account?: string;
    password?: string;
    uid?: string;
    token?: string;
    name?: string;
    visualId?: number;
    subWorldId?: string;
}

let userDB = {} as any;
let userDBToken = {} as any;
let userDBUid = {} as any;
if (fs.existsSync('./user_db.json')) {
    let f = fs.readFileSync('./user_db.json', { encoding: 'utf-8', flag: 'r' });
    if (f) {
        let str = f.toString();
        userDB = JSON.parse(str);
    }
}

Object.keys(userDB).forEach((key) => {
    let userInfo = userDB[key];
    if (userInfo.token) {
        userDBToken[userInfo.token] = userInfo;
    }
    userDBUid[userInfo.uid] = userInfo;
});

function flushDB() {
    fs.writeFileSync('./user_db.json', JSON.stringify(userDB));
}

//don't change the implemetation of this function.
function encodePassword(password: string) {
    let content = password + 'opentgx+tsrpc';
    return crypto.createHash('sha1').update(content).digest('base64');
}

export class UserDB {
    public static getUserInfoWithPassword(account: string, password: string) {
        let info = userDB[account];
        if (!info) {
            return;
        }

        let psd = encodePassword(password);
        if (info.password == psd) {
            return info;
        }
        return undefined;
    }

    private static getUserInfo(account: string) {
        return userDB[account];
    }

    public static hasUser(account: string) {
        return userDB[account] != null;
    }

    public static generateToken(content: string) {
        let token = crypto.createHash('md5').update(content).digest('hex');
        return token;
    }

    public static insterNewUser(account: string, password: string) {
        let newUser = {
            account: account,
            password: encodePassword(password),
            uid: uuid.v4(),
            subWorldId: '',
        };
        userDB[account] = newUser;
        userDBUid[newUser.uid] = newUser;
        flushDB();
    }

    public static updateUserData(account: string, info: DBUserInfo) {
        let dbData = this.getUserInfo(account);
        if (!dbData) {
            return;
        }
        Object.keys(info).forEach(key => {
            if (key == 'token') {
                this.clearUserData(account, 'token');
                dbData.token = info.token;
                userDBToken[dbData.token] = dbData;
            }
            else {
                dbData[key] = (info as any)[key];
            }
        });
        flushDB();
    }

    public static clearUserData(account: string, key: string = 'token') {
        let dbData = this.getUserInfo(account);

        if (key == 'token') {
            delete userDBToken[dbData.token];
        }

        delete dbData[key];

        flushDB();
    }

    public static getUserInfoByToken(token: string): Readonly<any> {
        return userDBToken[token];
    }

    public static updateUserDataByToken(token: string, info: DBUserInfo) {
        let userInfo = userDBToken[token];
        if (!userInfo) {
            return;
        }
        this.updateUserData(userInfo.account, info);
    }

    public static clearUserDataByToken(token: string, key: string) {
        if (key == 'token') {
            return;
        }

        let userInfo = userDBToken[token];
        if (!userInfo) {
            return;
        }
        this.clearUserData(userInfo.account, key);
    }

    public static getUserInfoByUid(uid: string): Readonly<any> {
        return userDBUid[uid];
    }

    public static updateUserDataByUid(uid: string, info: DBUserInfo) {
        let userInfo = userDBUid[uid];
        if (!userInfo) {
            return;
        }
        this.updateUserData(userInfo.account, info);
    }

    public static clearUserDataByUid(uid: string, key: string) {
        if (key == 'uid') {
            return;
        }

        let userInfo = userDBUid[uid];
        if (!userInfo) {
            return;
        }
        this.clearUserData(userInfo.account, key);
    }
}
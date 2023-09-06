
const KEY_ACCOUNT = 'user:account';
const KEY_PASSWORD = 'user:password';

export class UserLocalCache {
    private static _inst: UserLocalCache;
    public static get inst(): UserLocalCache {
        if (!this._inst) {
            this._inst = new UserLocalCache();
        }
        return this._inst;
    }

    public get account(): string {
        return localStorage.getItem(KEY_ACCOUNT);
    }

    public get password(): string {
        return localStorage.getItem(KEY_PASSWORD);
    }

    public storeAccount(account: string) {
        localStorage.setItem(KEY_ACCOUNT, account);
    }

    public storePassword(password: string) {
        localStorage.setItem(KEY_PASSWORD, password);
    }
}
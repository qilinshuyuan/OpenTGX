/**
 * @en call JSON mthods safely.
 * @zh 用于安全操作JSON相关函数
 * */
export class SafeJSON {
    public static parse(text: string, reciver?: (key: any, value: any) => any): any {
        try {
            return JSON.parse(text, reciver);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public static stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number) {
        try {
            return JSON.stringify(value, replacer, space);
        } catch (error) {
            return null;
        }
    }
}
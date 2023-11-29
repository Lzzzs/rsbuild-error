import crypto from "crypto";

export default class EncryptTool {

    /**
     * md5加密
     * @param content
     */
    static md5(content: string): string {
        return crypto.createHash('md5').update(content).digest('hex');
    }

    /**
     * 公共签名JS算法
     * @param params
     * @param secret
     * @returns {string}
     */
    static sign(params: object, secret: string): string {
        let newObj = {}, newKey = Object.keys(params).sort(), newKeyLength = newKey.length;
        for (let i = 0; i < newKeyLength; i++) {
            // @ts-ignore
            if (params[newKey[i]] == null) {
                continue;
            }

            // @ts-ignore
            newObj[newKey[i]] = params[newKey[i]];
        }
        let text = secret;
        for (let item in newObj) {
            // @ts-ignore
            text += item + newObj[item];
        }
        text += secret;

        return (crypto.createHash('md5').update(text).digest('hex')).toUpperCase();
    }

    /**
     * 获取su参数
     * @returns {string}
     */
    static getRequestSu() {
        const date = new Date();
        const year = date.getFullYear();
        const month = this.__preFixZero(date.getMonth() + 1);
        const day = this.__preFixZero(date.getDate());
        const hour = this.__preFixZero(date.getHours());
        const min = this.__preFixZero(date.getMinutes());
        const sec = this.__preFixZero(date.getSeconds());
        const ms = date.getMilliseconds();

        return `${String(year).substring(2, 4)}${month}${day}${hour}${min}${sec}${ms}1000000${this.__randomNumber(10)}`;
    }

    /**
     * 不满两位补'0'
     * @param n
     * @returns {string}
     * @private
     */
    private static __preFixZero(n: any): any {
        n = n.toString();
        // @ts-ignore
        return n[1] ? n : '0' + n;
    }

    /**
     * 随机生成N位数字
     * @param n
     * @returns {null|number}
     * @private
     */
    private static __randomNumber(n: number): any {
        if (n > 21) {
            return null;
        }

        return parseInt(String((Math.random() + 1) * Math.pow(10, n - 1)));
    }
}

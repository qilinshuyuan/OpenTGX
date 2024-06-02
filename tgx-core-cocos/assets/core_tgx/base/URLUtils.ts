export class URLUtils{
    public static urlParse(url:string) {
        var params = {};
        if (!url) {
            return params;
        }
        var name, value;
        var str = url; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substring(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    
        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    }
}
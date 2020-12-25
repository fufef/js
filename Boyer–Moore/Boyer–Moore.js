let fs = require('fs');
let arg = process.argv;
let s = fs.readFileSync(arg[2], 'utf8');
let t = arg[3];
let ch = new Array();
let suf = new Array();
let res = new Array();
let m = t.length;
let str = '';
for (let j = 0; j < m; j++){
    ch[t.charAt(j)]=m-j-1;
}
for (let j = m - 1; j > 0; j--){
    str = t[j] + str;
    suf[str.length] = m;
    for (let i = j - 1; i >= 0; i--){
        if (str == t.substring(i, i + str.length)){
            suf[str.length] = i;
            break;
        }
    }
}
suf[0]=1;
let i = 0;
let l;
while (i < s.length - m + 1){
    l = 0;
    while (l < m){
        if (t[m - l - 1]==s[i + m - l - 1])
            l++;
        else break;
    }
    if (l==m){
        res.push(i + 1);
        i++;
    }
    else{
        if (ch[s[i+m-l]] == 0 || ch[s[i+m-l]])
            shift = ch[s[i+m-l]];
        else 
            shift = m;
        i += Math.max(shift, suf[l], 1);
    }
}
if (res.length > 0)
    console.log('Indexes are:');
else
    console.log('There are no matches in text');
for (let j = 0; j < res.length; j++){
    console.log(res[j]);
}

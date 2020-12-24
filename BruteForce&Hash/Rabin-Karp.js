function Check(){
	for (let k = 0; k < m; k++){
		if (s[i - 1 + k] != t[k])
			return 0;
	}
	return 1;
}

let fs = require('fs');
let arg = process.argv;
let s = fs.readFileSync(arg[2], 'utf8');
let t = arg[3];
let res = new Array();
let m = t.length;
let hashT = 0;
let hashSr = 0;
for (let j = 0; j < m; j++)
{
	hashT += t.charCodeAt(j) * Math.pow(2, m - j - 1);
	hashSr += s.charCodeAt(j) * Math.pow(2, m - j - 1);
}
let i = 1;
while (i <= s.length - m + 1)
{
	if (hashT == hashSr && Check())
		res.push(i);
	hashSr = (hashSr - s.charCodeAt(i - 1) * Math.pow(2, m - 1)) * 2 + s.charCodeAt(i + m - 1);
	i++;
}
if (res.length > 0)
	console.log('Indexes are:');
else
	console.log('There are no matches in text');
for (let j = 0; j < res.length; j++)
	console.log(res[j]);

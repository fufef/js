let fs = require('fs');
let arg = process.argv;
let s = fs.readFileSync(arg[2], 'utf8');
let t = arg[3];
let res = new Array();
let m = t.length;
let i = 0;
while (i < s.length - m + 1){
	let j = 0;
	while (s[i + j] == t[j]){
		j++;
		if (j == m){
			res.push(i + 1);
			break;
		}
	}
	i++;
}
if (res.length > 0)
	console.log('Indexes are:');
else
	console.log('There are no matches in text');
for (let j = 0; j < res.length; j++)
	console.log(res[j]);

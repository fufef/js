let fs = require('fs');
let arg = process.argv;
let text = fs.readFileSync(arg[2], 'utf8');
let t = arg[3];
let m = t.length;
let alph = new Array();
for (let i = 0; i < m; i++)
	alph[t.charAt(i)] = 0;
let del = new Array(m + 1);
for (let j = 0;j <= m; j++)
	del[j] = new Array();
for (let i in alph)
	del[0][i] = 0;
for (let j = 0; j < m; j++){
	let prev = del[j][t.charAt(j)];
	del[j][t.charAt(j)] = j + 1;
	for (let i in alph)
		del[j+1][i] = del[prev][i];
}
let indexes = new Array();
let q = 0;
for (let i = 0; i < text.length; i++)
	for (let j in alph)
		if (text.charAt(i) == j)
		{
			q = del[q][j];
			if (q == m)
				indexes.push(i - m + 1);
			break;
		}
if (indexes.length > 0)
	console.log('Indexes are:');
else
	console.log('There are no matches in text');
for (let i = 0; i < indexes.length; i++){
	console.log(indexes[i]);
}

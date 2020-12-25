function Node(letter, freq, used, link, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.link = link;
	this.code = code;
}
function FindMinUnused(){
		let minInd = -1;
		let minFreq = s.length;
		for (let j = 0; j < tree.length; j++){
			if ((tree[j].used == 0) && (tree[j].freq <= minFreq)){
				minInd = j;
				minFreq = tree[j].freq;	
			}
		}
		return minInd;
}
let fs = require('fs');
let arg = process.argv;
let s = fs.readFileSync(arg[2], 'utf8');
let tree = new Array();
let alph = new Array();
for (let i = 0;i < s.length; i++)
	alph[s.charAt(i)] = 0;
for (let i = 0;i < s.length; i++)
	alph[s.charAt(i)]++;
for (let i in alph){
	tree.push(new Node (i, alph[i], 0, null, '0')); 
}
let min1, min2;
let treeLength = tree.length;

for (let i = 0; i < treeLength - 1; i++){
	min1 = FindMinUnused();
	tree[min1].used = 1;
	tree[min1].link = tree.length;
	tree[min1].code = '1';
	min2 = FindMinUnused();
	tree[min2].used = 1;
	tree[min2].link = tree.length;
	tree[min2].code = '0';
	tree.push(new Node (tree[min2].letter+tree[min1].letter, tree[min1].freq+tree[min2].freq, 0, null, '1'));
}
if (treeLength > 1){
	for (let i = 0; i < treeLength; i++){
		let j = i;
		let code = '';
		while(true){
			if (!tree[j].used){
				tree[i].code = code;
				break;
			}
			code = tree[j].code+code;
			j = tree[j].link;
		}
	}
}

function code(s){
	let dict = new Array();
	for (let i = 0; i < treeLength; i++){
		dict[tree[i].letter] = tree[i].code;
	}
	let result = '';
	for (let i=0;i<s.length;i++){
		result += dict[s.charAt(i)];
	}
	return result;
}

function decode(codedText){
	let dict = new Array();
	for (let i = 0; i < treeLength; i++){
		dict[tree[i].code] = tree[i].letter;
	}
	let result = '';
	let k = 0;
	let str = '';
	while (k < codedText.length){
		str += codedText[k];
		if (dict[str]){
			result += dict[str];
			str='';
		}
			
		k++;
	}
	return result;
}
let codedText = code(s);
console.log('Coded text is:', codedText);
let decodedText = decode(codedText);
console.log('Decoded text is:', decodedText);

export default function(str:String):String {
  let newStr:String = '';
  for(let i=0;i<str.length;i++) {
    if(!parseInt(str[i])) newStr+=str[i];
  }
  return newStr;
}
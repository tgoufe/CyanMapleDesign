export default function(text, data) {
  let styleString = "";
  styleString += "font-size:13px;";
  styleString += 'font-family:"microsoft yahei";';
  styleString += "color:#125ce8;";
  let line = "------------------";
  if (arguments.length !== 1) {
    console.log("%c" + line + text.toString() + line + "", styleString);
    for (let i = 1; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
    console.log("%c" + line + text.toString() + line + "\n\n\n", styleString);
  } else {
    console.log("%c" + line + line + "", styleString);
    console.log(text);
    console.log("%c" + line + line + "\n\n\n", styleString);
  }
}

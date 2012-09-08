load("sxoop_strings.js");
var originalText = readFile(arguments[0]);
var newText = SXOOP.strings.here(originalText);
print(newText);
//
// a rhino script to expand javascript Here documents
// into their quoted string equivalents
//
// usage:
// java -jar /opt/rhino/js.jar rhere.js {input-file} > {output-file}
//
load("sxoop_strings.js");
var originalText = readFile(arguments[0]);
var newText = SXOOP.strings.here(originalText);
print(newText);
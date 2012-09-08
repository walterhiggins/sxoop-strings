# Sxoop Strings

A collection of string-building functions for Javascript.

sxoop-strings adds 'Here Documents' to javascript.

    var a = ""/*<<END
    Some stuff
    goes here
    END*/;

... is the same as this...

var a = ""
    + 'Some stuff\n'
    + 'goes here\n'
    ;

... this in fact is the code which is generated by the
SXOOP.strings.here() function. The Here document must be embbeded
inside a C-style comment block so that your code editor won't
complain. You can use Here documents anywhere you would use a regular
javascript string. e.g. as a parameter to a function...

    alert(""/*<<MESG
    This is 
    a string
    that spans
    many 
    many
    lines
    MESG*/);
    
Because javascript does not support 'here docs' in its syntax, the
source file must be processed first. If you have Java on your machine
you can use Rhino to process the file by first creating a small Rhino
script like this one...

    //
    // filename: rhere.js 
    //
    load("sxoop_strings.js");
    var originalText = readFile(arguments[0]);
    var newText = SXOOP.strings.here(originalText);
    print(newText);    
    
... then calling it like this...
 
    java -jar /opt/rhino/js.jar rhere.js example.html
    
... this will print out the processed file on standard out.    


    
    

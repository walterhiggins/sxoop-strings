# Sxoop Strings

A collection of string-building functions for Javascript.

sxoop-strings adds [Here Documents][h] to javascript so that you can
write code like this ...

    var a = ""/*[[
    Some stuff
    goes here
    ]]*/;

... and by running a simple rhino script on the source file, it will
be turned into this...

    var a = ""
    + 'Some stuff\n'
    + 'goes here\n'
    ;

... this in fact is the code which is generated by the
SXOOP.strings.here() function. The Here document must be embbeded
inside a C-style comment block so that your code editor won't
complain. You can use Here documents anywhere you would use a regular
javascript string. e.g. as a parameter to a function...

    alert(""/*[[
    This is 
    a string
    that spans
    many 
    many
    lines
    ]]*/);
    
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
The start delimiter for the long multi-line string looks like this...

    /*[[

... and should always be preceded by `""` (two double-quotes) or `''`
(two single-quotes).  This is so that the javascript code will still
be syntactically valid before it's processed.  Long multi-line strings
can begin and end on the same line as the start and end delimiters
like this...

    var longString = ""/*[[This is
    a very,
    very,
    long string]]*/;

... or if you prefer, they can begin on the next line like this...

    var longString = ""/*[[
    This is
    a very,
    very,
    long string
    ]]*/;

... in both cases, the longString value will be the same.

The included [rhere.js][r] Rhino script can be used as-is or included
in an ANT or other build tool to generate expanded javascript code
from a supplied javascript (or other) source file that includes Here
strings.


[h]: http://en.wikipedia.org/wiki/Here_document
[r]: https://github.com/walterhiggins/sxoop-strings/blob/master/rhere.js
    

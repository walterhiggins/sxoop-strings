//
// A collection of string-related utility functions 
// mostly for string building.
//
var SXOOP = SXOOP || {};
SXOOP.strings = 
{
    /* String */ fill: function(/* String */ str, /* Object */ param){},
    /* String */ here: function(/* String */ js){}
};

(function(){
    var START_HERE_RE = /(.*)\/\*<<(.+)/;

    var _here = function(/* String */ js) {
        var result = [];
        var lines = js.split(/\n/);
        for (var i = 0;i < lines.length; i++){
            var match = lines[i].match(START_HERE_RE);
            if (match){
                result.push(match[1]);
                var endToken = match[2];
                var j = i + 1;
                var closePtn = new RegExp("^" + endToken + "\\*\\/(.*)");
                for (;j < lines.length; j++){
                    var closed = lines[j].match(closePtn);
                    if (closed){
                        i = j;
                        j = lines.length;
                        result.push(closed[1]);
                    }else{
                        var escaped = lines[j].replace(/'/g,"\\'");
                        result.push("+'" + escaped +"\\n'");
                    }
                }
            }else{
                result.push(lines[i]);
            }
        }
        return result.join("\n");
    };
    var FILL_RE = /\{(.*)\}/;
    var _fill = function(/* String */ str, /* Object */ param){
        return str.replace(/\{([^\}]+)\}/g,function(dummy,prop){ return param[prop];});
    };
    SXOOP.strings.here = function(js){
        return _here(js);
    };
    SXOOP.strings.fill = function(str, param){
        return _fill(str,param);
    };
}());

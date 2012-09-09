//
// A collection of string-related utility functions 
// mostly for string building.
//
var SXOOP = SXOOP || {};
SXOOP.strings = 
{
    /* String */ fmt: function(/* String */ str, /* Object */ param){},
    /* String */ here: function(/* String */ js){}
};

(function(){
    var START_HERE_RE = /(.*)\/\*\[\[(.*)/;
    var END_HERE_RE = /(.*)\]\]\*\/(.*)/;
    var _here = function(/* String */ js) {
        var result = [];
        var lines = js.split(/\n/);
        var qq = function(s){
            s = s.replace(/'/g,"\\'");
            return "+'"+s+"\\n'";
        };

        for (var i = 0;i < lines.length; i++)
        {
            var match = lines[i].match(START_HERE_RE);
            if (match)
            {
                result.push(match[1] + qq(match[2]));
                var j = i + 1;
                for (;j < lines.length; j++)
                {
                    var closed = lines[j].match(END_HERE_RE);
                    if (closed){
                        i = j;
                        j = lines.length;
                        result.push(qq(closed[1]) + closed[2]);
                    }else{
                        result.push(qq(lines[j]));
                    }
                }
            }else{
                result.push(lines[i]);
            }
        }
        return result.join("\n");
    };
    var FILL_RE = /\{(.*)\}/;
    var _fmt = function(/* String */ str, /* Object */ param){
        return str.replace(/\{([^\}]+)\}/g,function(dummy,prop){ 
           var result = prop;
           if (typeof param[prop] != 'undefined'){
               result = param[prop];
           }
           return result;
        });
    };
    SXOOP.strings.here = function(js){
        return _here(js);
    };
    SXOOP.strings.fmt = function(str, param){
        return _fmt(str,param);
    };
}());


define(["assert", "wilton/hex"], function(assert, hex) {
    "use strict";

    print("test: wilton/hex");
    
    var str = "привет";
    var encoded = hex.encodeUTF8(str);
    var decoded = hex.decodeUTF8(encoded);
    assert.equal(decoded, str);
});

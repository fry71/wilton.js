/*
 * Copyright 2017, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "assert",
    "wilton/Channel",
    "wilton/CronTask"
], function(assert, Channel, CronTask) {
    "use strict";

    print("test: wilton/CronTask");
    
    var chanOut = new Channel("cronTestOut");
    var chanIn = new Channel("cronTestIn");

    var cron = new CronTask({
        expression: "* * * * * *",
        callbackScript: {
            module: "wilton/test/helpers/cronHelper",
            func: "increment1"
        }
    });

    var start = Date.now();
    chanOut.send(42);
    assert.equal(chanIn.receive(), 43);
    assert(Date.now() - start > 1000);

    chanOut.send(44);
    assert.equal(chanIn.receive(), 45);
    assert(Date.now() - start > 2000);

    // check handle construction
    var cron2 = new CronTask({
        handle: cron.handle
    });
    assert.equal(cron2.handle, cron.handle);

    cron2.stop();

    chanOut.close();
    chanIn.close();
});

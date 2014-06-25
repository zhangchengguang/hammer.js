module("eventEmitter");

test("test the eventemitter", function () {
    expect(6);

    var ee = new Hammer.Manager(document.querySelector('#qunit-fixture'));
    var inputData = {
        target: document.body,
        srcEvent: {
            preventDefault: function () {
                ok(true, "preventDefault ref");
            },
            target: document.body
        }
    };

    function event3Handler() {
        ok(true, "emitted event3");
    }

    ee.on("testEvent1", function () {
        ok(true, "emitted event");
    });
    ee.on("testEvent2", function (ev) {
        ok(true, "emitted event");
        ev.preventDefault();
        ok(ev.target === document.body, 'target is the body');
    });
    ee.on("testEvent3", event3Handler);

    ee.emit("testEvent1", inputData);
    ee.emit("testEvent2", inputData);
    ee.emit("testEvent3", inputData);

    // unbind testEvent2
    ee.off("testEvent2");
    ee.off("testEvent3", event3Handler);

    ee.emit("testEvent1", inputData); // should trigger testEvent1 again
    ee.emit("testEvent2", inputData); // doenst trigger a thing
    ee.emit("testEvent3", inputData); // doenst trigger a thing

    // destroy
    ee.destroy();

    ee.emit("testEvent1", inputData); // doenst trigger a thing
    ee.emit("testEvent2", inputData); // doenst trigger a thing
    ee.emit("testEvent3", inputData); // doenst trigger a thing
});

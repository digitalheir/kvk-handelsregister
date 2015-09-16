function (head, req) {
    provides("text", function () {
        var row;
        start({
            "headers": {
                "Content-Type": "text/plain; charset=utf-8",
                "Content-Encoding": "utf-8"
            }
        });
        while (row = getRow()) {
            if(!row.key.match(/(\.|-)+/)){
            send(row.key+ "\n");}
        }
    });
}
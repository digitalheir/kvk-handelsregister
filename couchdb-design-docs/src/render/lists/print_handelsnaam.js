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
            if(row.doc && row.doc.handelsnaam){
                send(row.doc.handelsnaam + "\n");
            }else{
                send("Use include_docs=true\n");
            }
        }
    });
}
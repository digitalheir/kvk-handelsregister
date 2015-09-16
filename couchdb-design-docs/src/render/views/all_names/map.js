function (doc) {
    if(doc.meerinfo){
        var names = [];
        if(doc.handelsnaam){
            doc.handelsnaam.split("|").forEach(function(naam){
                if(naam.trim().length>0){
                    emit(naam.trim(),1);
                }
            });
        }
        doc.meerinfo.forEach(
            function(el){
                el.tekst.split("|").forEach(function(naam){
                    if(naam.trim().length>0){
                        emit(naam.trim(),1);
                    }

                });
            });
    }

}
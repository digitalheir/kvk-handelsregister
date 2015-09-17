function (doc) {
    if(doc.handelsnaam && doc.subtype == 'Rechtspersoon') {
        emit(doc, 1);
    }
}
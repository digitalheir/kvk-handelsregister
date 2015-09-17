function (doc) {
    if(doc.handelsnaam && doc.subtype == 'Rechtspersoon') {
        emit(doc.handelsnaam, 1);
    }
}
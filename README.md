# Kamer van Koophandel Handelsregister

Laatst geüpdatet: **7-9-2015**

Dit is documentatie voor een spiegel-database van het Handelsregister van de Kamer van Koophandel. Ik heb deze database gemaakt omdat ik een lijst met bedrijfsnamen in Nederland nodig had voor named
entity recognition in Nederlandse rechtspraak, en nergens een dergelijke lijst kon vinden. 

Ik heb er voor gekozen om geen volledige adressen te verstrekken, alleen postcode en stadsnaam. Dit omdat ik niet wil dat deze lijst gebruikt gaat worden voor mailing lists, en om de KvK de inkomsten uit een [adressenbestand](http://www.kvk.nl/producten-bestellen/adressenbestand/) niet te ontnemen.

Ik denk wel dat deze informatie (zonder adressen) nuttig kan zijn
voor andere andere onderzoekers, dus stel de database vrij beschikbaar. Momenteel is onduidelijk of dergelijk hergebruik
wenselijk is en hier wordt momenteel politiek omtrent bedreven; zie de sectie [**Licentie**](#licentie).

Voor een (non-bulk) API waarmee je ook adressen kunt opvragen, verwijs ik naar https://openkvk.nl/.

Ik geef geen garanties geven over de compleetheid van deze database. Men kan de versheid van een gegeven document staven aan het veld `lastSyncedWithKvK`.

## Gebruik
De data staat in een CouchDB database en volgt de [API van CouchDB](https://wiki.apache.org/couchdb/HTTP_Document_API):

Root URL: https://leibniz.cloudant.com/kvk_handelsregister/

### Voorbeelden

|URL|beschrijving|
|---|---|
|[_all_docs](https://leibniz.cloudant.com/kvk_handelsregister/_all_docs?limit=10&include_docs=true&startkey="0123"&endkey="0200043"&stale=ok)| Eerste 10 documenten vanaf kvk nummer `0123xxxx` tot `0200043x` |
|[kvknummer](https://leibniz.cloudant.com/kvk_handelsregister/_design/api/_view/kvknummer?limit=10&startkey="01000169"&reduce=false&stale=ok)|Index op dossiernummer, subdossiernummer, vestigingsnummer; eerste 10 documenten vanaf `01000169`|
|[postcode](https://leibniz.cloudant.com/kvk_handelsregister/_design/api/_view/postcode?limit=10&startkey=["2","2"]&reduce=false&stale=ok)|Index op postcode; eerste 10 documenten vanaf postcode `22xx XX`|
|[Unieke handelsnamen](https://leibniz.cloudant.com/kvk_handelsregister/_design/ddoc/_view/all_names?limit=20&reduce=true&group_level=1&stale=ok)|Lijst met unieke handelsnamen; eerste 20|
|[Full text search](https://leibniz.cloudant.com/kvk_handelsregister/_design/api/_search/newSearch?q=duijsen&stale=ok&limit=10)|Full text search geïndexeerd op elk veld; eerste 10 resultaten van zoeken op default index met query `duijsen`. Zie [Cloudant search tutorial](https://cloudant.com/for-developers/search/)|

Het is ook mogelijk om een [Cloudant query](https://cloudant.com/using-cloudant-query-tutorial/) uit te voeren op elk veld:

**`POST`**` https://leibniz.cloudant.com/kvk_handelsregister/_find*`

body:
```json
{
  "selector": {
    "postcode": {
      "$gt": "2210",
      "$lt": "3000AZ"
    },
    "type": "Hoofdvestiging"
  },
  "fields": [
    "_id",
    "_rev"
  ],
  "sort": [
    {
      "postcode": "asc"
    }
  ]
}
```

## Licentie
De Kamer van Koophandel specificeert zelf geen licentie, maar [Wet hergebruik van overheidsinformatie](http://wetten.lawly.nl/bwb/BWBR0036795) lijkt van toepassing. Onduidelijk is of het Handelsregister onder de [Databankenwet](http://wetten.lawly.nl/bwb/BWBR0010591) zou moeten vallen. Onlangs is een wetsvoorstel ingediend waardoor dit wel het geval zou zijn.

Een dergelijk databankenrecht is in mijn visie onwenselijk, omdat de KvK dan een monopolie krijgt op de verstrekking van informatie uit het Handelsregister zoals momenteel het geval is met het Kadaster:

> In het geval van het Kadaster heeft dit tot een volgens sommigen onwenselijke situatie geleid: door het vragen van hoge prijzen voor onbewerkte data onder restrictieve licenties en lage prijzen voor verrijkte data heeft het Kadaster een monopoliepositie verworven die onmogelijk te beconcurreren is.

([ejure](http://www.ejure.nl/2013/01/open-overheidsdata/))



> Het voorstel betreft: 
- Verplichting voor bestuursorganen om geconstateerde onjuistheden in niet-authentieke gegevens in het handelsregister terug te melden; 
- Vastlegging wettelijke basis voor de inputfinanciering, waarbij bestuursorganen het raadplegen van het handelsregister financieren door middel van een abonnement;
- [...]
- **Voorbehoud met betrekking tot het databankenrecht voor de Kamer van Koophandel**

([Internetconsultatie Wijziging van de Handelsregisterwet 2007 en het Burgerlijk Wetboek](http://www.internetconsultatie.nl/handelsregister))

> In Nederland zullen thans drie instellingen worden aangewezen voor deze uitzondering omdat zij kostendekkend moeten werken: Het Kadaster, de Dienst Wegverkeer (RDW) en de Kamer van Koophandel. De reden om deze instellingen uit te zonderen is erin gelegen dat zij de eigen bedrijfsvoering voor een groot gedeelte uit de inkomsten uit het verstrekken van de door hen geproduceerde informatie moeten financieren. Indien deze bron van inkomsten zou worden verminderd, betekent dat een inkomstenderving die niet op een andere wijze kan worden gedragen.

([Memorie van Toelichting, Regels over het hergebruik van overheidsinformatie (Wet hergebruik van overheidsinformatie)](https://zoek.officielebekendmakingen.nl/kst-34123-3.html))

Twijfelachtig is of dit wel terecht is:

> Het claimen van een databankenrecht op iets dat niet wordt verzameld,
maar bij wet moet worden aangeleverd is zonder twijfel de meest absurde 
voorstel in deze hele aanpasing. Maar het kent ook een mooie
kant: dit is het eerste document waar door een overheidsorganisatie wordt erkent dat op het Handelsregister geen expliciet voorbehoud is gemaakt, daarmee is de verzameling op dit moment open data.

([openkvk.nl brief aan Ministerie Economische Zaken](https://docs.google.com/viewer?a=v&pid=forums&srcid=MDU2Nzg5OTU4NzMwNzczNzIyODABMTg0MzA2OTg1NjkwMzAzMzk5ODgBalpUdmNCZG5zZlFKATAuMQEBdjI))



Dit zou geen groot probleem zijn als de KvK zou voorzien in alle gebruiksgevallen van het Handelsregister, maar het bestaan van derde partijen zoals openkvk.nl getuigt dat dit niet het geval is. Ook rijmt een dergelijke wet niet met het Open Data-beleid dat Nederland ambieert. 

> De aanpassing van deze wet is er primair op gericht om de Kamer van Koophandel Nederland "slagvaardiger" te maken en haar informatie positie verder te monopoliseren. Private alternatieven gebruikmakend van de informatie uit het Handelsregister kunnen de pas worden afgesneden. Wij stimuleren al ruim 5 jaar het gebruik van het handelsregister. OpenKvK heeft er eigenhandig voor gezorgd dat de arrogante houding van de Kamer van Koophandel 's nachts te sluiten moest worden herzien. De uit angst voor de apps die op OpenKvK bouwden begon de Kamer van Koophandel Nederland met de ontwikkeling van eigen apps en lapte de wet Markt en Overheid aan haar laars. Waar men in België de Kruispuntbank van Ondernemingen open heeft gemaakt volgens het Nederlandse BAG model: gratis maandelijkse updates, voor een dagelijkse mutatie bestand betaalt men, wil de Nederlandse overheid de luiken verder sluiten.

> [...] 

> Tevens zijn al een aantal gemeentes bij OpenKvK gekomen of ze niet van onze API gebruik konden maken, de toegang tot het NHR is praktisch onwerkbaar: er kan niet op losse velden worden gezocht.

([openkvk.nl Google Group](https://groups.google.com/forum/#!topic/openkvk/aUA1mp8bJBY))

OpenState heeft een lovenswaardige brief gestuurd aan premier Rutte:

> Om echt economische waarde te genereren met open data, zal het kabinet ervoor moeten zorgen dat het handelsregister wordt open gesteld. [...] In Nederland is, in tegenstelling tot landen als het Verenigd Koninkrijk, België, Noorwegen en Denemarken, het handelsregister gesloten en zijn gegevens in het register niet voor iedereen vrij toegankelijk.

([Persbericht OpenState](http://openstate.pr.co/109981-open-state-roept-kabinet-op-tot-openstelling-handelsregister))

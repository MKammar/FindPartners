var fs = require("fs");
const path = require("path");
const p  = path.join(__dirname,'../../','partners.json');

//Great-circle-distance function
function GreatCircleDistance(ACoordinate, BCoordinate, mainLong, mainLat, reduis) {
    var longitude = ACoordinate * (Math.PI/180);
    var latitude = BCoordinate * (Math.PI/180);
    var difference  = Math.abs(longitude - mainLong);
    var res1 = Math.sin(latitude) * Math.sin(mainLat) + Math.cos(latitude) * Math.cos(mainLat)* Math.cos(difference);
    var centralAngle = Math.acos(res1);
    var d = reduis * centralAngle;

    return d;
}

//returns only partners within the given range in kilometers

exports.GetPartnersFiltered = (req, res) => {
    fs.readFile(p, 'utf-8', function(err, data)  {
        var partners = JSON.parse(data);
        var mainLong = 0.8990970022165;
        var mainLat = -0.0024883333679;
        var reduis = 6371.009;
        var within = [];
        
    
            partners.forEach(element => {
                val = [];
                var i = 0;
                
                element.offices.forEach(office => {
                    var coordinate = office.coordinates.split(',')
    
                    var d = GreatCircleDistance(coordinate[0],coordinate[1],mainLong,mainLat,reduis);
    
                    if(d <= req.params.Hdistance && d >= req.params.Ldistance){
                        newAdd = {};
                        newAdd.address = office.address;
                        newAdd.Long = coordinate[0];
                        newAdd.Latit = coordinate[1];
                        val.push(newAdd);
                        i = 1;
                    }
                });
                if(i == 1) {
                    var newpart = {};
                    newpart.name = element.organization;
                    newpart.customerLocations = element.customerLocations;
                    newpart.website = element.website;
                    newpart.services = element.services;
                    newpart.address = val;
    
                    within.push(newpart);
                }
            });
    
            //sorting by company name
            within.sort(function(a, b) {
                var nameA = a.name.toUpperCase(); 
                var nameB = b.name.toUpperCase() 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
            var newData = JSON.stringify(within);
    
            res.send(newData); 
        
    });
}


// 1 Encontrar las ciudades más cercanas sobre la colección recién creada mediante un enfoque MapReduce conforme a los pasos que se ilustran en el tutorial práctico.


var mapCode = function() {
    emit(
        this.CountryID,
        {
            "data":
            [
                {
                    "city": this.City,
                    "lat":  this.Latitude,
                    "lon":  this.Longitude
                }
            ]
        }
    );
}

var reduceCode = function(key, values) {
	var reduced = {
        "data": []
    };
	for (var i in values) {
		var inter = values[i];
		for (var j in inter.data) {
			reduced.data.push(inter.data[j]);
		}
	}
	return reduced;
}

var finalize =  function (key, reduced) {
	if (reduced.data.length == 1) {
		return {
            "message" : "Este país solo contiene una ciudad"
        };
	}
	var min_dist = 999999999999;
	var city1 = {
        "city": ""
    };
	var city2 = {
        "city": ""
    };
	var c1;
	var c2;
	var d;
	for (var i in reduced.data) {
		for (var j in reduced.data) {
			if (i >= j) {
                continue;
            }
			c1 = reduced.data[i];
			c2 = reduced.data[j];
			d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
			if (d < min_dist && d > 0) {
				min_dist = d;
				city1 = c1;
				city2 = c2;
			}
		}
	}
	return {
        "city1": city1.city,
        "city2": city2.city,
        "dist": Math.sqrt(min_dist)
    };
}

db.runCommand({
    mapReduce: "cities",
    map: mapCode,
    reduce: reduceCode,
    finalize: finalize,
    query: { CountryID: { $ne: 254 } },
    out: { merge: "ciudades_proximas" }
});

db.ciudades_proximas.find().pretty();



// 2. ¿Cómo podríamos obtener la ciudades más distantes en cada país?


var mapCode = function() {
    emit(
        this.CountryID,
        {
            "data":
            [
                {
                    "city": this.City,
                    "lat":  this.Latitude,
                    "lon":  this.Longitude
                }
            ]
        }
    );
}

var reduceCode = function(key, values) {
	var reduced = {
        "data": []
    };
	for (var i in values) {
		var inter = values[i];
		for (var j in inter.data) {
			reduced.data.push(inter.data[j]);
		}
	}
	return reduced;
}

var finalize =  function (key, reduced) {
		if (reduced.data.length == 1) {
			return {
	            "message" : "Este país solo contiene una ciudad"
	        };
		}
		var max_dist = 0;
		var city1 = {
	        "city": ""
	    };
		var city2 = {
	        "city": ""
	    };
		var c1;
		var c2;
		var d;
		for (var i in reduced.data) {
			for (var j in reduced.data) {
				if (i >= j) {
	                continue;
	            }
				c1 = reduced.data[i];
				c2 = reduced.data[j];
				d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
				if (d > max_dist && d > 0) {
					max_dist = d;
					city1 = c1;
					city2 = c2;
				}
			}
		}
		return {
	        "city1": city1.city,
	        "city2": city2.city,
	        "dist": Math.sqrt(min_dist)
	    };
	}


  db.runCommand({
  		    mapReduce: "cities",
  		    map: mapCode,
  		    reduce: reduceCode,
  		    finalize: finalize,
  		    query: { CountryID: { $ne: 254 } },
  		    out: { merge: "ciudades_lejanas" }
  		});

  	db.ciudades_lejanas.find().pretty();


    // 3. ¿Qué ocurre si en un país hay dos parejas de ciudades que están a la misma distancia mínima? ¿Cómo harías para que aparecieran todas?


    var mapCode = function() {
        emit(
            this.CountryID,
            {
                "data":
                [
                    {
                        "city": this.City,
                        "lat":  this.Latitude,
                        "lon":  this.Longitude
                    }
                ]
            }
        );
    }

    var reduceCode = function(key, values) {
    	var reduced = {
            "data": []
        };
    	for (var i in values) {
    		var inter = values[i];
    		for (var j in inter.data) {
    			reduced.data.push(inter.data[j]);
    		}
    	}
    	return reduced;
    }

    var finalize =  function (key, reduced) {
	if (reduced.data.length == 1) {
		return {
            "message" : "Este país solo contiene una ciudad"
        };
	}
	var min_dist = 999999999999;
    var cities = [];
	var c1;
	var c2;
	var d;
	for (var i in reduced.data) {
		for (var j in reduced.data) {
			if (i >= j) {
                continue;
            }
			c1 = reduced.data[i];
			c2 = reduced.data[j];
			d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
			if (d < min_dist && d > 0) {
				min_dist = d;
                cities = [];
                cities.push([c1.city, c2.city]);
			} else if (d == min_dist) {
                cities.push([c1.city, c2.city]);
            }
		}
	}
	return {
        "cities": cities,
        "dist": Math.sqrt(min_dist)
    };
}

db.runCommand({
    mapReduce: "cities",
    map: mapCode,
    reduce: reduceCode,
    finalize: finalize,
    query: { CountryID: { $ne: 254 } },
    out: { merge: "ciudades_proximas" }
});

db.ciudades_proximas.find().pretty();


//4. ¿Cómo podríamos obtener adicionalmente la cantidad de parejas de ciudades evaluadas para cada país consultado?.


var mapCode = function() {
    emit(
        this.CountryID,
        {
            "data":
            [
                {
                    "city": this.City,
                    "lat":  this.Latitude,
                    "lon":  this.Longitude
                }
            ]
        }
    );
}

var reduceCode = function(key, values) {
  var reduced = {
        "data": []
    };
  for (var i in values) {
    var inter = values[i];
    for (var j in inter.data) {
      reduced.data.push(inter.data[j]);
    }
  }
  return reduced;
}


var finalize =  function (key, reduced) {
	if (reduced.data.length == 1) {
		return {
            "message" : "Este país solo contiene una ciudad"
        };
	}
	var min_dist = 999999999999;
	var city1 = {
        "city": ""
    };
	var city2 = {
        "city": ""
    };
	var c1;
	var c2;
	var d;
  var contador=0;
	for (var i in reduced.data) {
		for (var j in reduced.data) {
			if (i >= j) {
                continue;
            }
			c1 = reduced.data[i];
			c2 = reduced.data[j];
			d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
            if (d > 0) {
                contador=contador+1;
                if (d < min_dist) {
                    min_dist = d;
                    city1 = c1;
                    city2 = c2;
                }
            }
		}
	}
	return {
        "city1": city1.city,
        "city2": city2.city,
        "evaluations": contador,
        "dist": Math.sqrt(min_dist)
    };
}


db.runCommand({
    mapReduce: "cities",
    map: mapCode,
    reduce: reduceCode,
    finalize: finalize,
    query: { CountryID: { $ne: 254 } },
    out: { merge: "ciudades_proximas" }
});

db.ciudades_proximas.find().pretty();


// 5. ¿Cómo podríamos obtener la distancia media entre las ciudades de cada país?

ar mapCode = function() {
    emit(
        this.CountryID,
        {
            "data":
            [
                {
                    "city": this.City,
                    "lat":  this.Latitude,
                    "lon":  this.Longitude
                }
            ]
        }
    );
}

var reduceCode = function(key, values) {
  var reduced = {
        "data": []
    };
  for (var i in values) {
    var inter = values[i];
    for (var j in inter.data) {
      reduced.data.push(inter.data[j]);
    }
  }
  return reduced;
}


var finalize =  function (key, reduced) {
	if (reduced.data.length == 1) {
		return {
            "message" : "Este país solo contiene una ciudad"
        };
	}
	var min_dist = 999999999999;
	var city1 = {
        "city": ""
    };
	var city2 = {
        "city": ""
    };
	var c1;
	var c2;
	var d;
  var contador=0;
			var distancia_total=0;
	for (var i in reduced.data) {
		for (var j in reduced.data) {
			if (i >= j) {
                continue;
            }
			c1 = reduced.data[i];
			c2 = reduced.data[j];
			d = (c1.lat - c2.lat) * (c1.lat - c2.lat) + (c1.lon - c2.lon) * (c1.lon - c2.lon);
            if (d > 0) {
            contador=contador+1;
            distancia_total=distancia_total+d;
                if (d < min_dist) {
                    min_dist = d;
                    city1 = c1;
                    city2 = c2;
                }
            }
		}
	}
	return {
        "city1": city1.city,
        "city2": city2.city,
        "evaluations": distancia_total/contador,
        "dist": Math.sqrt(min_dist)
    };
}


db.runCommand({
    mapReduce: "cities",
    map: mapCode,
    reduce: reduceCode,
    finalize: finalize,
    query: { CountryID: { $ne: 254 } },
    out: { merge: "ciudades_proximas" }
});

db.ciudades_proximas.find().pretty();

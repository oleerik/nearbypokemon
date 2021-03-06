function scan( reload ){
	clearTimeout(reload);
	document.getElementById("status").innerHTML = "Getting Location";

	navigator.geolocation.getCurrentPosition( function(position) {
		
		document.getElementById("loading").style.visibility = "visible";
		document.getElementById("status").innerHTML = "Scanning for Pokemon";
		
		var coords = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		};
		
		pokegoScan(coords, {distance: 500}, function(err, pokemon) {
			if (err) 
			{
				if (err.message = "You already scanned recently.")
				{
					reload = setTimeout("scan();", 5000);
				}
				else
				{
					document.getElementById("status").innerHTML = err.message;
					document.getElementById("loading").style.visibility = "hidden";
					reload = setTimeout("scan();", 5000);
				}	
			}
			else
			{
				document.getElementById("grid").innerHTML = "<div class=\"cell\"><center><img id=\"i0\"/><br><img id=\"f0\"/></center></div><div class=\"cell\"><center><img id=\"i1\"/><br><img id=\"f1\"/></center></div><div class=\"cell\"><center><img id=\"i2\"/><br><img id=\"f2\"/></center></div><div class=\"cell\"><center><img id=\"i3\"/><br><img id=\"f3\"/></center></div><div class=\"cell\"><center><img id=\"i4\"/><br><img id=\"f4\"/></center></div><div class=\"cell\"><center><img id=\"i5\"/><br><img id=\"f5\"/></center></div><div class=\"cell\"><center><img id=\"i6\"/><br><img id=\"f6\"/></center></div><div class=\"cell\"><center><img id=\"i7\"/><br><img id=\"f7\"/></center></div><div class=\"cell\"><center><img id=\"i8\"/><br><img id=\"f8\"/></center></div>";
				document.getElementById("status").innerHTML = "Loading Results";
				
				var nearbyPokemon = 0;
			
				for (var current = 0; current<pokemon.length; current++)
				{
					console.log(current + ": " + pokemon[current].name + " is " + pokemon[current].distance + "m away.");
					
					if (nearbyPokemon < 9)
					{
						if (current == 0 || pokemon[current].distance != pokemon[current-1].distance || pokemon[current].name != pokemon[current-1].name)
						{
							if (pokemon[current].pokemonId < 10) num = "00" + pokemon[current].pokemonId;
							else if (pokemon[current].pokemonId < 100) num = "0" + pokemon[current].pokemonId;
							else num = pokemon[current].pokemonId;
							document.getElementById("i" + nearbyPokemon).src = "images/" + num + ".png";

							if (pokemon[current].distance < 40) {}
							else if (pokemon[current].distance <= 60) document.getElementById("f" + nearbyPokemon).src = "images/1foot.png";
							else if (pokemon[current].distance <= 90) document.getElementById("f" + nearbyPokemon).src = "images/2feet.png";
							else document.getElementById("f" + nearbyPokemon).src = "images/3feet.png";
							
							nearbyPokemon++;
						}
					} else break;
				}
				
				document.getElementById("status").innerHTML = nearbyPokemon + " Pokemon Found";
				document.getElementById("loading").style.visibility = "hidden";
				reload = setTimeout("scan();", 40000);
			}
		});
	}, function(error) { document.getElementById("status").innerHTML = "Location Error"; reload = setTimeout("scan();", 5000);	}, { enableHighAccuracy: true, timeout: 60000, maximumAge: 10000 } );
}
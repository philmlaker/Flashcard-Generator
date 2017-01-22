var fs = require('fs');

module.exports = Basic;

function Basic (front,back){
	this.front = front;
	this.back = back;
	this.add = function(){
		var card = {
			front: this.front,
			back: this.back,
			type: "basic",

		};

		fs.appendFile("allcards.txt", JSON.stringify(card) + ';', "utf8", function(error){
			if (error){
				console.log(error);
			};

		})

	};

}
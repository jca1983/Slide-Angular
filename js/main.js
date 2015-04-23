function Galeria(setup){
	"use strict";

	var g = this;
	g.container = setup.container;
	g.data = setup.data;
	g.dom = {};
	g.current = 0;

	g.dom.scrollImages = function(direction){
		var handler, currentWrapper;
		if(direction === "prev"){
			var prev = g.current - 1;
			if(prev >= 0){
				g.current = prev;
			}
		} else if(direction === "next") {
			var next = g.current + 1;
			if(next <= (g.data.length - 1)){
				g.current = next;			
			}
		}

		g.container.find(".wrapper").each(function(){
			currentWrapper = $(this);
			if(currentWrapper.attr("data-indexSlide") == g.current){
				handler = currentWrapper;
			}
		});
		g.container.find(".ct-slider").animate({scrollTop: handler.position().top}, 300);
		console.log(handler, g.current);
	};

	g.dom.createImages = function(){
		var container = $("<div></div>").addClass("ct-slider"),
			wrapper,
			title,
			desc,
			img,
			index = 0,
			max = g.data.length;

		for(index; index < max; index++){
			wrapper = $("<div></div>").addClass("wrapper").attr("data-indexSlide", index),
			title = $("<h1></h1>").text(g.data[index].nome),
			desc = $("<span></span>").text(g.data[index].descricao),
			img = $("<img/>").attr("src", g.data[index].src);

			wrapper.append(title);
			wrapper.append(desc);
			wrapper.append(img);
			container.append(wrapper);
		}

		g.container.append(container);
	};

	g.dom.createButtons = function(){
		var wrapper = $("<div></div>").addClass("ct-buttons"),
			left = $("<span></span>").addClass("btn-slider prev"),
			right = $("<span></span>").addClass("btn-slider next");
			wrapper.append(left).append(right);
			g.container.append(wrapper);
	};	

	g.createApp = function() {
		g.dom.createImages();
		g.dom.createButtons();
	};

	g.events = function() {
		//Prev button
		g.container.find(".prev").click(function(){
			g.dom.scrollImages("prev");
		});		

		//Next button
		g.container.find(".next").click(function(){
			g.dom.scrollImages("next");
		});
	};

	g.createApp();
	g.events();
};


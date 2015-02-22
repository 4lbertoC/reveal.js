(function(window, undefined) {

	var foodImage;
	var foodImageIdx = -1;
	var maxFoodImages = 8;

	function showOrHidePic() {
		if (!foodImage) {
			foodImageIdx = (foodImageIdx + 1) % maxFoodImages;
			foodImage = $('<img src="img/food/' + foodImageIdx + '.jpg" class="random-food"/>');
			foodImage.css('transform', 'rotateZ(' + ((Math.random() * 20) - 10) + 'deg)');
			$('body').append(foodImage);
		} else {
			foodImage.remove();
			foodImage = undefined;
		}
	}

	var FoodJs = window.FoodJs = {
		showOrHidePic: showOrHidePic
	};

})(this);
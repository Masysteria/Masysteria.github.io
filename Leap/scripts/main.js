// ==============
// REQUIRE CONFIG
// ==============

requirejs.config({
	paths: {
	'Leap': '../lib/leap-0.6.4'
},
	shim: {
		'Leap': {
			'exports': 'Leap'
		}
	}
});

require(['Leap', 'require', 'utils'], function(Leap, require, utils) {
	'use strict';

	var controller = new Leap.Controller({
		enableGestures: true,
		frameEventName: 'animationFrame'
	});

	controller.connect();

	// ====================
	// CONTROLLER LISTENERS
	// ====================

	var hand, finger, gesture;
	var lastTap = 0;

	controller.on('frame', function(frame){

		// console.log(frame);
		hand = frame.hands[0];

		if (!hand) {
			return false;
		};

		var palmPos = utils.LeapToScene(frame, hand.palmPosition);

		// console.log(palmPos.x, palmPos.y);

		$('#hand').css({
			'top': palmPos.y + 'px',
			'left': palmPos.x + 'px'
		});
		
		//gesture listener
		if (frame.gestures.length > 0) {
			for (var i = 0; i < frame.gestures.length; i++) {
				gesture = frame.gestures[i];

				if (gesture.type === 'screenTap' || gesture.type === 'keyTap') {
					// Si on a attendu suffisemment longtemps, on peut retapper
					//if (frame.timestamp - lastTap > 250000) {
						lastTap = frame.timestamp;

						var cursorPosition = {
							x : parseInt($('#hand').css('left')) + 80,
							y : parseInt($('#hand').css('top')) + 50
						};

						var taupePosition = {
							x : parseInt($('#taupe').css('left')),
							y : parseInt($('#taupe').css('top')),
							width : $('#taupe').width(),
							height : $('#taupe').height()
						};

						if (cursorPosition.x > taupePosition.x && cursorPosition.x < taupePosition.x + taupePosition.width &&
							cursorPosition.y > taupePosition.y && cursorPosition.y < taupePosition.y + taupePosition.height) {

							// Sound
							$('#squash').get(0).currentTime = 0;
							$('#squash').get(0).play();

							$('#taupe').css('background-image', 'url("img/taupe_squashed.png")');

							//$('#taupe').remove();

							//$('#hand').fadeOut(200);

							// $('#playAgain').css({
							// 	'top': $('body').height() * 0.8 - $('#playAgain').height() * 0.8 + 'px',
							// 	'left': $('body').width() * 0.5 - $('#playAgain').width() * 0.5 + 'px'
							// }).fadeIn(200);

							//$('#bg2').fadeIn(200);

							// (function showYouWin(){

							// 	$("#youWin").css({
							// 		'top': $('body').height() * 0.5 - $('#youWin').height() * 0.5 + 'px',
							// 		'left': $('body').width() * 0.5 - $('#youWin').width() * 0.5 + 'px'
							// 	}).fadeIn(200).delay(400).fadeOut(200, function(){
							// 		showYouWin(); 
							// 	});
							// })();
							
							console.log('YOU WIN NIGGA !!');

						} else {
							// Sound
							$('#tap').get(0).currentTime = 0;
							$('#tap').get(0).play();
						};

						var playAgainPosition = {
							x : parseInt($('#playAgain').css('left')),
							y : parseInt($('#playAgain').css('top')),
							width : $('#playAgain').width(),
							height : $('#playAgain').height()
						};

						if (cursorPosition.x > playAgainPosition.x && cursorPosition.x < playAgainPosition.x + playAgainPosition.width &&
							cursorPosition.y > playAgainPosition.y && cursorPosition.y < playAgainPosition.y + playAgainPosition.height) {

							location.reload();
						};

						$('#hand').addClass('tap');

						var elm = $('#hand').get(0);
						var newone = elm.cloneNode(true);
						elm.parentNode.replaceChild(newone, elm);
					//}
				};
			};
		};

		// console.log('running...');
	});

	controller.on('connect', function(){
		console.log('Leap motion connected');
	});

	// =====
	// TAUPE
	// =====

	(function showTaupe(){

		$('#taupe').css('background-image', 'url("img/taupe.png")');

		var taupePositionX = Math.floor(Math.random() * ($('body').width() - $('#taupe').width()));
		var taupePositionY = Math.floor(Math.random() * ($('body').height() - $('#taupe').height()));
		
		$('#taupe').css({
			'position': 'absolute',
			'left': taupePositionX + 'px',
			'top': taupePositionY + 'px',
			'display': 'none'
		}).appendTo('body').fadeIn(200).delay(1000).fadeOut(200, function(){
			showTaupe();

		}); 

		$('#hand').css({
			'top': $('body').height() * 0.5 - $('#hand').height() * 0.5 + 'px',
			'left': $('body').width() * 0.5 - $('#hand').width() * 0.5 + 'px'
		}).fadeIn(200);

		// console.log('taupePositionX: ' + taupePositionX);
		// console.log('taupePositionY: ' + taupePositionY);

		// ========================================================================
		// COMPOTEMENT AU CLICK
		// ========================================================================

		// $('#playAgain').click(function (){
		// 	location.reload();
		// });

	})();

	// ========================================================================
	// COMPOTEMENT AU CLICK
	// ========================================================================

	// $('#taupe').click(function (){
	// 	$(this).remove();

	// 	$('#hand').fadeOut(200);

	// 	$('#playAgain').css({
	// 		'top': $('body').height() * 0.8 - $('#playAgain').height() * 0.8 + 'px',
	// 		'left': $('body').width() * 0.5 - $('#playAgain').width() * 0.5 + 'px'
	// 	}).fadeIn(200);

	// 	$('#bg2').fadeIn(200);

	// 	(function showYouWin(){

	// 		$("#youWin").css({
	// 			'top': $('body').height() * 0.5 - $('#youWin').height() * 0.5 + 'px',
	// 			'left': $('body').width() * 0.5 - $('#youWin').width() * 0.5 + 'px'
	// 		}).fadeIn(200).delay(500).fadeOut(200, function(){
	// 			showYouWin(); 
	// 		});
	// 	})();
		
	// 	console.log('YOU WIN NIGGA !!');
	// });

});
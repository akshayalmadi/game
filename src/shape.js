var EPT = {
	_manageAudio: function(mode, game) {
		if (mode == 'init') {
			storageAPI.initUnset('EPT-audio', true);
			EPT._audioStatus = storageAPI.get('EPT-audio');
			EPT._soundClick = game.add.audio('audio-click');
			EPT._soundCollect = game.add.audio('audio-collect');
			EPT._soundDiamond = game.add.audio('audio-diamond');
			EPT._soundExplosion = game.add.audio('audio-explosion');
			
			if (!EPT._soundMusic) {
				EPT._soundMusic = game.add.audio('audio-theme', 1, true)
			};
			
		} else if (mode == 'switch') {
			EPT._audioStatus = !EPT._audioStatus;
			storageAPI.set('EPT-audio', EPT._audioStatus)
		}
		if (EPT._audioStatus) {
			EPT._audioOffset = 0;
			if (EPT._soundMusic) {
				if (!EPT._soundMusic.isPlaying) {
					EPT._soundMusic.play('', 0, 1, true)
				}
				EPT._soundMusic.volume = 0.5
			}
		} else {
			EPT._audioOffset = 3;
			if (EPT._soundMusic) {
				EPT._soundMusic.stop()
			}
		}
		game.buttonAudio.setFrames(EPT._audioOffset + 1, EPT._audioOffset + 0, EPT._audioOffset + 2)
	}
};
EPT.Boot = function(game) {};
EPT.Boot.prototype = {
	preload: function() {
		this.stage.backgroundColor = '#1a667f'; //1a667f
		this.load.image('background-solid', 'img/background-solid.png');
		this.load.image('title', 'img/title.png');
		this.load.image('loading-background', 'img/loading-background.png');
		this.load.image('loading-progress', 'img/loading-progress.png')
	},
	create: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.state.start('Preloader')
	}
};
EPT.Preloader = function(game) {};
EPT.Preloader.prototype = {
	preload: function() {
		var preloadBG = this.add.sprite(0, 0, 'background-solid');
		var title = this.add.sprite(this.world.width * 0.5, 320, 'title');
		title.anchor.set(0.5);
		var preloadProgress = this.add.sprite((this.world.width - 360) * 0.5, (this.world.height + 170) * 0.5, 'loading-background');
		var preloadProgress = this.add.sprite((this.world.width - 360) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
		this.load.setPreloadSprite(preloadProgress);
		WebFont.load({
			custom: {
				families: ['Antonio'],
				urls: ['fonts/antonio-bold.css']
			}
		});
		this._preloadResources()
	},
	_preloadResources() {
		var pack = EPT.Preloader.resources;
		for (var method in pack) {
			pack[method].forEach(function(args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args)
			}, this)
		}
	},
	create: function() {
		this.time.events.add(Phaser.Timer.SECOND * 0.1, function() {
			this.state.start('MainMenu')
		}, this)
	}
};
EPT.Preloader.resources = {
	'image': [
		['background-shapes', 'img/background-shapes.png'],
		['background-shapes-moving', 'img/background-shapes-moving.png'],
		['text-best', 'img/text-best.png'],
		['text-gameover', 'img/text-gameover.png'],
		['text-pause', 'img/text-pause.png'],
		['text-score', 'img/text-score.png'],
		['text-themes', 'img/text-themes.png'],
		['diamond', 'img/diamond.png'],
		['screen-howto', 'img/screen-howto.png'],
		['background-classic', 'img/themes/background-classic.png'],
		['background-sport', 'img/themes/background-sport.png'],
		['background-space', 'img/themes/background-space.png'],
		['background-tetris', 'img/themes/background-tetris.png']
	],
	'spritesheet': [
		['button-start', 'img/button-start.png', 180, 180],
		['button-continue', 'img/button-continue.png', 150, 150],
		['button-exit', 'img/button-exit.png', 70, 70],
		['button-mainmenu', 'img/button-mainmenu.png', 150, 150],
		['button-restart', 'img/button-tryagain.png', 150, 150],
		['button-pause', 'img/button-pause.png', 80, 80],
		['button-audio', 'img/button-sound.png', 80, 80],
		['button-themes', 'img/button-themes.png', 80, 80],
		['button-unlock', 'img/button-unlock.png', 120, 50],
		['bg-shapes', 'img/bg-shapes.png', 450, 490],
		['theme-background', 'img/themes/theme-background.png', 240, 240],
		['theme-classic', 'img/themes/theme-classic.png', 190, 190],
		['theme-sport', 'img/themes/theme-sport.png', 190, 190],
		['theme-space', 'img/themes/theme-space.png', 190, 190],
		['theme-tetris', 'img/themes/theme-tetris.png', 190, 190],
		['button-classic-circle', 'img/themes/button-classic-circle.png', 110, 110],
		['button-classic-hex', 'img/themes/button-classic-hex.png', 110, 110],
		['button-classic-square', 'img/themes/button-classic-square.png', 110, 110],
		['button-classic-triangle', 'img/themes/button-classic-triangle.png', 110, 110],
		['player-classic', 'img/themes/player-classic.png', 150, 150],
		['items-classic', 'img/themes/items-classic.png', 60, 60],
		['particle-classic-circle', 'img/themes/particle-classic-circle.png'],
		['particle-classic-square', 'img/themes/particle-classic-square.png'],
		['particle-classic-triangle', 'img/themes/particle-classic-triangle.png'],
		['particle-classic-hex', 'img/themes/particle-classic-hex.png'],
		['button-sport-circle', 'img/themes/button-sport-circle.png', 110, 110],
		['button-sport-hex', 'img/themes/button-sport-hex.png', 110, 110],
		['button-sport-square', 'img/themes/button-sport-square.png', 110, 110],
		['button-sport-triangle', 'img/themes/button-sport-triangle.png', 110, 110],
		['player-sport', 'img/themes/player-sport.png', 150, 150],
		['items-sport', 'img/themes/items-sport.png', 60, 60],
		['particle-sport-circle', 'img/themes/particle-sport-circle.png'],
		['particle-sport-square', 'img/themes/particle-sport-square.png'],
		['particle-sport-triangle', 'img/themes/particle-sport-triangle.png'],
		['particle-sport-hex', 'img/themes/particle-sport-hex.png'],
		['button-space-circle', 'img/themes/button-space-circle.png', 110, 110],
		['button-space-hex', 'img/themes/button-space-hex.png', 110, 110],
		['button-space-square', 'img/themes/button-space-square.png', 110, 110],
		['button-space-triangle', 'img/themes/button-space-triangle.png', 110, 110],
		['player-space', 'img/themes/player-space.png', 150, 150],
		['items-space', 'img/themes/items-space.png', 60, 60],
		['particle-space-circle', 'img/themes/particle-space-circle.png'],
		['particle-space-square', 'img/themes/particle-space-square.png'],
		['particle-space-triangle', 'img/themes/particle-space-triangle.png'],
		['particle-space-hex', 'img/themes/particle-space-hex.png'],
		['button-tetris-circle', 'img/themes/button-tetris-circle.png', 110, 110],
		['button-tetris-hex', 'img/themes/button-tetris-hex.png', 110, 110],
		['button-tetris-square', 'img/themes/button-tetris-square.png', 110, 110],
		['button-tetris-triangle', 'img/themes/button-tetris-triangle.png', 110, 110],
		['player-tetris', 'img/themes/player-tetris.png', 150, 150],
		['items-tetris', 'img/themes/items-tetris.png', 60, 60],
		['particle-tetris-circle', 'img/themes/particle-tetris-circle.png'],
		['particle-tetris-square', 'img/themes/particle-tetris-square.png'],
		['particle-tetris-triangle', 'img/themes/particle-tetris-triangle.png'],
		['particle-tetris-hex', 'img/themes/particle-tetris-hex.png']
	],
	'audio': [
		['audio-click', ['sfx/audio-button.m4a', 'sfx/audio-button.mp3', 'sfx/audio-button.ogg']],
		['audio-collect', ['sfx/audio-collect.m4a', 'sfx/audio-collect.mp3', 'sfx/audio-collect.ogg']],
		['audio-diamond', ['sfx/audio-diamond.m4a', 'sfx/audio-diamond.mp3', 'sfx/audio-diamond.ogg']],
		['audio-explosion', ['sfx/audio-explosion.m4a', 'sfx/audio-explosion.mp3', 'sfx/audio-explosion.ogg']],
		['audio-theme', ['sfx/audio-menu.mp3', 'sfx/audio-menu.ogg']]
	]
};
EPT.MainMenu = function(game) {};
EPT.MainMenu.prototype = {
	create: function() {
		this.shapesBG = this.add.sprite(this.world.centerX, this.world.centerY, 'background-shapes-moving');
		this.shapesBG.anchor.set(0.5);
		var title = this.add.sprite(this.world.width * 0.5, 320, 'title');
		title.anchor.set(0.5);
		storageAPI.initUnset('Shape-theme', 'classic');
		window._GameTheme = storageAPI.get('Shape-theme') || 'classic';
		storageAPI.initUnset('Shape-highscore', 0);
		var highscore = storageAPI.get('Shape-highscore') || 0;
		storageAPI.initUnset('Shape-diamonds', 0);
		var diamonds = storageAPI.get('Shape-diamonds') || 0;
		var buttonStart = this.add.button(this.world.width * 0.5, this.world.height * 0.5 + 150, 'button-start', this.clickStart, this, 1, 0, 2);
		buttonStart.anchor.set(0.5);
		this.buttonAudio = this.add.button(this.world.width - 20, 20, 'button-audio', this.clickAudio, this, 1, 0, 2);
		this.buttonAudio.anchor.set(1, 0);
		var buttonAchievements = this.add.button(this.world.width - 120, 20, 'button-themes', this.clickAchievements, this, 1, 0, 2);
		buttonAchievements.anchor.set(1, 0);

		var bestscore = this.add.sprite(24, 32, 'text-best');
		var diamondImg = this.add.sprite(25, 105, 'diamond');
		diamondImg.scale.set(0.75);
		var fontHighscore = {
			font: "48px Antonio",
			fill: "#fff"
		};
		var textHighscore = this.add.text(100, 13, '' + highscore, fontHighscore);
		var textDiamonds = this.add.text(100, 86, '' + diamonds, fontHighscore);
		EPT._manageAudio('init', this);
		buttonAchievements.y = -buttonAchievements.height - 20;
		this.add.tween(buttonAchievements).to({
			y: 20
		}, 500, Phaser.Easing.Exponential.Out, true);
		this.buttonAudio.y = -this.buttonAudio.height - 20;
		this.add.tween(this.buttonAudio).to({
			y: 20
		}, 500, Phaser.Easing.Exponential.Out, true, 100);

		this.tweenPendulum = this.add.tween(title).to({
			y: 350
		}, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
		this.time.events.loop(Phaser.Timer.SECOND * 5, function() {
			this.add.tween(buttonStart).to({
				angle: -360
			}, 1000, Phaser.Easing.Exponential.InOut, true)
		}, this);
		this.camera.flash(0x000000, 500, true)
	},
	update: function() {
		if (this.shapesBG) {
			this.shapesBG.angle += 0.1
		}
	},
	clickAudio: function() {
		if (!EPT._audioStatus) {
			EPT._soundClick.play()
		}
		EPT._manageAudio('switch', this)
	},
	clickStart: function() {
		if (EPT._audioStatus) {
			EPT._soundClick.play()
		}
		this.camera.fade(0x000000, 200, true);
		this.time.events.add(200, function() {
			this.game.state.start('Story')
		}, this)
	},
	clickAchievements: function() {
		if (EPT._audioStatus) {
			EPT._soundClick.play()
		}
		this.camera.fade(0x000000, 200, true);
		this.time.events.add(200, function() {
			this.game.state.start('Achievements')
		}, this)
	}
};
EPT.Story = function(game) {};
EPT.Story.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-howto');
		var buttonContinue = this.add.button(this.world.width - 20, game.world.height - 20, 'button-continue', this.clickContinue, this, 1, 0, 2);
		buttonContinue.anchor.set(1, 1);
		buttonContinue.x = this.world.width + buttonContinue.width + 20;
		this.add.tween(buttonContinue).to({
			x: this.world.width - 20
		}, 500, Phaser.Easing.Exponential.Out, true);
		this.camera.flash(0x000000, 200, true)
	},
	clickContinue: function() {
		if (EPT._audioStatus) {
			EPT._soundClick.play()
		}
		this.camera.fade(0x000000, 200, true);
		this.time.events.add(200, function() {
			this.game.state.start('Game')
		}, this)
	}
};
EPT.Achievements = function(game) {};
EPT.Achievements.prototype = {
	create: function() {
		var fontAchievements = {
			font: "48px Antonio",
			fill: "#fff"
		};
		var fontUnlock = {
			font: "32px Antonio",
			fill: "#fff"
		};
		storageAPI.initUnset('Shape-available-sport', false);
		var availabilitySport = storageAPI.get('Shape-available-sport') || false;
		storageAPI.initUnset('Shape-available-space', false);
		var availabilitySpace = storageAPI.get('Shape-available-space') || false;
		storageAPI.initUnset('Shape-available-sport', false);
		var availabilityTetris = storageAPI.get('Shape-available-tetris') || false;
		this.available = {
			classic: true,
			sport: availabilitySport,
			space: availabilitySpace,
			tetris: availabilityTetris
		};
		this.unlockable = {
			classic: 0,
			sport: 100,
			space: 250,
			tetris: 1000
		};
		storageAPI.initUnset('Shape-diamonds', 0);
		this.diamonds = storageAPI.get('Shape-diamonds') || 0;
		var buttonBack = this.add.button(this.world.width - 20, 20, 'button-exit', this.clickBack, this, 1, 0, 2);
		buttonBack.anchor.set(1, 0);
		buttonBack.y = -buttonBack.height - 20;
		this.add.tween(buttonBack).to({
			y: 20
		}, 500, Phaser.Easing.Exponential.Out, true);
		var textThemes = this.add.sprite(this.world.width * 0.5, 50, 'text-themes');
		textThemes.anchor.set(0.5, 0);
		var uiDiamonds = this.add.sprite(240, 220, 'diamond');
		uiDiamonds.anchor.set(0, 0.5);
		this.textDiamonds = this.add.text(330, 220, '' + this.diamonds, fontAchievements);
		this.textDiamonds.anchor.set(0, 0.5);
		var txtClassic = this.add.text(180, 275, 'Shapes', fontAchievements);
		txtClassic.anchor.set(0.5, 0);
		this.bgClassic = this.add.sprite(55, 340, 'theme-background', 1);
		var bttnClassic = this.add.button(80, 365, 'theme-classic', this.selectClassic, this);
		bttnClassic.frame = 1;
		var txtSport = this.add.text(this.world.width - 180, 275, 'Sport', fontAchievements);
		txtSport.anchor.set(0.5, 0);
		this.bgSport = this.add.sprite(this.world.width - 55, 340, 'theme-background', 0);
		this.bgSport.anchor.set(1, 0);
		this.bttnSport = this.add.button(this.world.width - 80, 365, 'theme-sport', this.selectSport, this);
		this.bttnSport.anchor.set(1, 0);
		if (!this.available.sport) {
			this.bttnSport.frame = 0;
			this.bttnSport.input.useHandCursor = false;
			this.unlockSportDiamond = this.add.sprite(this.world.width - 225, 420, 'diamond');
			this.unlockSportDiamond.scale.set(0.5);
			this.unlockSportAmount = this.add.text(this.world.width - 185, 410, this.unlockable['sport'], fontUnlock);
			this.unlockSportButton = this.add.button(this.world.width - 114, 480, 'button-unlock', this.unlockSport, this);
			this.unlockSportButton.anchor.set(1, 0);
			if (this.diamonds >= this.unlockable['sport']) {
				this.unlockSportButton.frame = 0
			} else {
				this.unlockSportButton.frame = 3
			}
		} else {
			this.bttnSport.frame = 1
		}
		var txtSpace = this.add.text(180, 615, 'Space', fontAchievements);
		txtSpace.anchor.set(0.5, 0);
		this.bgSpace = this.add.sprite(55, 680, 'theme-background', 0);
		this.bttnSpace = this.add.button(80, 705, 'theme-space', this.selectSpace, this);
		if (!this.available.space) {
			this.bttnSpace.frame = 0;
			this.bttnSpace.input.useHandCursor = false;
			this.unlockSpaceDiamond = this.add.sprite(125, 760, 'diamond');
			this.unlockSpaceDiamond.scale.set(0.5);
			this.unlockSpaceAmount = this.add.text(165, 750, this.unlockable['space'], fontUnlock);
			this.unlockSpaceButton = this.add.button(114, 820, 'button-unlock', this.unlockSpace, this);
			if (this.diamonds >= this.unlockable['space']) {
				this.unlockSpaceButton.frame = 0
			} else {
				this.unlockSpaceButton.frame = 3
			}
		} else {
			this.bttnSpace.frame = 1
		}
		var txtTetris = this.add.text(this.world.width - 180, 615, 'Tetris', fontAchievements);
		txtTetris.anchor.set(0.5, 0);
		this.bgTetris = this.add.sprite(this.world.width - 55, 680, 'theme-background', 0);
		this.bgTetris.anchor.set(1, 0);
		this.bttnTetris = this.add.button(this.world.width - 80, 705, 'theme-tetris', this.selectTetris, this);
		this.bttnTetris.anchor.set(1, 0);
		if (!this.available.tetris) {
			this.bttnTetris.frame = 0;
			this.bttnTetris.input.useHandCursor = false;
			this.unlockTetrisDiamond = this.add.sprite(this.world.width - 225, 760, 'diamond');
			this.unlockTetrisDiamond.scale.set(0.5);
			this.unlockTetrisAmount = this.add.text(this.world.width - 185, 750, this.unlockable['tetris'], fontUnlock);
			this.unlockTetrisButton = this.add.button(this.world.width - 114, 820, 'button-unlock', this.unlockTetris, this);
			this.unlockTetrisButton.anchor.set(1, 0);
			if (this.diamonds >= this.unlockable['tetris']) {
				this.unlockTetrisButton.frame = 0
			} else {
				this.unlockTetrisButton.frame = 3
			}
		} else {
			this.bttnTetris.frame = 1
		}
		this.selectTheme(window._GameTheme);
		this.camera.flash(0x000000, 200, true)
	},
	selectTheme: function(theme) {
		switch (theme) {
			case 'classic':
				{
					this.selectClassic();
					break
				}
			case 'sport':
				{
					this.selectSport();
					break
				}
			case 'space':
				{
					this.selectSpace();
					break
				}
			case 'tetris':
				{
					this.selectTetris();
					break
				}
			default:
				{
					this.selectClassic()
				}
		}
	},
	selectClassic: function() {
		if (this.available.classic) {
			this.bgClassic.frame = 1;
			this.bgSport.frame = 0;
			this.bgSpace.frame = 0;
			this.bgTetris.frame = 0;
			window._GameTheme = 'classic';
			storageAPI.set('Shape-theme', 'classic')
		}
	},
	selectSport: function() {
		if (this.available.sport) {
			this.bgClassic.frame = 0;
			this.bgSport.frame = 1;
			this.bgSpace.frame = 0;
			this.bgTetris.frame = 0;
			window._GameTheme = 'sport';
			storageAPI.set('Shape-theme', 'sport')
		}
	},
	selectSpace: function() {
		if (this.available.space) {
			this.bgClassic.frame = 0;
			this.bgSport.frame = 0;
			this.bgSpace.frame = 1;
			this.bgTetris.frame = 0;
			window._GameTheme = 'space';
			storageAPI.set('Shape-theme', 'space')
		}
	},
	selectTetris: function() {
		if (this.available.tetris) {
			this.bgClassic.frame = 0;
			this.bgSport.frame = 0;
			this.bgSpace.frame = 0;
			this.bgTetris.frame = 1;
			window._GameTheme = 'tetris';
			storageAPI.set('Shape-theme', 'tetris')
		}
	},
	unlockSport: function() {
		if (this.diamonds >= this.unlockable['sport']) {
			this.camera.shake(0.02, 500, true, Phaser.Camera.SHAKE_BOTH, true);
			this.spawnEmitter(this.bgSport, 'diamond', 50, 500, 0, -this.bgSport.width * 0.5, this.bgSport.height * 0.5, 50);
			this.unlockSportDiamond.destroy();
			this.unlockSportAmount.destroy();
			this.unlockSportButton.destroy();
			this.bttnSport.frame = 1;
			this.bttnSport.input.useHandCursor = true;
			this.tweenedDiamonds = this.diamonds;
			this.diamonds -= this.unlockable['sport'];
			storageAPI.set('Shape-diamonds', this.diamonds);
			this.available.sport = true;
			storageAPI.set('Shape-available-sport', true);
			var diamondSportTween = this.add.tween(this);
			diamondSportTween.to({
				tweenedDiamonds: this.diamonds
			}, 500, Phaser.Easing.Linear.None, true);
			diamondSportTween.onUpdateCallback(function() {
				this.textDiamonds.setText('' + Math.floor(this.tweenedDiamonds))
			}, this);
			diamondSportTween.onComplete.addOnce(function() {
				this.textDiamonds.setText('' + this.diamonds)
			}, this);
			diamondSportTween.start();
			if (EPT._audioStatus) {
				EPT._soundDiamond.play()
			}
		}
	},
	unlockSpace: function() {
		if (this.diamonds >= this.unlockable['space']) {
			this.camera.shake(0.02, 500, true, Phaser.Camera.SHAKE_BOTH, true);
			this.spawnEmitter(this.bgSpace, 'diamond', 50, 500, 0, this.bgSpace.width * 0.5, this.bgSpace.height * 0.5, 50);
			this.unlockSpaceDiamond.destroy();
			this.unlockSpaceAmount.destroy();
			this.unlockSpaceButton.destroy();
			this.bttnSpace.frame = 1;
			this.bttnSpace.input.useHandCursor = true;
			this.tweenedDiamonds = this.diamonds;
			this.diamonds -= this.unlockable['space'];
			storageAPI.set('Shape-diamonds', this.diamonds);
			this.available.space = true;
			storageAPI.set('Shape-available-space', true);
			var diamondSpaceTween = this.add.tween(this);
			diamondSpaceTween.to({
				tweenedDiamonds: this.diamonds
			}, 500, Phaser.Easing.Linear.None, true);
			diamondSpaceTween.onUpdateCallback(function() {
				this.textDiamonds.setText('' + Math.floor(this.tweenedDiamonds))
			}, this);
			diamondSpaceTween.onComplete.addOnce(function() {
				this.textDiamonds.setText('' + this.diamonds)
			}, this);
			diamondSpaceTween.start();
			if (EPT._audioStatus) {
				EPT._soundDiamond.play()
			}
		}
	},
	unlockTetris: function() {
		if (this.diamonds >= this.unlockable['tetris']) {
			this.camera.shake(0.02, 500, true, Phaser.Camera.SHAKE_BOTH, true);
			this.spawnEmitter(this.bgTetris, 'diamond', 50, 500, 0, -this.bgTetris.width * 0.5, this.bgTetris.height * 0.5, 50);
			this.unlockTetrisDiamond.destroy();
			this.unlockTetrisAmount.destroy();
			this.unlockTetrisButton.destroy();
			this.bttnTetris.frame = 1;
			this.bttnTetris.input.useHandCursor = true;
			this.tweenedDiamonds = this.diamonds;
			this.diamonds -= this.unlockable['tetris'];
			storageAPI.set('Shape-diamonds', this.diamonds);
			this.available.tetris = true;
			storageAPI.set('Shape-available-tetris', true);
			var diamondTetrisTween = this.add.tween(this);
			diamondTetrisTween.to({
				tweenedDiamonds: this.diamonds
			}, 500, Phaser.Easing.Linear.None, true);
			diamondTetrisTween.onUpdateCallback(function() {
				this.textDiamonds.setText('' + Math.floor(this.tweenedDiamonds))
			}, this);
			diamondTetrisTween.onComplete.addOnce(function() {
				this.textDiamonds.setText('' + this.diamonds)
			}, this);
			diamondTetrisTween.start();
			if (EPT._audioStatus) {
				EPT._soundDiamond.play()
			}
		}
	},
	clickBack: function() {
		if (EPT._audioStatus) {
			EPT._soundClick.play()
		}
		this.camera.fade(0x000000, 200, true);
		this.time.events.add(200, function() {
			this.game.state.start('MainMenu')
		}, this)
	},
	spawnEmitter: function(item, particle, number, lifespan, frequency, offsetX, offsetY, gravity) {
		offsetX = offsetX || 0;
		offsetY = offsetY || 0;
		lifespan = lifespan || 2000;
		frequency = frequency || 0;
		var emitter = this.game.add.emitter(item.x + offsetX, item.y + offsetY, number);
		emitter.maxParticles = number;
		emitter.makeParticles(particle);
		emitter.setXSpeed(-300, 300);
		emitter.setYSpeed(-400, 200);
		emitter.setScale(0.75, 0.25, 0.75, 0.25, 500, Phaser.Easing.Linear.None);
		emitter.gravity = 250;
		emitter.start(false, lifespan, frequency, number)
	}
};
EPT.Game = function(game) {
	this.score = 0;
	this.textScore = null;
	this.diamonds = 0;
	this.textDiamonds = null;
	this.player = null;
	this.shapes = null;
	this.shapeSpeed = 100;
	this.shapeReleaseRate = 1500;
	this.cursors = null;
	this.pauseKey = null;
	this.debugKey = null;
	this.showDebug = false;
	this.spawnItemTimer = 0
};
EPT.Game.prototype = {
	init: function() {
		this.score = 0;
		this.diamonds = 0;
		this.shapeSpeed = 100;
		this.windMax = 0;
		this.showDebug = false;
		this.spawnItemTimer = 0;
		this.shapeReleaseRate = 1500
	},
	create: function() {
		this.theme = window._GameTheme;
		if (this.theme == 'classic') {
			this.shapesBG = this.add.sprite(this.world.centerX, this.world.centerY, 'background-shapes-moving');
			this.shapesBG.anchor.set(0.5)
		} else {
			this.add.sprite(0, 0, 'background-' + this.theme)
		}
		this.gamePaused = false;
		this.runOnce = false;
		this.scoreTweening = false;
		this.spawnItemTimer = 0;
		this.tweenedScore = -1;
		this.tweenedDiamond = -1;
		this.shapes = this.add.physicsGroup();
		this.shapes.sizeOptions = {
			'classic': {
				'circle': [50, 50, 0, 0],
				'square': [45, 45, 0, 0],
				'triangle': [55, 40, 0, 0],
				'hex': [55, 50, 0, 0],
				'diamond': [55, 40, 0, 0]
			},
			'sport': {
				'circle': [55, 55, 0, 0],
				'square': [55, 55, 0, 0],
				'triangle': [55, 55, 0, 0],
				'hex': [55, 55, 0, 0],
				'diamond': [55, 40, 0, 0]
			},
			'space': {
				'circle': [55, 55, 0, 0],
				'square': [55, 55, 0, 0],
				'triangle': [55, 55, 0, 0],
				'hex': [55, 55, 0, 0],
				'diamond': [55, 40, 0, 0]
			},
			'tetris': {
				'circle': [35, 35, 0, 0],
				'square': [40, 35, 0, 0],
				'triangle': [55, 40, 0, 0],
				'hex': [30, 50, 0, 0],
				'diamond': [55, 40, 0, 0]
			}
		};
		this.createPlayer();
		this.cursors = this.input.keyboard.createCursorKeys();
		this.cursors.left.onDown.add(this.shapeCircle, this);
		this.cursors.right.onDown.add(this.shapeSquare, this);
		this.cursors.up.onDown.add(this.shapeTriangle, this);
		this.cursors.down.onDown.add(this.shapeHex, this);
		this.initButtons();
		this.releaseItem();
		this.initUI();
		this.stateStatus = 'playing';
		this.camera.flash(0x000000, 200, false)
	},
	initUI: function() {
		this.buttonPause = this.add.button(this.world.width - 20, 20, 'button-pause', this.managePause, this, 1, 0, 2);
		this.buttonPause.anchor.set(1, 0);
		var fontScore = {
			font: "48px Antonio",
			fill: "#000"
		};
		var fontScoreWhite = {
			font: "48px Antonio",
			fill: "#FFF"
		};
		var uiScore = this.add.sprite(20, 35, 'text-score');
		var uiDiamond = this.add.sprite(25, 105, 'diamond');
		uiDiamond.scale.set(0.75);
		var fontScore = {
			font: "48px Antonio",
			fill: "#fff"
		};
		this.textScore = this.add.text(100, 13, '0', fontScore);
		this.textDiamonds = this.add.text(100, 86, '0', fontScore);
		this.buttonPause.y = -this.buttonPause.height - 20;
		this.add.tween(this.buttonPause).to({
			y: 20
		}, 500, Phaser.Easing.Exponential.Out, true);
		var fontTitle = {
			font: "48px Antonio",
			fill: "#000",
			stroke: "#FFF",
			strokeThickness: 10
		};
		this.screenPausedGroup = this.add.group();
		this.screenPausedBg = this.add.sprite(0, 0, 'background-solid');
		this.screenPausedText = this.add.sprite(this.world.centerX, 150, 'text-pause');
		this.screenPausedText.anchor.set(0.5, 0);
		this.buttonAudio = this.add.button(this.world.width - 20, 20, 'button-audio', this.clickAudio, this, 1, 0, 2);
		this.buttonAudio.anchor.set(1, 0);
		this.screenPausedBack = this.add.button(150, this.world.height - 150, 'button-mainmenu', this.stateBack, this, 1, 0, 2);
		this.screenPausedBack.anchor.set(0, 1);
		this.screenPausedContinue = this.add.button(this.world.width - 150, this.world.height - 150, 'button-continue', this.managePause, this, 1, 0, 2);
		this.screenPausedContinue.anchor.set(1, 1);
		this.screenPausedGroup.add(this.screenPausedBg);
		this.screenPausedGroup.add(this.screenPausedText);
		this.screenPausedGroup.add(this.buttonAudio);
		this.screenPausedGroup.add(this.screenPausedBack);
		this.screenPausedGroup.add(this.screenPausedContinue);
		this.screenPausedGroup.visible = false;
		this.buttonAudio.setFrames(EPT._audioOffset + 1, EPT._audioOffset + 0, EPT._audioOffset + 2);
		this.screenGameoverGroup = this.add.group();
		this.screenGameoverBg = this.add.sprite(0, 0, 'background-solid');
		this.screenGameoverText = this.add.sprite(this.world.width * 0.5, 150, 'text-gameover');
		this.screenGameoverText.anchor.set(0.5, 0);
		this.screenGameoverBack = this.add.button(150, this.world.height - 150, 'button-mainmenu', this.stateBack, this, 1, 0, 2);
		this.screenGameoverBack.anchor.set(0, 1);
		this.screenGameoverRestart = this.add.button(this.world.width - 150, this.world.height - 150, 'button-restart', this.stateRestart, this, 1, 0, 2);
		this.screenGameoverRestart.anchor.set(1, 1);
		this.screenGameoverScore = this.add.text(this.world.width * 0.5, 420, 'SCORE: ' + this.score, fontScoreWhite);
		this.screenGameoverScore.anchor.set(0.5, 0.5);
		this.screenGameoverDiamondImg = this.add.sprite(this.world.width * 0.5 - 80, 490, 'diamond');
		this.screenGameoverDiamondText = this.add.text(this.world.width * 0.5 + 20, 480, '+ ' + this.diamonds, fontScoreWhite);
		this.screenGameoverGroup.add(this.screenGameoverBg);
		this.screenGameoverGroup.add(this.screenGameoverText);
		this.screenGameoverGroup.add(this.screenGameoverBack);
		this.screenGameoverGroup.add(this.screenGameoverRestart);
		this.screenGameoverGroup.add(this.screenGameoverScore);
		this.screenGameoverGroup.add(this.screenGameoverDiamondImg);
		this.screenGameoverGroup.add(this.screenGameoverDiamondText);
		this.screenGameoverGroup.visible = false
	},
	initButtons: function() {
		var buttonWidth = 110;
		var leftOffset = Math.floor((this.world.width - 4 * buttonWidth) / 5);
		var button1 = this.add.button(leftOffset, this.world.height - 20, 'button-' + this.theme + '-circle', this.shapeCircle, this, 1, 0, 2);
		button1.anchor.set(0, 1);
		var button2 = this.add.button(leftOffset * 2 + buttonWidth, this.world.height - 20, 'button-' + this.theme + '-square', this.shapeSquare, this, 1, 0, 2);
		button2.anchor.set(0, 1);
		var button3 = this.add.button(leftOffset * 3 + buttonWidth * 2, this.world.height - 20, 'button-' + this.theme + '-triangle', this.shapeTriangle, this, 1, 0, 2);
		button3.anchor.set(0, 1);
		var button4 = this.add.button(leftOffset * 4 + buttonWidth * 3, this.world.height - 20, 'button-' + this.theme + '-hex', this.shapeHex, this, 1, 0, 2);
		button4.anchor.set(0, 1);
		this.key1 = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.key2 = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.key3 = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
		this.key4 = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		this.key1.onDown.add(this.shapeCircle, this);
		this.key2.onDown.add(this.shapeSquare, this);
		this.key3.onDown.add(this.shapeTriangle, this);
		this.key4.onDown.add(this.shapeHex, this)
	},
	createPlayer: function() {
		this.player = this.add.sprite(this.world.width * 0.5, this.world.height * 0.5, 'player-' + this.theme);
		this.player.anchor.set(0.5);
		this.player.shaped = 'circle';
		this.physics.arcade.enable(this.player);
		this.player.frame = 0;
		this.player.animations.add('init', [0]);
		this.player.animations.add('circleToSquare', [0, 1, 2, 3, 4]);
		this.player.animations.add('circleToTriangle', [5, 6, 7, 8, 9]);
		this.player.animations.add('circleToHex', [10, 11, 12, 13, 14]);
		this.player.animations.add('squareToCircle', [4, 3, 2, 1, 0]);
		this.player.animations.add('squareToTriangle', [15, 16, 17, 18, 19]);
		this.player.animations.add('squareToHex', [20, 21, 22, 23, 24]);
		this.player.animations.add('triangleToCircle', [9, 8, 7, 6, 5]);
		this.player.animations.add('triangleToSquare', [19, 18, 17, 16, 15]);
		this.player.animations.add('triangleToHex', [25, 26, 27, 28, 29]);
		this.player.animations.add('hexToCircle', [14, 13, 12, 11, 10]);
		this.player.animations.add('hexToSquare', [24, 23, 22, 21, 20]);
		this.player.animations.add('hexToTriangle', [29, 28, 27, 26, 25]);
		this.player.transformOptions = {
			1: 'circle',
			2: 'circle',
			3: 'circle',
			6: 'circle',
			7: 'circle',
			8: 'circle',
			11: 'circle',
			12: 'circle',
			13: 'circle',
			16: 'circle',
			17: 'circle',
			18: 'circle',
			21: 'circle',
			22: 'circle',
			23: 'circle',
			26: 'circle',
			27: 'circle',
			28: 'circle',
			0: 'circle',
			5: 'circle',
			10: 'circle',
			4: 'square',
			15: 'square',
			20: 'square',
			9: 'triangle',
			19: 'triangle',
			25: 'triangle',
			14: 'hex',
			24: 'hex',
			29: 'hex'
		};
		this.player.reversedTransformOptions = ['circle', 'circle', 'square', 'square', 'square', 'circle', 'circle', 'triangle', 'triangle', 'triangle', 'circle', 'circle', 'hex', 'hex', 'hex', 'square', 'square', 'triangle', 'triangle', 'triangle', 'square', 'square', 'hex', 'hex', 'hex', 'triangle', 'triangle', 'hex', 'hex', 'hex'];
		this.player.sizeOptions = {
			'classic': {
				'circle': [135, 135, 0, 0],
				'square': [110, 110, 0, 0],
				'triangle': [80, 110, 0, 0],
				'hex': [145, 125, 0, 0]
			},
			'sport': {
				'circle': [135, 135, 0, 0],
				'square': [110, 110, 0, 0],
				'triangle': [80, 110, 0, 0],
				'hex': [145, 125, 0, 0]
			},
			'space': {
				'circle': [135, 135, 0, 0],
				'square': [110, 110, 0, 0],
				'triangle': [80, 110, 0, 0],
				'hex': [145, 125, 0, 0]
			},
			'tetris': {
				'circle': [90, 90, 0, 0],
				'square': [130, 85, 0, 0],
				'triangle': [140, 90, 0, 0],
				'hex': [90, 140, 0, 0]
			}
		};
		var so = this.player.sizeOptions[this.theme][this.player.shaped];
		this.player.body.setSize(so[0], so[1], so[2], so[3]);
		this.player.currentAnim = this.player.animations.play('init', 24, false)
	},
	update: function() {
		switch (this.stateStatus) {
			case 'paused':
				{
					if (!this.runOnce) {
						this.statePaused();
						this.runOnce = true
					}
					break
				}
			case 'gameover':
				{
					if (!this.runOnce) {
						this.stateGameover();
						this.runOnce = true
					}
					break
				}
			case 'playing':
				{
					this.statePlaying()
				}
			default:
				{}
		}
	},
	managePause: function() {
		this.gamePaused = !this.gamePaused;
		if (EPT._audioStatus) {
			EPT._soundClick.play()
		}
		if (this.gamePaused) {
			this.stateStatus = 'paused'
		} else {
			this.stateStatus = 'playing';
			this.runOnce = false
		}
	},
	statePlaying: function() {
		if (this.shapesBG) {
			this.shapesBG.angle += 0.1
		}
		if (this.screenPausedGroup.visible) {
			this.camera.flash(0x000000, 100, true);
			this.screenPausedGroup.visible = false
		}
		if (this.physics.arcade.isPaused) {
			this.physics.arcade.isPaused = false
		}
		this.physics.arcade.overlap(this.player, this.shapes, this.checkShape, null, this);
		this.spawnItemTimer += this.time.elapsed;
		if (this.spawnItemTimer > this.shapeReleaseRate) {
			this.spawnItemTimer = 0;
			this.releaseItem()
		}
	},
	statePaused: function() {
		this.physics.arcade.isPaused = true;
		this.camera.fade(0x000000, 100, true);
		this.time.events.add(100, function() {
			this.screenPausedGroup.visible = true;
			this.camera.flash(0x000000, 100, true)
		}, this);
		this.screenPausedText.y = -this.screenPausedText.height - 20;
		this.add.tween(this.screenPausedText).to({
			y: 150
		}, 500, Phaser.Easing.Exponential.Out, true, 100);
		this.screenPausedBack.x = -this.screenPausedBack.width - 20;
		this.add.tween(this.screenPausedBack).to({
			x: 150
		}, 500, Phaser.Easing.Exponential.Out, true, 100);
		this.screenPausedContinue.x = this.world.width + this.screenPausedContinue.width + 20;
		this.add.tween(this.screenPausedContinue).to({
			x: this.world.width - 150
		}, 500, Phaser.Easing.Exponential.Out, true, 100)
	},
	stateGameover: function() {
		storageAPI.setHighscore('Shape-highscore', this.score);
		this.screenGameoverDiamondText.setText('+ ' + this.diamonds);
		var oldDiamonds = storageAPI.get('Shape-diamonds');
		var newDiamonds = oldDiamonds + this.diamonds;
		storageAPI.set('Shape-diamonds', newDiamonds);
		this.camera.fade(0x000000, 100, true);
		this.time.events.add(100, function() {
			this.screenGameoverGroup.visible = true;
			this.camera.flash(0x000000, 100, true)
		}, this);
		this.screenGameoverText.y = -this.screenGameoverText.height - 20;
		this.add.tween(this.screenGameoverText).to({
			y: 150
		}, 500, Phaser.Easing.Exponential.Out, true, 100);
		this.screenGameoverBack.x = -this.screenGameoverBack.width - 20;
		this.add.tween(this.screenGameoverBack).to({
			x: 150
		}, 500, Phaser.Easing.Exponential.Out, true, 100);
		this.screenGameoverRestart.x = this.world.width + this.screenGameoverRestart.width + 20;
		this.add.tween(this.screenGameoverRestart).to({
			x: this.world.width - 150
		}, 500, Phaser.Easing.Exponential.Out, true, 100);
		if (this.score) {
			this.screenGameoverScore.setText('SCORE: 0');
			this.tweenedScore = 0;
			var scoreTween = this.add.tween(this);
			scoreTween.to({
				tweenedScore: this.score
			}, 1000, Phaser.Easing.Linear.None, true, 300);
			scoreTween.onUpdateCallback(function() {
				this.screenGameoverScore.setText('SCORE: ' + Math.floor(this.tweenedScore))
			}, this);
			scoreTween.onComplete.addOnce(function() {
				this.screenGameoverScore.setText('SCORE: ' + this.score)
			}, this);
			scoreTween.start()
		} else {
			this.screenGameoverScore.setText('SCORE: 0')
		}
		if (this.diamonds) {
			this.screenGameoverDiamondText.setText('+ 0');
			this.tweenedDiamonds = 0;
			var diamondTween = this.add.tween(this);
			diamondTween.to({
				tweenedDiamonds: this.diamonds
			}, 1000, Phaser.Easing.Linear.None, true, 500);
			diamondTween.onUpdateCallback(function() {
				this.screenGameoverDiamondText.setText('+ ' + Math.floor(this.tweenedDiamonds))
			}, this);
			diamondTween.onComplete.addOnce(function() {
				this.screenGameoverDiamondText.setText('+ ' + this.diamonds);
				var dimg = this.screenGameoverDiamondImg;
				this.spawnEmitter(dimg, 'diamond', 20, 500, 0, dimg.width * 0.5, dimg.height * 0.5, 250)
			}, this);
			diamondTween.start()
		} else {
			this.screenGameoverDiamondText.setText('+ 0')
		}
	},
	spawnEmitter: function(item, particle, number, lifespan, frequency, offsetX, offsetY, gravity) {
		offsetX = offsetX || 0;
		offsetY = offsetY || 0;
		lifespan = lifespan || 2000;
		frequency = frequency || 0;
		var emitter = this.game.add.emitter(item.x + offsetX, item.y + offsetY, number);
		emitter.maxParticles = number;
		emitter.makeParticles(particle);
		emitter.setXSpeed(-300, 300);
		emitter.setYSpeed(-400, 200);
		emitter.setScale(0.75, 0.25, 0.75, 0.25, 500, Phaser.Easing.Linear.None);
		emitter.gravity = 250;
		emitter.start(false, lifespan, frequency, number)
	},
	checkShape: function(player, shape) {
		if (player.shaped == shape.geometry) {
			this.addScore(10);
			var tweenedShape = this.add.sprite(shape.x, shape.y, 'items-' + this.theme, shape.frame);
			tweenedShape.anchor.set(0.5);
			this.add.tween(tweenedShape.scale).to({
				x: 0,
				y: 0
			}, 100, Phaser.Easing.Linear.None, true);
			this.add.tween(tweenedShape).to({
				alpha: 0
			}, 100, Phaser.Easing.Linear.None, true).onComplete.addOnce(function() {
				tweenedShape.kill()
			}, this);
			shape.kill();
			if (EPT._audioStatus) {
				EPT._soundCollect.play()
			}
		} else if (shape.geometry == 'diamond') {
			this.addDiamond(shape, this.uiDiamond);
			if (EPT._audioStatus) {
				EPT._soundDiamond.play()
			}
		} else {
			shape.kill();
			this.killPlayer();
			if (EPT._audioStatus) {
				EPT._soundExplosion.play()
			}
		}
	},
	killPlayer: function() {
		this.spawnEmitter(this.player, 'particle-' + this.theme + '-' + this.player.shaped, 50, 500, 0);
		this.player.kill();
		this.camera.shake(0.02, 500, true, Phaser.Camera.SHAKE_BOTH, true);
		this.time.events.add(1000, function() {
			this.stateStatus = 'gameover'
		}, this)
	},
	addScore: function(amount) {
		this.score += amount;
		this.textScore.setText(this.score)
	},
	addDiamond: function(diamond) {
		var tweenedDiamond = this.add.sprite(diamond.x, diamond.y, 'diamond');
		tweenedDiamond.anchor.set(0.5);
		this.add.tween(tweenedDiamond.scale).to({
			x: 0,
			y: 0
		}, 300, Phaser.Easing.Linear.None, true);
		this.add.tween(tweenedDiamond).to({
			x: 20,
			y: 100
		}, 300, Phaser.Easing.Linear.None, true).onComplete.addOnce(function() {
			tweenedDiamond.kill();
			this.diamonds++;
			this.textDiamonds.setText(this.diamonds);
			this.camera.shake(0.003, 100, true, Phaser.Camera.SHAKE_BOTH, true);
			this.spawnEmitter({
				x: 20,
				y: 100
			}, 'diamond', 20, 300, 0, diamond.width * 0.5, diamond.height * 0.5, 250)
		}, this);
		diamond.kill()
	},
	shapeCircle: function() {
		if (this.player.shaped != 'circle' && this.player.currentAnim && !this.player.currentAnim.isPlaying) {
			var from = this.player.transformOptions[this.player.frame];
			this.player.currentAnim = this.player.animations.play(from + 'ToCircle', 36, false);
			this.player.currentAnim.onComplete.add(function() {}, this);
			this.player.shaped = 'circle';
			var s = this.player.sizeOptions[this.theme][this.player.shaped];
			this.player.body.setSize(s[0], s[1], s[2], s[3])
		}
	},
	shapeSquare: function() {
		if (this.player.shaped != 'square' && this.player.currentAnim && !this.player.currentAnim.isPlaying) {
			var from = this.player.transformOptions[this.player.frame];
			this.player.currentAnim = this.player.animations.play(from + 'ToSquare', 36, false);
			this.player.shaped = 'square';
			var s = this.player.sizeOptions[this.theme][this.player.shaped];
			this.player.body.setSize(s[0], s[1], s[2], s[3])
		}
	},
	shapeTriangle: function() {
		if (this.player.shaped != 'triangle' && this.player.currentAnim && !this.player.currentAnim.isPlaying) {
			var from = this.player.transformOptions[this.player.frame];
			this.player.currentAnim = this.player.animations.play(from + 'ToTriangle', 36, false);
			this.player.shaped = 'triangle';
			var s = this.player.sizeOptions[this.theme][this.player.shaped];
			this.player.body.setSize(s[0], s[1], s[2], s[3])
		}
	},
	shapeHex: function() {
		if (this.player.shaped != 'hex' && this.player.currentAnim && !this.player.currentAnim.isPlaying) {
			var from = this.player.transformOptions[this.player.frame];
			this.player.currentAnim = this.player.animations.play(from + 'ToHex', 36, false);
			this.player.shaped = 'hex';
			var s = this.player.sizeOptions[this.theme][this.player.shaped];
			this.player.body.setSize(s[0], s[1], s[2], s[3])
		}
	},
	releaseItem: function() {
		if (Phaser.Utils.chanceRoll(20)) {
			var item = this.shapes.getFirstDead(true, 0, 0, 'diamond');
			item.geometry = 'diamond'
		} else {
			var geometryOptions = ['circle', 'square', 'triangle', 'hex'];
			var randomShape = this.rnd.between(0, 3);
			var item = this.shapes.getFirstDead(true, 0, 0, 'items-' + this.theme);
			item.frame = randomShape;
			item.geometry = geometryOptions[randomShape]
		}
		item.anchor.set(0.5);
		var direction = this.rnd.between(1, 4);
		var offsetX = 0;
		var offsetY = 0;
		if (this.world.height > this.world.width) {
			offsetX = -(this.world.height - this.world.width) * 0.5
		} else {
			offsetY = -(this.world.width - this.world.height) * 0.5
		}
		if (direction === Phaser.LEFT) {
			item.x = -item.width + offsetX;
			item.y = this.world.height * 0.5;
			item.body.velocity.x = this.shapeSpeed
		} else if (direction === Phaser.RIGHT) {
			item.x = this.world.width - offsetX;
			item.y = this.world.height * 0.5;
			item.body.velocity.x = -this.shapeSpeed
		} else if (direction === Phaser.UP) {
			item.x = this.world.width * 0.5;
			item.y = this.world.height - offsetY;
			item.body.velocity.y = -this.shapeSpeed
		} else if (direction === Phaser.DOWN) {
			item.x = this.world.width * 0.5;
			item.y = -item.height + offsetY;
			item.body.velocity.y = this.shapeSpeed
		}
		if (this.shapeReleaseRate > 250) {
			this.shapeReleaseRate -= 20
		}
		if (this.shapeSpeed < 300) {
			this.shapeSpeed += 5
		}
		var s = this.shapes.sizeOptions[this.theme][item.geometry];
		item.body.setSize(s[0], s[1], s[2], s[3])
	},
	clickAudio: function() {
		if (!EPT._audioStatus) {
			EPT._soundClick.play()
		}
		EPT._manageAudio('switch', this)
	},
	stateRestart: function() {
		if (EPT._audioStatus) {
			EPT._soundClick.play()
		}
		this.screenGameoverGroup.visible = false;
		this.gamePaused = false;
		this.runOnce = false;
		this.spawnItemTimer = 0;
		this.shapeReleaseRate = 1500;
		this.stateStatus = 'playing';
		this.state.restart(true)
	},
	stateBack: function() {
		if (EPT._audioStatus) {
			EPT._soundClick.play()
		}
		this.screenGameoverGroup.visible = false;
		this.gamePaused = false;
		this.runOnce = false;
		this.spawnItemTimer = 0;
		this.shapeReleaseRate = 1500;
		this.stateStatus = 'playing';
		this.state.start('MainMenu')
	},
	render: function() {
		if (this.showDebug) {
			this.game.debug.body(this.player);
			this.shapes.forEachAlive(function(sprite) {
				this.game.debug.body(sprite)
			}, this)
		}
	}
};
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
		this.selectTheme(window._ShapeAttackTheme);
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
			window._ShapeAttackTheme = 'classic';
			storageAPI.set('Shape-theme', 'classic')
		}
	},
	selectSport: function() {
		if (this.available.sport) {
			this.bgClassic.frame = 0;
			this.bgSport.frame = 1;
			this.bgSpace.frame = 0;
			this.bgTetris.frame = 0;
			window._ShapeAttackTheme = 'sport';
			storageAPI.set('Shape-theme', 'sport')
		}
	},
	selectSpace: function() {
		if (this.available.space) {
			this.bgClassic.frame = 0;
			this.bgSport.frame = 0;
			this.bgSpace.frame = 1;
			this.bgTetris.frame = 0;
			window._ShapeAttackTheme = 'space';
			storageAPI.set('Shape-theme', 'space')
		}
	},
	selectTetris: function() {
		if (this.available.tetris) {
			this.bgClassic.frame = 0;
			this.bgSport.frame = 0;
			this.bgSpace.frame = 0;
			this.bgTetris.frame = 1;
			window._ShapeAttackTheme = 'tetris';
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
(function() {
	var app = angular.module('gemStore', [ ]);

	// app.controller('PanelController', function(){
	// 	this.tab = 1;

	// 	this.setTab = function(newValue){
	//       this.tab = newValue;
	//     };

	//     this.isSet = function(tabName){
	//       return this.tab === tabName;
	//     };
	// });

	app.controller('StoreController', function(){
		this.products = gems;
	});

	app.controller('PanelController', function(){
	    this.tab = 1;

	    this.setTab = function(newValue){
	      this.tab = newValue;
	    };

	    this.isSet = function(tabName){
	      return this.tab === tabName;
	    };
	});

	var gems = [
		{
			name: 'Dodecahedron',
			price: 190.98,
			// date: 13881234122323,
			description: 'Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.',
			images:
			[
				{full: 'dodecaheadrom-01-full.png', thumb: 'dodecaheadrom-01-thumb.png'},
				{full: 'dodecaheadrom-02-full.png', thumb: 'dodecaheadrom-02-thumb.png'}
			],
			canPurchase: true,
			soldOut: false
		},
		{
			name: 'Pentagonal Gem',
			price: 10010.53,
			// date: 138898334122323,
			description: 'Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides, however.',
			images:
			[
				{full: 'pentagonal-01-full.png', thumb: 'pentagonal-01-thumb.png'},
				{full: 'pentagonal-02-full.png', thumb: 'pentagonal-02-thumb.png'}
			],
			canPurchase: true,
			soldOut: false
		},
		{
			name: 'Azurite',
			price: 110.50,
			// date: 138898334122323,
			description: 'I think this gem was just OK, could honestly use more shine, IMO.',
			images:
			[
				{full: 'azurite-01-full.png', thumb: 'azurite-01-thumb.png'},
				{full: 'azurite-02-full.png', thumb: 'azurite-02-thumb.png'}
			],
			canPurchase: true,
			soldOut: false
		},
		{
			name: 'Bloodstone',
			price: 9110.50,
			// date: 138898334122323,
			description: 'Zircon is our most coveted and sought after gem. You will pay much to be the proud owner of this gorgeous and high shine gem.',
			images:
			[
				{full: 'bloodstone-01-full.png', thumb: 'bloodstone-01-thumb.png'},
				{full: 'bloodstone-02-full.png', thumb: 'bloodstone-02-thumb.png'}
			],
			canPurchase: true,
			soldOut: false
		},
		{
			name: 'Zircon',
			price: 1100.50,
			// date: 138898334122323,
			description: 'This gem is WAY too expensive for its rarity value.',
			images:
			[
				{full: 'Zircon-01-full.png', thumb: 'Zircon-01-thumb.png'},
				{full: 'Zircon-02-full.png', thumb: 'Zircon-02-thumb.png'}
			],
			canPurchase: true,
			soldOut: false
		}
	];
})();

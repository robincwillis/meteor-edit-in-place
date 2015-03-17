Template.eipInput.events({

	//on click pencil
	'click .eip-trigger' : function(e, t){
		e.preventDefault();
		var $eip = $(e.currentTarget).parent();
		this.value = $eip.find('.eip-value').text();
		$eip.find('.eip-input').width($eip.width()-30);
		$eip.width($eip.width());
		$eip.find('.eip-input').val(this.value);
		$eip.addClass('eip-active');
		$eip.trigger( "onEipTrigger", [ this ] );
	},

	//on click save
	'click .eip-save' : function(e, t){
		e.preventDefault();
		var $eip = $(e.currentTarget).parent();
		$eip.removeClass('eip-active');
		this.value = $eip.find('.eip-input').val();
		$eip.width('auto');
		$eip.find('.eip-value').text(this.value);
		$eip.trigger( "onEipSave", [ this ] );
	},

	//on input blur
	'blur .eip-input' : function(e, t){
		var $eip = $(e.currentTarget).parent();
		$eip.trigger( "onEipBlur", [ this ] );
	}

});

Template.eipSelect.created = function(){
	//set the value to a preselected option if it exists
	console.log(this.data.options);
	var label = _.findWhere(this.data.options,{value : this.data.value}).label;
	if(label){
		this.data.label = label;
	}
};

Template.eipSelect.events({

	'click .eip-trigger' : function(e, t){
			e.preventDefault();
			var $eip = $(e.currentTarget).parent();
			this.value = $eip.find('.eip-value').data('value');
			$eip.find('.eip-input').width($eip.width()-30);
			$eip.width($eip.width());
			$eip.find('.eip-input').val(this.value);
			$eip.addClass('eip-active');
			$eip.trigger( "onEipTrigger", [ this ] );
	},

	//on click save
	'click .eip-save' : function(e, t){
			e.preventDefault();
			var $eip = $(e.currentTarget).parent();
			$eip.removeClass('eip-active');
			this.value = $eip.find('.eip-input').val();
			this.label = $eip.find('.eip-input option:selected').text();
			$eip.width('auto');
			$eip.find('.eip-value').text(this.label);
			$eip.find('.eip-value').data('value',this.value);
			$eip.trigger( "onEipSave", [ this ] );
	},

	//on select
	'change .eip-input' : function(e, t){
		var $eip = $(e.currentTarget).parent();
		$eip.trigger( "onEipChange", [ this ] );
	}

});
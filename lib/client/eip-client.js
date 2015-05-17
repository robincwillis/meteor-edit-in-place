function lookup(obj) {
		var ref = window, arr;
		if (typeof obj === "string") {
			arr = obj.split(".");
			while(arr.length && (ref = ref[arr.shift()]));
			if (!ref) {
				throw new Error(obj + " is not in the window scope");
			}
			return ref;
		}
		return obj;
}

function formatValue(value, type){

	var formatedValue;

	switch(type){
		case "Number" :
			formatedValue = Number(value);
		break;
		case "Date" :
			formatedValue = new Date(value);
		break;
		case "String" :
			formatedValue = String(value);
		break;
		default :
			formatedValue = value;
	}

	if( type === "Number" && isNaN(formatedValue)){
		throw new Error('failed parsing value as Number');
	}

	return formatedValue;
}

function checkParams(params, eipType){

		if(!params.collection){
			throw new Error('collection is required');
		}
		if(!params.attribute && eipType !== 'eipGroup'){
			throw new Error('attribute is required');
		}

		if(!params.item && eipType === 'eipInput'){
			throw new Error('item is required');
		}

		if(!params.list && eipType === 'eipList'){
			throw new Error('list is required');
		}

}

function inputTrigger(e, offset, data){
		var $eip = $(e.currentTarget).parent();
		$eip.find('.eip-input').width($eip.width()-offset);
		$eip.width($eip.width());

		if(data.item){
			data.value = data.item[data.attribute];
		} else {
			data.value = $eip.find('.eip-value').data('value');
		}

		$eip.find('.eip-input').val(data.value);

		if(data.collection){
			var collection = data.collection;
			data.collection = lookup(collection);
		}
		$eip.addClass('eip-active');
		$eip.trigger( data.customTrigger || "onEipTrigger", [ data ] );
}

function inputSave(e, data){
		var $eip = $(e.currentTarget).parent();
		$eip.removeClass('eip-active');
		var value = $eip.find('.eip-input').val();
		data.value = formatValue(value, data.type);
		$eip.width('auto');

		if(data.collection){
			var collection = data.collection;
			data.collection = lookup(collection);
		}

		$eip.trigger( data.customSave ||  "onEipSave", [ data ] );
}

function inputDelete(e, data){
		var $eip = $(e.currentTarget).parent();
		if(data.reactive === false){
			var $eipItem = $(e.currentTarget).parent().parent();
			$eipItem.remove();
		}
		if(data.collection){
			var collection = data.collection;
			data.collection = lookup(collection);
		}
		$eip.trigger( data.customDelete || "onEipDelete", [ data ] );
}

function inputBlur(e, data){
	var $eip = $(e.currentTarget).parent();
	if(data.reactive === false){
		data.value = $eip.find('.eip-input').val();
		$eip.find('.eip-value').text(data.value);
	}
	$eip.trigger( "onEipBlur", [ this ] );
}

function inputChange(e, data){
	var $eip = $(e.currentTarget).parent();
	data.value = $eip.find('.eip-input').val();
	data.label = $eip.find('.eip-input option:selected').text();


	if(data.reactive === false){
		$eip.find('.eip-value').text(data.label);
		$eip.find('.eip-value').data('value',data.value);
	}

	if(data.collection){
		var collection = data.collection;
		data.collection = lookup(collection);
	}
	$eip.trigger( data.customChange || "onEipChange", [ data ] );
}


//==========================================
// Input
//==========================================
Template.eipInput.helpers({
	value : function(){
		var reactive = true;
		if(this.reactive === false){
			reactive = false;
		}

		if(this.item){
			return this.item[this.attribute];
		}
		return this.value;
	}
});

Template.eipInput.events({

	//on click pencil
	'click .eip-trigger' : function(e, t){
		e.preventDefault();
		inputTrigger(e, 30, this);
	},

	//on click save
	'click .eip-save' : function(e, t){
		e.preventDefault();
		inputSave(e, this);
	},

	//on input blur
	'blur .eip-input' : function(e, t){
		inputBlur(e, this);
	},

	//on input keypress enter
	'keypress input' : function(e, t){
		if(e.keyCode == 13) {
			e.preventDefault();
			inputSave(e, this);
		}
	}

});

//==========================================
// Select
//==========================================

Template.eipSelect.helpers({

	options : function(){
		return this.options;
	},

	value : function(){
		if(this.item){
			return this.value || this.item[this.attribute];
		}
		return this.value;
	},

	currentLabel : function(){
			var value;
			if(this.item){
				value = this.value || this.item[this.attribute];
			}
			var option = _.findWhere(this.options, {value : value} );
			if(option && option.label){
				return option.label;
			}

			return this.label || this.value;
	}
});

Template.eipSelect.events({

	'click .eip-trigger' : function(e, t){
			e.preventDefault();
			inputTrigger(e, 30, this);
	},

	//on click save
	'click .eip-save' : function(e, t){
			e.preventDefault();
			inputSave(e, this);
	},

	//on select
	'change .eip-input' : function(e, t){
		inputChange(e, this);
	}

});


//==========================================
// List
//==========================================

Template.eipList.helpers({

	pullValues : function(){
			checkParams(this, 'eipList');
			var reactive = true;
			if(this.reactive === false){
				reactive = false;
			}

		var collection = this.collection;
		var attribute = this.attribute;

		var values = _.map(this.list, function(item){
			return { value : item[attribute], attribute : attribute, collection : collection, item : item, reactive : reactive };
		});
		return values;
	}

});

Template.eipListItem.events({
	'click .eip-trigger' : function(e){
		e.preventDefault();
		inputTrigger(e,50, this);
	},

	'click .eip-save' : function(e){
		e.preventDefault();
		inputSave(e, this);
	},

	'click .eip-delete' : function(e){
		e.preventDefault();
		inputDelete(e, this);
	},

	//on input blur
	'blur .eip-input' : function(e, t){
		inputBlur(e, this);
	},

	//on input keypress enter
	'keypress input' : function(e, t){
		if(e.keyCode == 13) {
			e.preventDefault();
			inputSave(e, this);
		}
	}
});

//==========================================
// Group
//==========================================

Template.eipGroup.helpers({

	pullValues : function(){
		checkParams(this, 'eipGroup');
		var reactive = true;
		var data = this;
		if(this.reactive === false){
			reactive = false;
		}
		var item = this.item;

		var values = _.map(this.groupAttributes, function(groupAttribute){
			groupAttribute.value = item !== undefined && item[groupAttribute.attribute] !== undefined ? item[groupAttribute.attribute] : "";
			return groupAttribute;
		});
		return values;
	}

});

Template.eipGroup.events({
	'click .eip-trigger' : function(e){
		e.preventDefault();
		var $eip = $(e.currentTarget).parent();
		$eip.addClass('eip-active');
		var data = this;
		if(data.collection){
			var collection = data.collection;
			data.collection = lookup(collection);
		}
		$eip.trigger( data.customTrigger || "onEipGroupTrigger", [ data ] );
	},

	'click .eip-save' : function(e){
		e.preventDefault();
		var $eip = $(e.currentTarget).parent();
		$eip.removeClass('eip-active');
		var data = this;
		var $eipGroupItems = $(e.currentTarget).parent().find('.eip-group > li.eip-group-item');
		$.each($eipGroupItems, function(i, eipItem){
			if(data.item){
				var attribute = $(eipItem).find('.eip-input').data('attr');
				var value = $(eipItem).find('.eip-input').val();
				data.item[attribute] = value;
			}
		});

		if(data.collection){
			var collection = data.collection;
			data.collection = lookup(collection);
		}
		$eip.trigger( data.customSave || "onEipGroupSave", [ data ] );
	},
});

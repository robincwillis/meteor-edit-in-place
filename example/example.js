Books = new Mongo.Collection('books');
Colors = new Mongo.Collection('colors');


if (Meteor.isClient) {

	Template.hello.created = function(){
		Meteor.call('reset', function(err, res){
			if(err){
				console.log(err);
			}
		});
	}

	Template.hello.helpers({
		colorOptions: function () {
			return [
							{label : 'green', value : 2},
							{label : 'red', value : 1},
							{label : 'blue', value : 3}
							];
		},

		color : function(){
			var colors = Colors.find().fetch();
			return colors[0];
		},

		books : function(){
			return Books.find().fetch();
		},

		book : function(){
			var books = Books.find().fetch();
			return books[0];
		},

		bookGroup : function(){
			return [
				{label : 'Title', attribute : 'title' },
				{label : 'author', attribute : 'author' }
			];
		}

	});

	Template.hello.events({
		'onEipTrigger' : function(e, t){
			console.log('----');
			console.log('TRIGGER');
			console.log(this);
			console.log('----');

		},
		'onEipSave' : function(e, t){
			console.log('----');
			console.log('SAVE');
			console.log(this);
			if(this.reactive !== false){
				var obj = {};
				obj[this.attribute] = this.value;
				this.collection.update(this.item._id, obj);
			}
			console.log('----');
		},
		'onEipBlur' : function(e, t){
			console.log('----');
			console.log('BLUR');
			console.log(this);
			console.log('----');
		},
		'onEipChange' : function(e, t){
			console.log('----');
			console.log('CHANGE');
			console.log(this);
			console.log('----');
		},
		'onEipDelete' : function(e, t){
			console.log('----');
			console.log('DELETE');
			console.log(this);
			if(this.reactive !== false){
				this.collection.remove(this.item);
			}
			console.log('----');
		},
		'onEipGroupSave' : function(e, t){
			console.log('----');
			console.log('GROUP SAVE');
			if(this.reactive !== false){
				var obj = this.item;
				this.collection.update(this.item._id, obj);
			}
			console.log('----');

		},
		'doThisTrigger' : function(e, t){
			console.log('----');
			console.log('CUSTOM TRIGGER');
			console.log(this);
			console.log('----');

		},
		'doThisSave' : function(e, t){
			console.log('----');
			console.log('CUSTOM SAVE');
			console.log(this);
			if(this.reactive !== false){
				var obj = {};
				obj[this.attribute] = this.value;
				this.collection.update(this.item._id, obj);
			}
			console.log('----');
		},


	});
}

if (Meteor.isServer) {
	Meteor.methods({
		reset : function(){
			Colors.remove({});
			Books.remove({});
			if (Colors.find().count() === 0){
				var color = {name:"red", value: 1};
				Colors.insert(color);
			}

			if (Books.find().count() === 0){
				var book1 = {title:"On The Road", author: "Jack Kerouac"};
				var book2 = {title:"Basketball Diaries", author: "Jim Carroll"};
				var book3 = {title:"Howl", author: "Allen Ginsberg"};

				Books.insert(book1);
				Books.insert(book2);
				Books.insert(book3);
			}
			return true;
		}
	})
}

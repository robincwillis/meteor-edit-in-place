

# Edit In Place

Edit in place is a Meteor package that provides UI elements to easily edit values in line. It can be used both reactively or not. It does not automatically insert, update or delete documents but rather triggers events and sends changes made which then you can listen to and do what you want with the changes, ie call a Meteor method, run some validation, whatever.

## Getting Started

The easiest way to get started is to clone this repository and run the example code

```
> git clone git@github.com:robincwillis/meteor-edit-in-place.git
> cd meteor/edit-in-place/example
> meteor
```

## How It Works

#### Partials

To use Edit in Place simply include one of the partials included with the package. The following input types are available.

##### A basic text input

```javascript
{{> eipInput
	collection="Books"
	item=book
	attribute="title"
}}
```

##### A select input

```javascript
{{> eipSelect
	collection="Colors"
	item=color
	attribute="value"
	type="Number"
	options=colorOptions
}}
```

##### A list of text inputs

```javascript
{{> eipList
	collection="Books"
	list=books
	attribute="title"
}}
```

#### Parameters

At a minimum each partial requires the following parameters

1. `collection` : `String` The collection which this document belongs to.
2. `item/list` : `Object` or `Array` The document or documents which are being .modified
3. `attribute` : `String` The key for the attribute that is being modified.

4. `options` : (only for `eipSelect`) Select inputs need a list of options for the select element, this should be an array of objects in this format.

```javascript
[
	{label : "A", value : 1 },
	{label : "B", value : 2 },
	{label : "C", value : 3 }
]
```

##### Optional

1. `reactive` : `Boolean` By default edit in place will not make any changes to values represented in the DOM. Making these changes is not the Meteor way of doing things, instead it will return changes back to you, so that you can update your collections and documents accordingly, those reactive changes will feedback into the Edit in Place partials. However if you don't want to do this you can set this parameter to `false`.

2. `value` : You can override the initial value shown in Edit in Place partial by setting this parameter.

3. `type` : `"String"`,`"Number"`,`"Date"` Specify how the value should be formated when returned back from Edit in Place.

#### Events

Edit in place will trigger a number of custom events on changes to each partial, the events are

1. `onEipTrigger` : When someone begins editing
2. `onEipSave` : When someone ends editing
3. `onEipBlur` : When the input field in the partial loses focus
4. `onEipChange` : When the value of a select input has been changed
5. `onEipDelete` : When someone clicks the delete icon on a list item

You can listen for in your Meteor template like this.

```javascript
Template.hello.events({
	'onEipTrigger' : function(e, t){
		console.log(this); // {collection: Mongo.Collection, item: Object, attribute: "title", value: "robin willis"}
	},
	'onEipSave' : function(e, t){
			console.log(this); // {collection: Mongo.Collection, item: Object, attribute: "title", value: "robin willis"}
			var obj = {};
			obj[this.attribute] = this.value;
			this.collection.update(this.item._id, obj);
	},
	'onEipBlur' : function(e, t){
		console.log(this); // {collection: Mongo.Collection, item: Object, attribute: "title", value: "robin willis"}
	},
	'onEipChange' : function(e, t){
		console.log(this); // {collection: Mongo.Collection, item: Object, attribute: "title", value: "robin willis"}
	},
	'onEipDelete' : function(e, t){
		console.log(this); // {collection: Mongo.Collection, item: Object, attribute: "title", value: "robin willis"}
		this.collection.remove(this.item);
	}
});
```
#### Custom Events

You can override any of the events triggered by specifying custom events as parameters in the template. This lets you listen for events on individual inputs rather than all inputs.

1. `customTrigger` : `"String"`
2. `customSave` : `"String"`
3. `customBlur` : `"String"`
4. `customChange` : `"String"`
5. `customDelete` : `"String"`




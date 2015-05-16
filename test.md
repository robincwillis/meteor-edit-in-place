---
layout: default
title: Readme
permalink: /
---


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
var something = "cool";
```
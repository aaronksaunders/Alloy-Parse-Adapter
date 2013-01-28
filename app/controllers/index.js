var debug_responses = {
  success : function(response) {
    Ti.API.info('success: ' + JSON.stringify(response));
  },
  error : function(response) {
    Ti.API.info('error: ' + JSON.stringify(response));
  }
};

$.index.open();

$.table.updateContent = function(collection) {
  var rows = [];
  for (var i = 0; i < collection.length; i++) {
    var model = collection.at(i).attributes, title = "";
    for (var key in model) {
      if (key !== "id") {
        title += model[key] + "  "
      }
    }
    rows.push(Ti.UI.createTableViewRow({
      title : title
    }));
  }
  this.setData(rows);
};


var books = Alloy.createCollection('Book');

books.on("fetch", function() {
  $.table.updateContent(books);
});

books.fetch(debug_responses); // Freshen Table

var book = Alloy.createModel('Book', {
  book : "Jungle Book",
  author : "Kipling"
});
book.save(debug_responses);

//books.fetch(debug_responses); // Freshen Table

book.save(_.extend({
  author : 'Kipling II'
},debug_responses));

books.fetch(debug_responses); // Freshen Table

/*
// Now we can add items to the model.
var book = Alloy.createModel('Book', {
  book : "Jungle Book",
  author : "Kipling"
});
books.add(book);

// Use Backbone shortcut to create a model and add to collection in single step. Does the same
// thing as the creating a new model and then adding it to the collection.
books.add({
  book : "War and Peace",
  author : "Tolstoy"
});

// Add will add models to local Backbone server but save triggers the CRUD create operation
// causing the model to get added to the persistent store. During create an id is added to the
// model signaling that the model has been persisted and no longer in the new state.
books.forEach(function(model) {
  model.save();
});

// UPDATE - update the model save here triggers the CRUD update operation
book.save({
  author : "R Kipling"
});

// Okay time to show the results. Remember this sync's local Backbone server with persistent store.
books.fetch();

// DELETE - destroy triggers the CRUD delete operation
for ( i = books.length - 1; i >= 0; i--) {
  var model = books.at(i);
  //Ti.API
  //model.destroy();
};*/
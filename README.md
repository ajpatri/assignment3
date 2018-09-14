## Assignment Instructions

### General Idea

1. Query restaurant for menu based on user term
   * Narrow It Down For Me!
   * Filter results retrieved from server for the user string in the item
     description
   * Populate filtered results into `found` array
2. Display `found` array in view
   * unordered list
   * Information seperated by comma
     * name, short_name, and description
   * OR be fancier and use some sort of a grid.
3. Allow user to remove items from resulting list
   * `Don't want this one!` button
4. Nothing found? Empty search box?
   * Display: `Nothing found`
5. Optional: Cache retrieved results?

### Requirements

1. Declare `ng-app` either on the `html` or the `body` element. Name your app `NarrowItDownApp`.
2. Declare and create a `NarrowItDownController` (with controller as syntax) that will wrap your search
textbox and button as well as the list of found items.
3. Declare and create `MenuSearchService`.
   * implement method: `getMatchedMenuItems(searchTerm)`
     * reaches out to the server using the $http service to retrieve the list of all the menu items.
     * Server: `https://davids-restaurant.herokuapp.com/menu_items.json`
     * it should loop through them to pick out the ones whose description matches the searchTerm.
     * returns a promise

        ```javascript
        return $http(...).then(function (result) {
            // process result and only keep items that match
            var foundItems...
            // return processed items
            return foundItems;
        });
        ```
5. The NarrowItDownController should be injected with the MenuSearchService.
   The controller should call the `getMatchedMenuItems()` method when appropriate
   and store the result in a property called `found` attached to the controller
   instance.

6. Declare and create `foundItems` directive.
   * display list using this `directive`, taking the `found` array of items as an attribute
     * think one-way binding with `<`
   * The remove item button should use an on-remove attribute
     * use function reference binding: `&`
     * calls parent controller function, passing in the index

#### Important Implementation Notes
1. Make sure all of your Javascript code is inside of an IIFE.
2. Make sure all of your dependency injections are protected from minification.
3. After you are done and satisfied with your solution, don't forget to add/commit/push your code to your repository.

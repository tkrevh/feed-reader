/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined and not empty', function() {
           for (index in allFeeds) {
             var feed = allFeeds[index];
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBeNull();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined and not empty', function() {
           for (index in allFeeds) {
             var feed = allFeeds[index];
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBeNull();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
          expect(document.body.className).toBe('menu-hidden');
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('is shown when clicked and hidden on consecutive click', function() {
          $('.menu-icon-link').click();
          expect(document.body.className).toBe('');
          $('.menu-icon-link').click();
          expect(document.body.className).toBe('menu-hidden');
        });
    });
    
    
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /*
         * Load feed asynchronously and pass in "done" callback function
         */
        beforeEach(function(done) {
            loadFeed(1, done);
        });
        
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('.feed container has at least one .entry', function(done) {
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });
         

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var content;
        /*
         * Load feed asynchronously and pass in "done" callback function
         */
        beforeEach(function(done) {
            loadFeed(1, function() {
              content = document.querySelector('.feed').innerHTML;
              done();
            });
        });
        
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        it('changes the contents of .feed container', function(done) {
            loadFeed(2, function() {
              expect(document.querySelector('.feed').innerHTML).not.toEqual(content);
              done();
            });
        });
    });

}());

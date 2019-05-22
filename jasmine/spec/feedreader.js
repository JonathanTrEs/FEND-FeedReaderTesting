/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for(feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for(feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test for "The menu" */
    describe('The menu', function() {
        /* The menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
            let body = document.getElementsByTagName('body').item(0);
            expect(body).toBeDefined();
            expect(body.classList.length).toBeGreaterThan(0);
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
         });

         /* The menu changes
          * visibility when the menu icon is clicked.
          */
        it('change visibility when clicked', function() {
            //Get the menu icon and the body element
            let menuIcon = $('.menu-icon-link');
            let body = document.getElementsByTagName('body').item(0);

            //Check that the elements exist
            expect(menuIcon).toBeDefined();
            expect(body).toBeDefined();

            //Click the button and check that the menu is visible
            $(menuIcon).trigger('click');
            expect($('body').hasClass("menu-hidden")).toBeFalsy();

            //Click again the button and check that the menu is have been hide
            $(menuIcon).trigger('click');
            expect(body.classList.length).toBeGreaterThan(0);
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });
    });
    
    /* Test for "Initial Entries" */
    describe('Initial Entries', function() {
        /* When the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('are entries', function(done) {
            let feed = $('.feed');
            expect(feed).toBeDefined();
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test for "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* When a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let feedContent;
        let newFeedContent;

        beforeEach(function(done){
            loadFeed(0, function(){
                feedContent = $('.feed').text();
                loadFeed(1, function(){
                    newFeedContent = $('.feed').text();
                    done();
                });
            });
        });

        it('content changes', function(done) {
            expect(feedContent).toBeDefined();
            expect(newFeedContent).toBeDefined();
            expect(feedContent).not.toEqual(newFeedContent);
            done();
        });
    });
}());
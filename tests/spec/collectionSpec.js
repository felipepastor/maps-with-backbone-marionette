define([
    "jquery",
    "marionette",
    "../../app/scripts/collections/MainCollections"], function ($, Marionette, Collection) {
    describe("collection tests", function () {

        var obj = {
                st_name: 'mytest.com',
                org: 'mytest org',
                dt_search: '14/01/2016, 00:00:00',
                city: 'brasilia',
                country: 'brazil',
                lat: '0',
                lon: '0'
            },
            collection = null;

        beforeEach(function () {
            //reseting the collection
            collection = new Collection.collectionList();
            collection.reset();
        });

        it("adding a model in collection lastest view", function () {
            //adding a new obj in collection and verifying
            collection.add(obj);

            expect(collection.length).toEqual(1);
            expect(collection.models[0].get('st_name')).toEqual('mytest.com');
        });
    });
});
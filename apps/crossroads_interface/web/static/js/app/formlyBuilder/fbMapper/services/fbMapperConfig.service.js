export default class fbMapperConfig {
    /*@ngInject*/
    constructor($log, $q, $resource) {
        this.log = $log;
        this.elementMap = {};
        this.compositionMap = {};
        this.qApi = $q;
        this.resource = $resource;
    }

    setElement(element) {
        this.elementMap[element.name] = element;
        return this.elementMap[element.name];
    }

    setComposition(composition) {
        this.compositionMap[composition.name] = composition;
        return this.compositionMap[composition.name];
    }

    getComposition(compositionName) {
        return this.compositionMap[compositionName];
    }

    getElement(elementName) {
        //if is Lookup, get values
        let element = this.elementMap[elementName];
        if (!_.has(element, 'lookupData')) {
            if (_.has(element.model, 'lookup')) {
                return this._setLookupValues(element).then((lookupArray) => {
                    element.lookupData = lookupArray;
                    return element;
                });
            }
        }
        var deferred = this.qApi.defer();
        deferred.resolve(element);
        return deferred.promise;
    }

    _setLookupValues(lookupElement) {
        let lookupValues = [];
        return this._getLookupValues(lookupElement.model.lookup.location).then((lookup) => {
            return lookup;
        });
    }

    _getLookupValues(path) {
        return this.resource(`${__API_ENDPOINT__}` + path )
            .query().$promise.then((data) => { return data;});
    }
}
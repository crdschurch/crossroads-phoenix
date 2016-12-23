export default class fbMapperService {
    /*@ngInject*/
    constructor(fbMapperConfig, $log, $resource, $q) {
        this.log = $log;
        this.resource = $resource;
        this.fbMapperConfig = fbMapperConfig;
        this.qApi = $q;
    }

    saveFormlyFormData(model) {
        let promise = this.resource(`${__API_ENDPOINT__}api/formbuilder/hugeEndPoint`)
            .save({}, model).$promise;
        return promise.then(() => {
            this.log.debug("Formly Service save endpoint returned");
        }, (err) => {
            throw err;
        });
    }

    //This takes an array of composition Names
    prepopulateCompositions(compositions) {
        let returnModel = {};
        let promises = [];
        _.forEach(compositions, (compositionName) => {
            let composition = this.fbMapperConfig.getComposition(compositionName);
            promises.push(composition.prePopulate.get().$promise);
        });
        return this.qApi.all(promises).then((data)=>{
            _.forEach(data, (compositionData, index)=> {
                returnModel[compositions[index]] = compositionData;
            });
            return returnModel;
        })
        .catch((err)=> {
            return returnModel;
        });
    }
}
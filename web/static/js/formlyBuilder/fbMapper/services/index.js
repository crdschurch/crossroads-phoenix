import fbMapperConfig from './fbMapperConfig.service';
import fbMapperService from './fbMapper.service';

export default ngModule => {
    ngModule.service('fbMapperConfig', fbMapperConfig);
    ngModule.service('fbMapperService', fbMapperService);
}
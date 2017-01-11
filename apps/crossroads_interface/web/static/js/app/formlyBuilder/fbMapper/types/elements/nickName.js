export default function addPreferredName(fbMapperConfig) {
    fbMapperConfig.setElement({
        name: 'nickName',
        model: require('./models/nickName.json')
    });
}
export default function addLastName(fbMapperConfig) {
    fbMapperConfig.setElement({
        name: 'lastName',
        model: require('./models/lastName.json')
    });
}
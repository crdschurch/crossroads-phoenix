export default function FirstName(fbMapperConfig) {
    fbMapperConfig.setElement({
        name: 'firstName',
        model: require('./models/firstName.json')
    });
}
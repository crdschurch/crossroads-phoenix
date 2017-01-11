export default function Gender(fbMapperConfig) {
    fbMapperConfig.setElement({
        name: 'gender',
        model: require('./models/gender.json')
    });
}
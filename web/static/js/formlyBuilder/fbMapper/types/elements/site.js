export default function Gender(fbMapperConfig) {
    fbMapperConfig.setElement({
        name: 'site',
        model: require('./models/site.json')
    });
}
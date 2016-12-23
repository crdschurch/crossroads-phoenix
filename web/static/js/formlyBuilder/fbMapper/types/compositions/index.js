import addPerson from './person';

export default ngModule => {
    ngModule.run(addPerson);
}
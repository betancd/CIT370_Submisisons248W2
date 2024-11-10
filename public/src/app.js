var object = {
    name: 'Danno',
    age: 41
};

class Person {
    name;
    age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getLegal() {
        return this.age > 18;
    }
}


console.log(new Person('Danno', 41));
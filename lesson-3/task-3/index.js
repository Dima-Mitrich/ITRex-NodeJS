"use strict";

class GetUsersFromApi {

    constructor(numberOFusers) {
        this.numberOFusers = numberOFusers
    }

    getUsers = async () => {

        let fetchingUser = async () => {
            let response = await fetch(`https://randomuser.me/api/?results=${this.numberOFusers}`);
            let json = await response.json();

            return json;
        }

        let usersObj = await fetchingUser();
        let usersArr = usersObj.results;
        let resultStr = '';

        usersArr.forEach((element, index) => {
            resultStr += `
            Person #${index + 1}:
            name: ${element.name.title} ${element.name.first} ${element.name.last};
            gender: ${element.gender};
            day of birthday: ${element.dob.date}, ${element.dob.age} age;
            email: ${element.email};
            cell: ${element.cell};
            addres: ${element.location.country}, ${element.location.city} city,
            ${element.location.street.name} street, ${element.location.street.number};
            
            `
        });

        console.log(resultStr);
    }
}

let list = new GetUsersFromApi(4);

list.getUsers();
import {Article, Category, Product} from "../models";
import category1 from "../assets/images/category1.jpg";
import category2 from "../assets/images/category2.jpg";
import category3 from "../assets/images/category3.jpg";

const apiUrl = "#";


const products: Array<Product> = [
    {
        "id": 70286,
        "name": "congue turpis.",
        "price": 109,
        "description": "turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec",
        "stock": 70,
        "img": category1,
        "category": 73498,
        "supplier": 79274,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 72156,
        "name": "tempor, est",
        "price": 43,
        "description": "velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper",
        "stock": 58,
        "img": category1,
        "category": 39125,
        "supplier": 3493,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 54617,
        "name": "malesuada",
        "price": 31,
        "description": "ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu,",
        "stock": 28,
        "img": category3,
        "category": 68668,
        "supplier": 42684,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 95855,
        "name": "malesuada",
        "price": 109,
        "description": "nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit",
        "stock": 73,
        "img": category1,
        "category": 79590,
        "supplier": 85121,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            },
            {
                "id": 58054,
                "rate": 1,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 44131,
        "name": "nulla. Integer vulputate,",
        "price": 101,
        "description": "mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla,",
        "stock": 56,
        "img": category2,
        "category": 56041,
        "supplier": 63645,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            },
            {
                "id": 58054,
                "rate": 1,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            },
            {
                "id": 58054,
                "rate": 4,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            },
            {
                "id": 58054,
                "rate": 4,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 55634,
        "name": "nisl. Quisque",
        "price": 89,
        "description": "nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam",
        "stock": 143,
        "img": category3,
        "category": 75767,
        "supplier": 20106,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 32325,
        "name": "litora",
        "price": 74,
        "description": "quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue",
        "stock": 111,
        "img": category2,
        "category": 53332,
        "supplier": 42086,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 44704,
        "name": "Aenean",
        "price": 82,
        "description": "sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus",
        "stock": 129,
        "img": category3,
        "category": 72257,
        "supplier": 12592,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 95952,
        "name": "mattis ornare,",
        "price": 62,
        "description": "vel, convallis in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse",
        "stock": 55,
        "img": category2,
        "category": 50367,
        "supplier": 37318,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    },
    {
        "id": 73988,
        "name": "Aenean",
        "price": 60,
        "description": "Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu",
        "stock": 0,
        "img": category3,
        "category": 73021,
        "supplier": 78356,
        "feedback": [
            {
                "id": 71771,
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": 53938,
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": 93293,
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": 1765,
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": 97777,
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": 35147,
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": 33566,
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": 85855,
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": 25272,
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": 58054,
                "rate": 3,
                "userId": 32693,
                "userName": "Flavia Richardson",
                "commentary": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet"
            }
        ],
        "specs": {
            "summary": "eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
            "options": [
                {
                    "id": 50910,
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": category1
                },
                {
                    "id": 54449,
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": category2
                },
                {
                    "id": 84565,
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": category3
                },
            ]
        }
    }
];

const categories: Array<Category> = [
    {
        "id": 70286,
        "name": "congue turpis.",
        "img": category1,
    },
    {
        "id": 72156,
        "name": "tempor, est",
        "img": category2,
    },
    {
        "id": 73498,
        "name": "malesuada",
        "img": category3,
    },
    {
        "id": 95855,
        "name": "adipiscing",
        "img": category1,
    },
    {
        "id": 44131,
        "name": "nulla. Integer vulputate,",
        "img": category2,
    },
    {
        "id": 55634,
        "name": "nisl. Quisque",
        "img": category3,
    },
    {
        "id": 32325,
        "name": "litora",
        "img": category1,
    },
    {
        "id": 44704,
        "name": "Aenean",
        "img": category2,
    },
    {
        "id": 95952,
        "name": "mattis ornare,",
        "img": category3,
    },
    {
        "id": 73988,
        "name": "rutrum",
        "img": category1,
    }
];

const articles: Array<Article> = [
    {
        "id": 70286,
        "title": "leo. Cras vehicula aliquet libero. Integer in magna. Phasellus",
        "summary": "sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed",
        "content": "arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam",
        "banner": category1,
        "date": "2019-12-24"
    },
    {
        "id": 72156,
        "title": "Vivamus",
        "summary": "Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi",
        "content": "ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem",
        "banner": category3,
        "date": "2019-11-24"
    },
    {
        "id": 54617,
        "title": "enim consequat purus. Maecenas libero est, congue a,",
        "summary": "non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut",
        "content": "lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et",
        "banner": category2,
        "date": "2019-10-24"
    },
    {
        "id": 95855,
        "title": "ante dictum cursus. Nunc",
        "summary": "mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor.",
        "content": "amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien",
        "banner": category1,
        "date": "2019-12-21"
    },
    {
        "id": 44131,
        "title": "id nunc interdum feugiat. Sed nec",
        "summary": "nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam",
        "content": "posuere cubilia Curae Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero",
        "banner": category2,
        "date": "2019-11-15"
    },
    {
        "id": 55634,
        "title": "dis parturient",
        "summary": "eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis",
        "content": "scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at,",
        "banner": category3,
        "date": "2019-10-08"
    },
    {
        "id": 32325,
        "title": "Fusce feugiat. Lorem ipsum dolor sit",
        "summary": "nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim. Etiam gravida",
        "content": "Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo",
        "banner": category1,
        "date": "2020-01-24"
    },
    {
        "id": 44704,
        "title": "In",
        "summary": "purus gravida sagittis. Duis gravida. Praesent eu nulla at sem molestie sodales. Mauris blandit enim consequat purus. Maecenas libero est, congue a, aliquet vel, vulputate eu,",
        "content": "at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque",
        "banner": category2,
        "date": "2020-12-24"
    },
    {
        "id": 95952,
        "title": "arcu. Aliquam ultrices iaculis odio. Nam interdum",
        "summary": "vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui.",
        "content": "nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris",
        "banner": category3,
        "date": "2019-14-24"
    },
    {
        "id": 73988,
        "title": "enim, condimentum eget, volutpat ornare, facilisis eget, ipsum.",
        "summary": "ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur",
        "content": "consequat purus. Maecenas libero est, congue a, aliquet vel, vulputate eu, odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum. Phasellus vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed",
        "banner": category1,
        "date": "2019-07-09"
    }
];

function getProducts() {
    return products;
}

function getCategories() {
    return categories;
}

function getArticles() {
    return articles;
}

export {getProducts, getCategories, getArticles};
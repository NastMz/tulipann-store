import {Article, Category, Product, Subcategory} from "../models/interfaces";
import {Images, getRateMean} from '../utils';
import verde from '../assets/temp/verde.jpg';
import negra from '../assets/temp/negra.jpg';
import candado from '../assets/temp/candado.jpg';
import colageno from '../assets/temp/colageno.jpg';
import delantal from '../assets/temp/delantal.jpg';

const products: Array<Product> = [
    {
        "id": "product1",
        "name": "Caja verde sencilla",
        "price": 55000,
        "description": "Caja militar para herramientas",
        "stock": 70,
        "images": [{src: negra, hash: 'LCGuzU?^00D%4T00NG~WyXS%n%x]'}],
        "categoryId": "category1",
        "subcategoriesIds": ["subcategory1", "subcategory4"],
        "feedback": [
            {
                "id": "71771",
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": "53938",
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": "93293",
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": "1765",
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": "97777",
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": "35147",
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": "33566",
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": "85855",
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": "25272",
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": "58054",
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
                    "id": "50910",
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": Images.category1
                },
                {
                    "id": "54449",
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": Images.category2
                },
                {
                    "id": "84565",
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": Images.category3
                },
            ]
        }
    },
    {
        "id": "product2",
        "name": "Caja negra sencilla",
        "price": 55000,
        "description": "Caja militar para herramientas",
        "stock": 58,
        "images": [{src: verde, hash: 'LCGuzU?^00D%4T00NG~WyXS%n%x]'}],
        "categoryId": "category1",
        "subcategoriesIds": ["subcategory1", "subcategory5"],
        "feedback": [
            {
                "id": "71771",
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": "53938",
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": "93293",
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": "1765",
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": "97777",
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": "35147",
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": "33566",
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": "85855",
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": "25272",
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": "58054",
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
                    "id": "50910",
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": Images.category1
                },
                {
                    "id": "54449",
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": Images.category2
                },
                {
                    "id": "84565",
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": Images.category3
                },
            ]
        }
    },
    {
        "id": "product3",
        "name": "Colageno",
        "price": 20000,
        "description": "ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu,",
        "stock": 28,
        "images": [{src: colageno, hash: 'LCGuzU?^00D%4T00NG~WyXS%n%x]'}],
        "categoryId": "category2",
        "subcategoriesIds": [],
        "feedback": [
            {
                "id": "71771",
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": "53938",
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": "93293",
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": "1765",
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": "97777",
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": "35147",
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": "33566",
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": "85855",
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": "25272",
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": "58054",
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
                    "id": "50910",
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": Images.category1
                },
                {
                    "id": "54449",
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": Images.category2
                },
                {
                    "id": "84565",
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": Images.category3
                },
            ]
        }
    },
    {
        "id": "product4",
        "name": "Delantal",
        "price": 14000,
        "description": "ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu,",
        "stock": 28,
        "images": [{src: delantal, hash: 'LCGuzU?^00D%4T00NG~WyXS%n%x]'}],
        "categoryId": "category3",
        "subcategoriesIds": [],
        "feedback": [
            {
                "id": "71771",
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": "53938",
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": "93293",
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": "1765",
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": "97777",
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": "35147",
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": "33566",
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": "85855",
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": "25272",
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": "58054",
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
                    "id": "50910",
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": Images.category1
                },
                {
                    "id": "54449",
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": Images.category2
                },
                {
                    "id": "84565",
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": Images.category3
                },
            ]
        }
    },
    {
        "id": "product5",
        "name": "Caja negra con logotipo y candado",
        "price": 55000,
        "description": "Caja militar para herramientas",
        "stock": 58,
        "images": [{src: candado, hash: 'LCGuzU?^00D%4T00NG~WyXS%n%x]'}],
        "categoryId": "category1",
        "subcategoriesIds": ["subcategory2", "subcategory3", "subcategory5"],
        "feedback": [
            {
                "id": "71771",
                "rate": 3,
                "userId": 74734,
                "userName": "Calista Rodgers",
                "commentary": "aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat."
            },
            {
                "id": "53938",
                "rate": 3,
                "userId": 16660,
                "userName": "Amity Burgess",
                "commentary": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo."
            },
            {
                "id": "93293",
                "rate": 5,
                "userId": 49336,
                "userName": "Vielka Davidson",
                "commentary": "bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel"
            },
            {
                "id": "1765",
                "rate": 3,
                "userId": 47810,
                "userName": "Serena Kinney",
                "commentary": "luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor"
            },
            {
                "id": "97777",
                "rate": 2,
                "userId": 10727,
                "userName": "Ruby Collins",
                "commentary": "elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui."
            },
            {
                "id": "35147",
                "rate": 5,
                "userId": 4898,
                "userName": "Jasmine Atkinson",
                "commentary": "Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci."
            },
            {
                "id": "33566",
                "rate": 3,
                "userId": 65889,
                "userName": "Caesar Frederick",
                "commentary": "orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"
            },
            {
                "id": "85855",
                "rate": 4,
                "userId": 37183,
                "userName": "Conan Sherman",
                "commentary": "nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus"
            },
            {
                "id": "25272",
                "rate": 4,
                "userId": 7834,
                "userName": "Hasad Schmidt",
                "commentary": "ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae"
            },
            {
                "id": "58054",
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
                    "id": "50910",
                    "name": "Nulla",
                    "title": "vel est tempor bibendum. Donec felis orci, adipiscing non,",
                    "description": "vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
                    "image": Images.category1
                },
                {
                    "id": "54449",
                    "name": "a, scelerisque sed,",
                    "title": "mollis. Duis sit",
                    "description": "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,",
                    "image": Images.category2
                },
                {
                    "id": "84565",
                    "name": "nascetur ridiculus mus.",
                    "title": "erat semper rutrum. Fusce dolor",
                    "description": "nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat",
                    "image": Images.category3
                },
            ]
        }
    },
];

const categories: Array<Category> = [
    {
        "id": "category1",
        "name": "Caja",
        "img": Images.category1,
    },
    {
        "id": "category2",
        "name": "Colageno",
        "img": Images.category2,
    },
    {
        "id": "category3",
        "name": "Delantal",
        "img": Images.category3,
    }
];

const articles: Array<Article> = [
    {
        "id": "71511",
        "title": "eu sem. Pellentesque ut ipsum ac",
        "summary": "Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec,",
        "content": "Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec",
        "date": "Oct 27, 2022",
        "author": "Florence Miles",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "17391",
        "title": "at sem molestie",
        "summary": "sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla",
        "content": "faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec",
        "date": "Feb 8, 2022",
        "author": "Lareina Reynolds",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "46580",
        "title": "Aenean egestas hendrerit neque. In ornare sagittis felis. Donec",
        "summary": "sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi",
        "content": "at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla.",
        "date": "Apr 21, 2022",
        "author": "Anjolie Bryant",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id":" 7209",
        "title": "a, facilisis",
        "summary": "porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede",
        "content": "eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac",
        "date": "Jan 21, 2023",
        "author": "Baker Pitts",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "30426",
        "title": "Nulla aliquet. Proin velit. Sed",
        "summary": "hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna.",
        "content": "arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique",
        "date": "May 18, 2023",
        "author": "Daquan Young",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "70648",
        "title": "eleifend.",
        "summary": "Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac",
        "content": "Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit",
        "date": "May 2, 2022",
        "author": "Heidi Bradford",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "27883",
        "title": "mollis nec, cursus a, enim. Suspendisse aliquet,",
        "summary": "Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec",
        "content": "nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras",
        "date": "Sep 9, 2023",
        "author": "Colorado Boyer",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "22582",
        "title": "pellentesque eget, dictum placerat, augue. Sed molestie.",
        "summary": "sagittis semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis",
        "content": "tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent",
        "date": "Nov 7, 2023",
        "author": "Cole Tyson",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "65769",
        "title": "lacinia mattis. Integer eu lacus. Quisque",
        "summary": "ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu",
        "content": "orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio a purus. Duis elementum, dui quis accumsan convallis, ante lectus convallis est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla",
        "date": "Jul 19, 2022",
        "author": "Eve Rosario",
        "tags": ["Articulo"],
        "banner": Images.category1
    },
    {
        "id": "49725",
        "title": "vitae purus gravida sagittis. Duis gravida. Praesent",
        "summary": "natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim.",
        "content": "est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna",
        "date": "Jan 31, 2022",
        "author": "Jack Parsons",
        "tags": ["Articulo"],
        "banner": Images.category1
    }
];

const subcategories: Array<Subcategory> = [
    {
        "id":"subcategory1",
        "name": "Sencilla",
        "categoryId": "category1",
    },
    {
        "id": "subcategory2",
        "name": "Logotipo",
        "categoryId": "category1",
    },
    {
        "id": "subcategory3",
        "name": "Candado",
        "categoryId": "category1",
    },
    {
        "id": "subcategory4",
        "name": "Verde",
        "categoryId": "category1",
    },
    {
        "id": "subcategory5",
        "name": "Negro",
        "categoryId": "category1",
    }
];

function getProducts() {
    return products.map((product) => {
        return {
            ...product,
            rate: getRateMean(product)
        }
    });
}

function getCategories() {
    return categories;
}

function getSubcategories() {
    return subcategories;
}

function getArticles() {
    return articles;
}

export {getProducts, getCategories, getArticles, getSubcategories};
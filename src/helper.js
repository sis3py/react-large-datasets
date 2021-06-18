import faker from "faker";
import thumbnail1 from "./img/cool-painted-iphone-case-blue-green.jpg";
import thumbnail2 from "./img/digital-download-music.jpg";
import thumbnail3 from "./img/stacked-bracelets-set.jpg";
import thumbnail4 from "./img/watch-no-numbers.jpg";

export const createProducts = (nbProducts) => {
    const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4];
    return Array(nbProducts).fill().map((_, index) => ({
        id: index + 1,
        thumbnail: thumbnails[faker.datatype.number(3, 0)],
        label: faker.lorem.word(10),
        description: faker.lorem.lines(3),
        price: faker.datatype.number(1000),
        quantity: faker.datatype.number(50),
    }));
}


export const filterProducts = (array, searchText) => searchText ? array.filter(p => p.description.toLowerCase().includes(searchText.toLowerCase()) 
                                                                                 || p.label.toLowerCase().includes(searchText.toLowerCase()))
                                                                : array;
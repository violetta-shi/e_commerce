export const getSelfResponse = {
    status: 401
};
// export const getSelfResponse = {
//     status: 200,
//     data: {
//         "id": 2,
//         "email": "example1@example.com",
//         "role": "USER"
//     }
// };
// export const getSelfResponse = {
//     status: 200,
//     data: {
//         "id": 1,
//         "email": "admin@admin.com",
//         "role": "ADMIN"
//     }
// };

export const loginResponse = {
    status: 200,
    data: {
        "id": 2,
        "email": "example1@example.com",
        "role": "USER",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgxMjMwNTg4LCJleHAiOjE2ODEyMzc3ODh9.nEUrs02eII3PZCOscmDyTrIQRJgtu8iyO5lgj71D2tU"
    }
};
// export const loginResponse = {
//     status: 200,
//     data: {
//         "id": 1,
//         "email": "admin@admin.com",
//         "role": "ADMIN",
//         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMjMwNzUyLCJleHAiOjE2ODEyMzc5NTJ9.7VEUWwR4SONQ1hIFbl0j82bH18PrO7C1ymep7xcdrXk"
//     }
// };
// export const loginResponse = {
//     status: 401,
//     data: {
//         "message": "Email и/или пароль неверны"
//     }
// };

export const categoriesResponse = {
    status: 200,
    data: [
        {
            id: 1,
            name: "Холодильники",
            image_url: "/img/category/category1.png",
            product_count: 9
        },
        {
            id: 2,
            name: "Вытяжки",
            image_url: "/img/category/category2.png",
            product_count: 15
        },
        {
            id: 3,
            name: "Кухонные плиты",
            image_url: "/img/category/category3.png",
            product_count: 13
        },
        {
            id: 4,
            name: "Морозильники",
            image_url: "/img/category/category4.png",
            product_count: 41
        },
        {
            id: 5,
            name: "Стиральные машины",
            image_url: "/img/category/category5.png",
            product_count: 65
        },
        {
            id: 6,
            name: "Утюги и отпариватели",
            image_url: "/img/category/category6.png",
            product_count: 16
        },
        {
            id: 7,
            name: "Мультиварки",
            image_url: "/img/category/category7.png",
            product_count: 13
        },
        {
            id: 8,
            name: "Электрочайники",
            image_url: "/img/category/category8.png",
            product_count: 7
        },
        {
            id: 9,
            name: "Блендеры",
            image_url: "/img/category/category9.png",
            product_count: 9
        },
        {
            id: 10,
            name: "Мясорубки",
            image_url: "/img/category/category10.png",
            product_count: 5
        },
        {
            id: 11,
            name: "Обогреватели",
            image_url: "/img/category/category11.png",
            product_count: 9
        },
        {
            id: 12,
            name: "Пылесосы",
            image_url: "/img/category/category12.png",
            product_count: 8
        },
        {
            id: 13,
            name: "Кофемашины",
            image_url: "/img/category/category13.png",
            product_count: 6
        },
        {
            id: 14,
            name: "Весы кухонные",
            image_url: "/img/category/category14.png",
            product_count: 12
        },
        {
            id: 15,
            name: "Детское меню",
            image_url: "/img/category/category15.png",
            product_count: 2
        },
        {
            id: 16,
            name: "Десерты",
            image_url: "/img/category/category16.png",
            product_count: 2
        },
        {
            id: 17,
            name: "Напитки",
            image_url: "/img/category/category17.png",
            product_count: 13
        },
        {
            id: 18,
            name: "Гарниры и соусы",
            image_url: "/img/category/category18.png",
            product_count: 14
        }
    ]
}

export const productsResponse = {
    status: 200,
    data: [
        {
            id: 1,
            grouping_key: "1",
            image_url: "/img/product/product1.png",
            name: "Чикаго",
            size: "4 шт.",
            price: 5.90,
            weight: 122,
        },
        {
            id: 2,
            grouping_key: "1",
            image_url: "/img/product/product1.png",
            name: "Чикаго",
            size: "8 шт.",
            price: 9.90,
            weight: 265,
        },
        {
            id: 3,
            grouping_key: "2",
            image_url: "/img/product/product2.png",
            name: "Луизиана 8 шт.",
            price: 16.90,
            weight: 210,
        },
        {
            id: 4,
            grouping_key: "3",
            image_url: "/img/product/product3.png",
            name: "Милуоки",
            size: "4 шт.",
            price: 7.90,
            weight: 102,
        },
        {
            id: 5,
            grouping_key: "3",
            image_url: "/img/product/product3.png",
            name: "Милуоки",
            size: "8 шт.",
            price: 13.90,
            weight: 225,
        },
        {
            id: 6,
            grouping_key: "4",
            image_url: "/img/product/product4.png",
            name: "Киото",
            size: "4 шт.",
            price: 6.90,
            weight: 103,
        },
        {
            id: 7,
            grouping_key: "4",
            image_url: "/img/product/product4.png",
            name: "Киото",
            size: "8 шт.",
            price: 12.90,
            weight: 231,
        }
    ]
}

import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js'


const app = new Vue({
    el: '#app',
    data: {
        user: {
            location: {
                lat: 44.815303,
                lng: 20.457835
            },
            status: false,
            id: null,
            username: null,
            statusText: "Log in",
            loc_currentLocation: null,
            loc_selectedLocation: null,
            loc_defaultLocation: {
                lat: 44.815303,
                lng: 20.457835
            },
            map: null,
        },
        time_currentTime: "19.04.2024",
    },
    methods: {
        yamap_init() {
            // Инициализация карты
            this.map = new ymaps.Map("map", {
                center: [44.7866, 20.4489],
                zoom: 10
            });

            const customMarkers = [
                {
                    coords: [44.815303, 20.457835],
                    hintContent: 'Кастомная метка 1',
                    balloonContent: 'Информация о кастомной метке 1',
                    iconUrl: 'img/ico.png', // URL к кастомной иконке
                },
                {
                    coords: [44.7866, 20.4489],
                    hintContent: 'Кастомная метка 2',
                    balloonContent: 'Dimitrij kurac is here today!',
                    iconUrl: 'img/beer.png', // URL к кастомной иконке
                },
                // Добавьте больше меток, если необходимо
            ];

            // Добавьте кастомные метки на карту
            customMarkers.forEach(markerData => {
                const placemark = new ymaps.Placemark(
                    markerData.coords,
                    {
                        hintContent: markerData.hintContent,
                        balloonContent: markerData.balloonContent,
                    },
                    {
                        // Настройка кастомной иконки
                        iconLayout: 'default#image',
                        iconImageHref: markerData.iconUrl,
                        iconImageSize: [30, 30], // Размер иконки в пикселях
                        iconImageOffset: [-15, -15], // Смещение иконки относительно координат
                    }
                );

                // Добавьте метку на карту
                this.map.geoObjects.add(placemark);
                })
            }
    },
    mounted() {
        this.time_currentTime = new Date().toLocaleDateString();
        ymaps.ready(this.yamap_init);
    }
});


// function init() {
//     var myMap = new ymaps.Map('map', {
//         center: [55.76, 37.64],
//         zoom: 10
//     });
    
//     // Создание метки
//     var myPlacemark = new ymaps.Placemark([55.76, 37.64], {
//         hintContent: 'Моя метка',
//         balloonContent: 'Информация о метке'
//     });
    
//     // Добавление метки на карту
//     myMap.geoObjects.add(myPlacemark);
// }

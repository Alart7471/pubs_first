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
        g_theme: 'default', //default (белый фон, черный текст), dark (черный фон, белый текст),
        g_theme_data:{
            'default':{
                background_color: 'white',
                color: 'black'
            },
            'dark':{
                background_color: 'black',
                color: 'white'
            }
        },
        input_searchPub:'',
        showModalSearch:false,//Показывать окно поиска 
        // input_searchPub_WidthPx: 0//залупа (номер 1)
        db_data_pubs:null,//массив из БД пабов
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
                // Брать метки из базы
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
        },
        changeTheme(){
            (this.g_theme == 'default') ? this.g_theme = 'dark' : this.g_theme = 'default'

            document.body.style.backgroundColor = this.g_theme_data[this.g_theme].background_color
            document.body.style.color = this.g_theme_data[this.g_theme].color
        },
        input_searchPub_onChange(o, n){
            console.log('input_searchPub_onChange')
            console.log(o)
            console.log(n)
            console.log('==========')
            if(n.length == 0){
                // this.map.setCenter([44.815303, 20.457835])
                this.showModalSearch=false
            }
            else if(n.length == 1){
                this.showModalSearch=true
                // this.map.panTo([44.815303, 15.457835])
            }
            else if(n.length == 2){
                this.showModalSearch=true
            }
        },
        db_getPubs(){
            this.showModalSearch=!this.showModalSearch
            axios.get('http://localhost:8080/api/getPubs', {
                params: {
                    country: 'serbia',
                    city: 'belgrade',
                    date: new Date().toISOString(),
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            })
            .then(response => {
                console.log(response.data)
                this.db_data_pubs = response.data
                // Добавление свойства `clicked` ко всем объектам в массиве `db_data_pubs`
                this.db_data_pubs.forEach(pub => {
                    // Используйте `Vue.set()` для добавления свойства `clicked` к объекту `pub`
                    this.$set(pub, 'clicked', false);
                    this.$set(pub, 'distance', 1.5)
                });

            })
            .catch(error => console.log(error))
        },
        // getInputPubsWidthInPixels(){//залупа (номер 1) ебаная не работает
        //     // Получаем элемент block1
        //     const input_searchPubElement = this.$refs.pub_name_input;
            
        //     // Получаем вычисленный стиль элемента block1
        //     const computedStyle = window.getComputedStyle(input_searchPubElement);
            
        //     // Получаем ширину элемента block1 в пикселях
        //     this.input_searchPub_WidthPx = parseFloat(computedStyle.width);
            
        //     // Устанавливаем переменную CSS для ширины блока1 в пикселях
        //     document.documentElement.style.setProperty('--pub_name_input-px', `${this.input_searchPub_WidthPx}px`);
        //     console.log(this.input_searchPub_WidthPx)
        // },
        getTodayHours(pub) {//перепроверить, не уверен, что работает корректно, добавить часовой пояс
            // Функция для получения часов работы в текущий день
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            const today = new Date().getDay() - 1; // Получаем индекс текущего дня недели (0 - воскресенье, 6 - суббота)
            const dayName = days[today]; // Имя текущего дня недели
            return pub[dayName + '_hours']; // Возвращаем часы работы в текущий день
        },
        handleClick(pub){
            pub.clicked = !pub.clicked;
            console.log(pub)
            console.log(this.db_data_pubs)
        }
    },
    watch:{
        input_searchPub(n, o){
            this.input_searchPub_onChange(o, n)
        }
    },
    mounted() {
        this.time_currentTime = new Date().toLocaleDateString();
        ymaps.ready(this.yamap_init);
        // this.getInputPubsWidthInPixels();//залупа (номер 1)
    }
});

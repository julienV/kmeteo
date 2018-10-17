export  class  City {
    id: number;    
    name: string;    
    weather: any[];    
    main: any;

    constructor(values: Object = {}) {    
        Object.assign(this, values);    
    }

    public weatherIcon() {
        return "http://openweathermap.org/img/w/" + this.weather[0].icon + ".png";
    }

    public mainTemperatureC() {
        return Math.round(this.main.temp - 273.15); 
    }
}
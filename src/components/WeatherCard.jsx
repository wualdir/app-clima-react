import React, { useState } from "react";
import './styles/WeatherCard.css'


const WeatherCard = ({ weather, temp }) => {
  const [iscelsius, setiscelsius] = useState(true);

  const changeTemperature = () => {
    setiscelsius(!iscelsius);
  };
  return (
  
    <article className="card">
      <h1 className="card__title">weather App</h1>
      <h2 className="card__country">
        {weather?.name}, {weather?.sys.country}
      </h2>

      <section className="card__body">
        <div className="card__image-container">
          <img
            className="card__image"
            src={
              weather &&
              `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
            }
            alt=""
          />
        </div>

        <arcticle className="info">
          <h3 className="info-title">{weather?.weather[0].description}</h3>
          <ul className="info-list">
            <li className="info__item">
              <span className="info__label">wind speed</span>
              <span className="info__value">{weather?.wind.speed}m/s</span>
            </li>
            <li className="info__item" >
              <span className="info__label">clouds</span>
              <span className="info__value"> {weather?.clouds.all}%</span>
            </li>
            <li className="info__item">
              <span className="info__label">Pressures</span>
              <span className="info__value">{weather?.main.pressesure}Hpa</span>
            </li>
          </ul>
        </arcticle>
      </section>
        <h2 className="card__temp">
          {iscelsius ? `${temp?.celsius}Cº` : `${temp?.Fahrenheit}Fº`}
        </h2>
        <button className="card__btn" onClick={changeTemperature}>
          change to º{iscelsius ? "Fº" : "Cº"}
        </button>
     
    </article>
  );
}

export default WeatherCard;

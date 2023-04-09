import { multiply, matrix } from 'mathjs';
import { useState } from 'react';
import './App.css';

function App() {
  function calculateIntensity(
    distance,
    extinctionCoefficient,
    initialIntensity
  ) {
    // Расчет интенсивности света по закону Бугера-Ламберта-Бэра
    const intensity =
      initialIntensity * Math.exp(-extinctionCoefficient * distance);
    return intensity;
  }

  // Пример использования функции calculateIntensity
  // const distance = 10; // Расстояние, которое пройдет свет через среду (в метрах)
  // const extinctionCoefficient = 0.1; // Коэффициент затухания света (в 1/м)
  // const initialIntensity = 100; // Начальная интенсивность света
  const [distance, setDistance] = useState('10');
  const [extinctionCoefficient, setExtinctionCoefficient] = useState('0.1');
  const [initialIntensity, setInitialIntensity] = useState('100');

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'distance') {
      setDistance(value);
    }
    if (name === 'extinctionCoefficient') {
      setExtinctionCoefficient(value);
    }
    if (name === 'initialIntensity') {
      setInitialIntensity(value);
    }
  };

  // Функция для преобразования оптического сигнала в электрический
  function photodetector(
    distance,
    extinctionCoefficient,
    initialIntensity,
    opticalSystem,
    QE
  ) {
    const intensity = calculateIntensity(
      distance,
      extinctionCoefficient,
      initialIntensity
    );

    // Применение коэффициента квантовой эффективности
    const QEintensity = intensity * QE;

    // Применение коэффициента ответа фотоприемника
    const response = multiply(opticalSystem, QEintensity);

    return response;
  }

  // Пример использования функции photodetector
  const opticalSystem = matrix([
    [0.5, 0.5],
    [0.5, 0.5]
  ]);

  const QE = 0.8;

  // const response = photodetector(
  //   distance,
  //   extinctionCoefficient,
  //   initialIntensity,
  //   opticalSystem,
  //   QE
  // );

  const [response, setResponse] = useState('');
  const handleSubmit = () => {
    const result = photodetector(
      distance,
      extinctionCoefficient,
      initialIntensity,
      opticalSystem,
      QE
    );

    setResponse(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Рассчет преобразования оптического сигнала в электрический</h1>
        <label htmlFor="distance">
          Расстояние, которое пройдет свет через среду (в метрах)
        </label>
        <input
          type="text"
          id="distance"
          onChange={handleChange}
          name="distance"
        />
        <br />
        <label htmlFor="extinctionCoefficient">
          Коэффициент затухания света (в 1/м)
        </label>
        <input
          type="text"
          id="extinctionCoefficient"
          onChange={handleChange}
          name="extinctionCoefficient"
        />
        <br />
        <label htmlFor="initialIntensity">Начальная интенсивность света</label>
        <input
          type="text"
          id="initialIntensity"
          onChange={handleChange}
          name="initialIntensity"
        />
        <br />
        <button onClick={handleSubmit}>Рассчитать</button>

        <br />
        <br />

        {response && <h3>Результат: {response?._data[0][0]}</h3>}
      </header>
    </div>
  );
}

export default App;

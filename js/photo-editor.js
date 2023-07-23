const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const image = document.querySelector('.img-upload__preview img');

const chrome = document.querySelector('#effect-chrome');
const sepia = document.querySelector('#effect-sepia');
const marvin = document.querySelector('#effect-marvin');
const phobos = document.querySelector('#effect-phobos');
const heat = document.querySelector('#effect-heat');

const smaller = document.querySelector('.scale__control--smaller');
const bigger = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');

const items = document.querySelectorAll('.effects__item');

const createSlider = (slider) => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower'
  });
  sliderContainer.classList.add('hidden');
};
createSlider(sliderElement);

smaller.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value > 25) {
    valueScale.value = `${value - 25}%`;
    image.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

bigger.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value < 100) {
    valueScale.value = `${value + 25}%`;
    image.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

items.forEach((item) => {
  item.addEventListener('change', effects);
});

const updateOptions = (min, max, start, step) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
};

const sliderListener = (effect) => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get(); //Запись данных в скрытое поле

    image.style.cssText += `filter: ${effect}(${sliderElement.noUiSlider.get()}); transform: scale(${parseInt(valueScale.value, 10) / 100});`;
  });
};

const resetDefault = () => {
  sliderContainer.classList.add('hidden');
  valueScale.value = '100%';
  image.style.cssText = 'transform: scale(1); filter: none';
};

const resetEffects = () => {
  sliderContainer.classList.remove('hidden');
  image.style.cssText = 'filter: none';
};

function effects() {
  switch(true) {
    case chrome.checked: {
      resetEffects();
      updateOptions(0, 1, 1, 0.1);
      sliderListener('grayscale');
      break;
    }
    case sepia.checked: {
      resetEffects();
      updateOptions(0, 1, 1, 0.1);
      sliderListener('sepia');
      break;
    }
    case marvin.checked: {
      resetEffects();
      updateOptions(0, 100, 100, 1);
      sliderElement.noUiSlider.on('update', () => {
        valueElement.value = sliderElement.noUiSlider.get();

        image.style.cssText += `filter: invert(${sliderElement.noUiSlider.get()}%)`;
      });
      break;
    }
    case phobos.checked: {
      resetEffects();
      updateOptions(0, 3, 3, 0.1);
      sliderElement.noUiSlider.on('update', () => {
        valueElement.value = sliderElement.noUiSlider.get();

        image.style.cssText += `filter: blur(${sliderElement.noUiSlider.get()}px)`;
      });
      break;
    }
    case heat.checked: {
      resetEffects();
      updateOptions(1, 3, 3, 0.1);
      sliderListener('brightness');
      break;
    }
    default: {
      resetDefault();
      break;
    }
  }
}

export { resetDefault };

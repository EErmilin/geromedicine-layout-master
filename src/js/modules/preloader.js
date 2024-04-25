class Preloader {

  constructor() {

  }

  /**
   * Селектор блока в котором нужен preloader
   * @param selector
   */
  static add(selector) {
    const parent = document.querySelector(selector);
    if(parent) {
      const preloader = document.createElement('div');
      preloader.classList.add('preloader');
      preloader.classList.add('preloader--full');

      const preloaderIcon = document.createElement('div');
      preloaderIcon.classList.add('preloader__icon');

      preloader.appendChild(preloaderIcon);

      parent.appendChild(preloader);
    }
  }

  /**
   * Удаление всех preloader'ов
   */
  static remove() {
    const preloaderAll = document.querySelectorAll('.preloader');

    if(preloaderAll) {
      preloaderAll.forEach(preloader => preloader.remove())
    }

  }

}

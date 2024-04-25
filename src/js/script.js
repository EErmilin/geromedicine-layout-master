'use strict';

$(function () {
  $('select').selectric();

  let BODY = $("body");
  let HTML = $("html");
  let userEvent = {};

  if (isMobile()) {
    userEvent.click = "touchend";
    HTML.addClass("gm-touch");
    HTML.removeClass("gm-no-touch");
  } else {
    userEvent.click = "click";
    HTML.removeClass("gm-touch");
    HTML.addClass("gm-no-touch");
  }

  BODY.on(userEvent.click, ".js-hamburger", function () {
    BODY.toggleClass("mobile-menu-opened");
  });

  const promoSlider = new Swiper('.promo-slider', {
    // Optional parameters
    loop: true,
    // If we need pagination
    pagination: {
      el: '.promo-slider-pagination',
    },

    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },

  });

  const popularServicesSlider = new Swiper('.popular-services-slider', {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 20,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },

  });

  const doctorSlider = new Swiper('.doctors-slider', {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },

  });

  const reviewSlider = new Swiper('.reviews-slider', {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },

  });

  const aboutSlider = new Swiper('.about-slider', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: '.about-slider-pagination',
    },

    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },

  });

  /**
   * Mobile Submenu Toggle
   * */

  BODY.on(userEvent.click, ".mobile-nav__toggle", function () {
    let mobileMenuItem = $(this).closest('.mobile-nav__item');
    mobileMenuItem.toggleClass('active');
  });

  /**
   * Price List Toggle
   * */

  BODY.on(userEvent.click, ".price-list__toggle", function () {
    let priceListItem = $(this).closest('.price-list__item');
    let priceListSub = priceListItem.find('.price-list-sub');

    if(priceListSub.length){
      if(priceListItem.hasClass('expanded')){
        priceListSub.slideUp(function () {
          priceListItem.removeClass('expanded');
        });
      }else {
        priceListSub.slideDown(function () {
          priceListItem.addClass('expanded');
        });
      }
    }
  });

  /**
   * Calculator Items Toggle
   * */
  BODY.on(userEvent.click, ".calc-item__header", function () {
    let calcItem = $(this).closest('.calc-item');
    let calcItemBody = calcItem.find('.calc-item__body');

    if(calcItemBody.length){
      if(calcItem.hasClass('expanded')){
        calcItemBody.slideUp(function () {
          calcItem.removeClass('expanded');
        });
      }else {
        calcItemBody.slideDown(function () {
          calcItem.addClass('expanded');
        });
      }
    }
  });

  /** Календарь в модалке */

  $('#datepicker').datepicker(
      {
        regional: 'ru',
    minDate: new Date(),
    onSelect: function(dateText) {
      $('#appointment-date').val(dateText);
    }
  });

  let phoneFields =  $('input[type="tel"]');
  phoneFields.mask('+7 (999) 999-99-99');

  Calculator();
  programsFilter();
  stopEscapeModal();
  scrollTop();
});

$(window).on("load", onWindowLoad);
$(window).on("resize", onWindowResize);



function scrollTop() {
  const scrollTopButton =  $('.js-scroll-top');
  scrollTopButton.on('click', function () {
    window.scrollTo( 0, 0 );
  });
}

function showInfoModal() {
  $('#infoModal').modal('show');
}

function stopEscapeModal() {

  let isModalOn = true; // включаем hold-попап

  // через 15 секунд отключаем hold-попап
  setTimeout(function () {
    isModalOn = false;
    setCookie('stopEscapeModalViewed', 1, {secure: true, 'max-age': 60 * 60 * 24});
  }, 15000);

  // показываем на выходе мыши hold-попап
  document.onmouseleave = function() {
    if(isModalOn && !getCookie('stopEscapeModalViewed')){
      setCookie('stopEscapeModalViewed', 1, {secure: true, 'max-age': 60 * 60 * 24});
      $('#stopEscapeModal').modal('show');
    }
  };
}

function programsFilter(){
  const programs = $('[data-programs]');
  const selectedTags = programs.find('[data-selected-tags]');
  const selectedTagsContainer = programs.find('[data-selected-tags-container]');
  const tagsContainer = programs.find('[data-tags-container]');
  const allTags = tagsContainer.find('[data-tag]');
  const selectedTagsInput = $('#selectedTagsInput');
  let arTags = [];
  let objSelectedTags = {};

  update();

  allTags.on('change', function () {
    update();
  });

  programs.on('click', '[data-tag-close]', function () {
    const tagID = $(this).data('tag-close');
    closeTag(tagID);
  });

  programs.on('click', '[data-clear-all]', function () {
    clearAll();
  });

  function closeTag(tagID){
    allTags.each(function () {
      const _this = $(this);
      if(_this.data('tag') === tagID){
        _this.prop('checked', false);
      }
    })
    update()
  }

  function clearAll() {
    allTags.each(function () {
      const _this = $(this);
      _this.prop('checked', false);
    })
    update()
  }

  function updateSelectedTagsInput() {
    arTags = [];
    if(Object.keys(objSelectedTags).length){
      for (let key in objSelectedTags){
        arTags.push(key);
      }
    }
    selectedTagsInput.val(JSON.stringify(arTags));
  }

  function update() {

    allTags.each(function () {
      const _this = $(this);
      const tagID = _this.attr('data-tag');
      const tagName = _this.attr('data-name');

      if(_this.prop('checked')){
        _this.closest('.chips__tag').addClass('active');

        if(!(tagID in objSelectedTags)){
          objSelectedTags[tagID] = tagName;
        }
      }
      else {
        _this.closest('.chips__tag').removeClass('active');
        if(tagID in objSelectedTags){
          delete objSelectedTags[tagID];
        }
      }

    });
    renderSelectedTags();
    updateSelectedTagsInput();
  }

  function renderSelectedTags() {

    selectedTagsContainer.empty();

    if(Object.keys(objSelectedTags).length){
      let clearAllBtn = `
        <div class="chips__item">
          <div class="chips__btn" data-clear-all><span>Очистить все</span></div>
        </div>
      `;
      selectedTagsContainer.append(clearAllBtn);
      selectedTags.addClass('active');

      for (let key in objSelectedTags){
        let tagToAppend = `
          <div class="chips__item">
            <div class="chips__tag"><span>${objSelectedTags[key]}</span>
              <div class="chips__close" data-tag-close="${key}">
                <svg class="svg-icon" viewBox="0 0 11 11" width="11" height="11">
                  <use xlink:href="#svg-chips-cross"></use>
                </svg>
              </div>
            </div>
          </div>
        `;
        selectedTagsContainer.append(tagToAppend);
      }

    }
    else {
      selectedTags.removeClass('active');
    }
  }
}

function Calculator() {

  const calculator = $('[data-calculator]');
  const searchInput = calculator.find('[data-search-input]');
  const searchList = calculator.find('[data-search-list]');
  const searchDropdown = calculator.find('[data-search-dropdown]');
  const calcGroups = calculator.find('[data-group]');
  const checkboxesAll = calculator.find('[data-checkbox]');
  const calcSumPlace = calculator.find('[data-calc-sum]');
  const selectedList = calculator.find('[data-calc-selected]');
  let searchArray = [];

  checkboxesAll.on("change", function () {
    let _this = $(this);

    let objData = {
      id: _this.data("checkbox"),
      price: _this.data("price"),
      name: _this.data("name")
    }

    if(_this.prop('checked')){
      addSelected(objData);
    }else {
      removeSelected(objData.id)
    }

    update();

  });

  // поиск на странице
  searchInput.on('keyup', function (event) {

    let _this = $(this);

    switch (event.keyCode) {
      case 9: // tab
      case 13: // enter
      case 16: // Shift
      case 17: // ctrl
      case 19: // alt
      case 20: // CAPSlOCK
      case 27: // escape
      case 32: // space
      case 37: // стрелка лево
      case 38: // стрелка вверх
      case 39: // стрелка право
      case 40: // стрелка вниз
        console.log('do nothing');
        break;

      default:
        if(_this.val().length > 3){
          $('[data-search-link]').remove();
          searchDropdown.addClass("active");
          searchArray = getSearchArray(_this.val(), checkboxesAll);

          if (searchArray.length) {
            searchArray.forEach((element) => {
              searchList.append(`
                 <div class="c-search-list__link" data-search-link data-id="${element.id}" data-name="${element.name}" data-price="${element.price}">${element.name}</div>
              `);
            });
          }else {
            return false;
          }
        }else {
          searchDropdown.removeClass("active");
        }
    }
  });

  calculator.on('click', '[data-search-link]', function () {
    const _this = $(this);
    let objData = {
      id: _this.data("id"),
      price: _this.data("price"),
      name: _this.data("name")
    }
    addSelected(objData, true);
    searchDropdown.removeClass("active");
    searchInput.val("");
    update();
  });

  // создаем массив из найденных
  function getSearchArray(string, searchList) {
    let tempArr = [];
    searchList.each(function () {
      if (new RegExp(string, "i").test($(this).attr("data-name"))) {
        tempArr.push({
          id: $(this).attr("data-checkbox"),
          name: $(this).attr("data-name"),
          price: $(this).attr("data-price"),
        });
      }
    });
    return tempArr;
  }

  calculator.on('click', '[data-remove]', function () {
    let removeID = $(this).data('remove');
    removeSelected(removeID);

    checkboxesAll.each(function () {
      const _this = $(this);
      if(_this.data('checkbox') === removeID){
        _this.prop('checked', false);
      }
    });
    update();
  });

  calculator.on('click', '[data-select-all]', function () {
    const _this = $(this);
    const group = _this.closest('[data-group]');
    const checkboxesInGroup = group.find('[data-checkbox]');

    if(_this.hasClass('selected')){
      checkboxesInGroup.each(function () {
        const _this = $(this);
        let objData = {
          id: _this.data("checkbox"),
          price: _this.data("price"),
          name: _this.data("name")
        }
        $(this).prop('checked', false);
        removeSelected(objData.id);
      });
      _this.removeClass('selected');
    }else {
      checkboxesInGroup.each(function () {
        const _this = $(this);
        let objData = {
          id: _this.data("checkbox"),
          price: _this.data("price"),
          name: _this.data("name")
        }
        $(this).prop('checked', true);
        addSelected(objData);
      });
      _this.addClass('selected');
    }
    update();
  });

  function update() {
    let arAnalyzesIDs = [];
    const analyzesInput = $('#analyzesInput');
    calcGroups.each(function () {
      const _this = $(this);
      const btnSelectAll = _this.find('[data-select-all]');
      const checkboxesInGroup = _this.find('[data-checkbox]');
      let checkedCount = 0;

      checkboxesInGroup.each(function () {
        let _this = $(this);
        if(_this.prop('checked')){
          checkedCount++;
          arAnalyzesIDs.push(_this.attr('data-checkbox'));
        }
      });

      if(checkedCount === checkboxesInGroup.length){
        btnSelectAll.addClass('selected');
      }
      else{
        btnSelectAll.removeClass('selected');
      }

    });

    if(analyzesInput.length){
      analyzesInput.val(JSON.stringify(arAnalyzesIDs));
    }

    updateSum(calculator);
  }

  function addSelected(obj, enableCheckbox= false) {
    selectedList.append(`
        <div class="calc-selected-item" data-id="${obj.id}">
          <div class="calc-selected-item__info">
            <div class="calc-selected-item__name">${obj.name}</div>
            <div class="calc-selected-item__price">${obj.price} ₽</div>
          </div>
          <div class="calc-selected-item__btn">
            <button class="calc-selected-item__close" data-remove="${obj.id}">
              <svg class="svg-icon" viewBox="0 0 16 16" width="14" height="14">
                <use xlink:href="#svg-calc-cross"></use>
              </svg>
            </button>
          </div>
        </div>
  `);
    if(enableCheckbox){
      let checkbox = calculator.find(`[data-checkbox=${obj.id}]`);
      if(checkbox.length)
        checkbox.prop('checked', true);
    }
  }

  function removeSelected(id) {
    const itemToRemove = selectedList.find(`[data-id=${id}]`);
    if(itemToRemove.length){
      itemToRemove.remove();
    }
  }

  function getSum() {
    let sum = 0;

    checkboxesAll.each(function () {
      let _this = $(this);
      if(_this.prop('checked')){
        sum += _this.data('price');
      }
    });

    return sum;
  }

  function updateSum(){
    const sum = getSum();
    calcSumPlace.text(sum);
  }
}

function mobileMenuHeight() {
  let headerHeight = $(".page__header").height();
  let windowHeight = $(window).height();
  let mobileMenu = $(".mobile-menu");
  let mobileMenuHeight = windowHeight - headerHeight;
  mobileMenu.css({'height': mobileMenuHeight});
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {

  options = {
    path: '/'
  };

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function onWindowLoad() {
  mobileMenuHeight();
}

function onWindowResize() {
  mobileMenuHeight();
}






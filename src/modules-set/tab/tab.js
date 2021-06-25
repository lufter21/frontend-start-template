/*
call to init:
Tab.init({
    container: '.tab',
    button: '.tab__button',
    item: '.tab__item',
    hash: true, // default: false
    changeOnHover: true // default: false
});

Tab.onChange(function(btnElem) {
    // body
});
*/
; var Tab;

(function () {
    'use strict';

    Tab = {
        options: null,
        onChangeSubscribers: [],

        init: function (options) {
            const contElements = document.querySelectorAll(options.container);

            if (!contElements.length) return;

            this.options = options;

            //init tabs
            for (let i = 0; i < contElements.length; i++) {
                const contElem = contElements[i],
                    btnElements = contElem.querySelectorAll(options.button),
                    tabItemElements = contElem.querySelectorAll(options.item),
                    tabItemElemActive = contElem.querySelector(this.options.item + '.active');

                this.setHeight(tabItemElemActive);

                for (let i = 0; i < btnElements.length; i++) {
                    btnElements[i].setAttribute('data-index', i);

                    tabItemElements[i].setAttribute('data-index', i);
                }
            }

            //btn event
            if (options.changeOnHover) {
                document.addEventListener('mouseover', (e) => {
                    const btnElem = e.target.closest(options.button);

                    if (!btnElem) return;

                    this.change(btnElem);
                });

            } else {
                document.addEventListener('click', (e) => {
                    const btnElem = e.target.closest(options.button);

                    if (!btnElem) return;

                    if (!this.options.hash) {
                        e.preventDefault();
                    }

                    this.change(btnElem);
                });
            }

            if (window.location.hash) {
                const btnElem = document.querySelector(options.button + '[href*="' + window.location.hash + '"]');

                if (btnElem) {
                    this.change(btnElem);
                }
            }
        },

        onChange: function (fun) {
            if (typeof fun === 'function') {
                this.onChangeSubscribers.push(fun);
            }
        },

        change: function (btnElem) {
            if (btnElem.classList.contains('active')) return;

            const contElem = btnElem.closest(this.options.container),
                btnElements = contElem.querySelectorAll(this.options.button),
                tabItemElements = contElem.querySelectorAll(this.options.item);

            //remove active state
            for (let i = 0; i < btnElements.length; i++) {
                btnElements[i].classList.remove('active');
            }

            for (let i = 0; i < tabItemElements.length; i++) {
                tabItemElements[i].classList.remove('active');
            }

            //get current tab item
            const tabItemElem = contElem.querySelector(this.options.item + '[data-index="' + btnElem.getAttribute('data-index') + '"]');

            //set active state
            tabItemElem.classList.add('active');

            btnElem.classList.add('active');

            //set height
            this.setHeight(tabItemElem);

            // on change
            this.onChangeSubscribers.forEach(function (item) {
                item(btnElem);
            });
        },

        setHeight: function (tabItemElem) {
            tabItemElem.parentElement.style.height = tabItemElem.offsetHeight + 'px';

            setTimeout(function () {
                tabItemElem.parentElement.style.height = '';
            }, 1000);
        },

        reInit: function () {
            if (!this.options) return;

            const contElements = document.querySelectorAll(this.options.container);

            for (let i = 0; i < contElements.length; i++) {
                this.setHeight(contElements[i].querySelector(this.options.item + '.active'));
            }
        }
    };
})();
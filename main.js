var activeData = [],
    doneData = [],
    removeData = [],
    href = document.getElementsByTagName('a'),
    ul = document.getElementsByTagName('ul')[0],
    id = 0;

// Получаем данные и записиваем их
function activeTabs() {
    var input = document.getElementsByTagName('input')[0];

    if (input.value === '') {
        return false;
    } else {
        for (var letter = 0; letter < href.length; letter++) {
            href[letter].classList.remove('active');
        }
        href[0].className = 'active';
        location.hash = '#active';
        activeData.push(input.value);
        renderLi();
        input.value = '';
    }
}

// рендерим задания по массивам и статусу
function renderLi() {
    var li = document.createElement('li');

    li.className = 'list-active';
    li.setAttribute('id', id);

    if (location.hash === '#active') {
        activeData.forEach(function (t) {
            li.innerHTML = t;
        });
        li.onclick = function (item) {
            doneData.push(item.target.innerText);
            delete activeData[item.target.id];
            ul.removeChild(item.target);
        };
    }
    if (location.hash === '#done') {
        doneData.forEach(function (t) {
            li.innerHTML = t;
        });
        li.onclick = function (item) {
            removeData.push(item.target.innerText);
            delete doneData[item.target.id];
            ul.removeChild(item.target);
        };
    }
    if (location.hash === '#remove') {
        removeData.forEach(function (t) {
            li.innerHTML = t;
        });
        li.onclick = function (item) {
            activeData.push(item.target.innerText);
            delete removeData[item.target.id];
            ul.removeChild(item.target);
        };
    }
    id += 1;
    ul.appendChild(li);
}

// отслеживаем hash и кнопки нажатия (target)
function statusTarget(hash) {
    switch (hash) {
        case '#active':
            clearActiveButton();
            activeList();
            href[0].className = 'active'; // присваиваем стиль
            location.hash = '#active'; // new hash
            break;
        case '#done':
            clearActiveButton();
            doneList();
            href[1].className = 'active'; // присваиваем стиль
            location.hash = '#done'; // new hash
            break;
        case '#remove':
            clearActiveButton();
            removeList();
            href[2].className = 'active'; // присваиваем стиль
            location.hash = '#remove'; // new hash
            break;
    }
}

/* Очищаем списки */
function activeList() {
    ul.innerHTML = '';

    activeData.forEach(function (item, i) { // i - id
        var generateLi = document.createElement('li');
        /*  Отслеживаем события для "Активных" ТЗ  */
        generateLi.setAttribute('id', i);
        generateLi.innerText = item;
        generateLi.className = 'list-active';
        ul.appendChild(generateLi);
        generateLi.onclick = function (item) {
            doneData.push(item.target.innerText);
            delete activeData[item.target.id];
            ul.removeChild(item.target);
        }
    });
}

function doneList() {
    ul.innerHTML = '';

    doneData.forEach(function (item, i) { // i - id
        var generateLi = document.createElement('li');
        /*  Отслеживаем события для "Выполненных" ТЗ  */
        generateLi.setAttribute('id', i);
        generateLi.innerText = item;
        generateLi.className = 'list-done';
        ul.appendChild(generateLi);
        generateLi.onclick = function (item) {
            removeData.push(item.target.innerText);
            delete doneData[item.target.id];
            ul.removeChild(item.target);
        };
    });
}

function removeList() {
    ul.innerHTML = '';

    removeData.forEach(function (item, i) { // i - id
        var generateLi = document.createElement('li');
        /*  Отслеживаем события для "Удалённых" ТЗ  */
        generateLi.setAttribute('id', i);
        generateLi.innerText = item;
        generateLi.className = 'list-remove';
        ul.appendChild(generateLi);
        generateLi.onclick = function (item) {
            activeData.push(item.target.innerText);
            delete removeData[item.target.id];
            ul.removeChild(item.target);
        };
    });
}

/* Статус кнопок */
function clearActiveButton() {
    for (var letter = 0; letter < href.length; letter++) {
        href[letter].classList.remove('active');
    }
}
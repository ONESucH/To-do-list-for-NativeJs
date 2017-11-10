var activeData = [],
    doneData = [],
    removeData = [],
    href = document.getElementsByTagName('a'),
    id = 0;

// Получаем данные и записиваем их
function activeTabs() {
    test();
    var input = document.getElementsByTagName('input')[0],
        ul = document.getElementsByTagName('ul')[0],
        li = document.createElement('li');

    if (input.value === '') {
        return false;
    } else {

        for (var letter = 0; letter < href.length; letter++) {
            href[letter].classList.remove('active');
        }

        li.setAttribute('id', id);
        li.innerHTML = input.value;
        activeData.push(input.value);
        href[0].className = 'active';
        location.hash = '#active';
        input.value = '';
        ul.appendChild(li);
        renderLi(li);
    }
    id += 1;
}

// рендерим Li по статусу
function renderLi(renderingList) {

    if (!renderingList) return false;

    var ul = document.getElementsByTagName('ul')[0];

    if (location.hash === '#active') {
        console.log('Вошли в active');
        renderingList.onclick = function (item) {
            doneData.push(item.target.innerText);
            delete activeData[item.target.id];
            ul.removeChild(item.target);
        };
    }
    if (location.hash === '#done') {
        console.log('Вошли в done');
        renderingList.onclick = function (item) {
            removeData.push(item.target.innerText);
            delete doneData[item.target.id];
            ul.removeChild(item.target);
        };
    }
    if (location.hash === '#remove') {
        console.log('Вошли в remove');
        renderingList.onclick = function (item) {
            activeData.push(item.target.innerText);
            delete removeData[item.target.id];
            ul.removeChild(item.target);
        };
    }
}

// отслеживаем hash
function statusTarget(hash) {
    switch (hash) {
        case '#active':
            clearActiveButton();
            clearListsInPages();
            expandTheArray(activeData); // данные которые будут отображаться в нужном hash
            href[0].className = 'active';
            location.hash = '#active';
            break;
        case '#done':
            clearActiveButton();
            clearListsInPages();
            expandTheArray(doneData); // данные которые будут отображаться в нужном hash
            href[1].className = 'active';
            location.hash = '#done';
            break;
        case '#remove':
            clearActiveButton();
            clearListsInPages();
            expandTheArray(removeData); // данные которые будут отображаться в нужном hash
            href[2].className = 'active';
            location.hash = '#remove';
            break;
    }
}

/* Получаем массив и вставляем его по hash */
function expandTheArray(arr) {
    var ul = document.getElementsByTagName('ul')[0];

    for (var letter = 0; letter < arr.length; letter++) {
        var li = document.createElement('li');

        li.setAttribute('id', id);

        if (typeof arr[letter] === 'undefined') {
            return false
        } else {
            li.innerHTML = arr[letter];
            renderLi(li);
            ul.appendChild(li);
        }
    }
}

/* Статус кнопок */
function clearActiveButton() {
    for (var letter = 0; letter < href.length; letter++) {
        href[letter].classList.remove('active');
    }
}

/* Очищаем лист при каждом нажатии на "статус" */
function clearListsInPages() {
    var ul = document.getElementsByTagName('ul')[0],
        deleteWork = ul.getElementsByTagName('li');

    for (var letter = 0; letter < deleteWork.length; letter++) {
        ul.removeChild(deleteWork[letter]);
    }
}

function test() {
    console.log('activeData', activeData);
    console.log('doneData', doneData);
    console.log('removeData', removeData);
}
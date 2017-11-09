/*

    осталось отследить перемещение по массивам задания, хеш работает, стату по кнопкам передаётся, не рендерится список =)

 */

var activeData = [],
    doneData = [],
    removeData = [],
    href = document.getElementsByTagName('a');

// Получаем данные и записиваем их
function activeTabs() {
    var input = document.getElementsByTagName('input')[0],
        ul = document.getElementsByTagName('ul')[0],
        li = document.createElement('li');

    if (input.value === '') {
        return false;
    } else {

        for (var letter = 0; letter < href.length; letter++) {
            href[letter].classList.remove('active');
        }

        li.innerHTML = input.value;
        activeData.push(input.value);
        href[0].className = 'active';
        location.hash = '#active';
        ul.appendChild(li);
        input.value = '';
        renderLi(li);
    }
}

// рендерим Li по статусу
function renderLi(renderingList) {
    if (!renderingList) return false;

    var ul = document.getElementsByTagName('ul')[0];

    if (location.hash === '#active') {
        renderingList.onclick = function (item) {
            ul.innerHTML = '';
            statusTarget('#done');
            doneData.push(item.target.innerText);
            item.target.style.display = 'none';
        };
    }
    if (location.hash === '#done') {
        renderingList.onclick = function (item) {
            ul.innerHTML = '';
            statusTarget('#remove');
            removeData.push(item.target.innerText);
            item.target.style.display = 'none';
        };
    }
    if (location.hash === '#remove') {
        renderingList.onclick = function (item) {
            ul.innerHTML = '';
            statusTarget('#active');
            activeData.push(item.target.innerText);
            item.target.style.display = 'none';
        };
    }
}

// отслеживаем hash
function statusTarget(hash) {
    console.log('hash', hash);
    switch (hash) {
        case '#active':
            clearActiveButton();
            href[0].className = 'active';
            location.hash = '#active';
            break;
        case '#done':
            clearActiveButton();
            href[1].className = 'active';
            location.hash = '#done';
            break;
        case '#remove':
            clearActiveButton();
            href[2].className = 'active';
            location.hash = '#remove';
            break;
    }

    renderLi();
}

function clearActiveButton() {
    for (var letter = 0; letter < href.length; letter++) {
        href[letter].classList.remove('active');
    }
}
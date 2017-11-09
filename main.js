/*

    осталось раскидать по массивам ТЗ

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

    if (location.hash === '#active') {
        renderingList.onclick = function (item) {
            doneData.push(item.target.innerText);
            item.target.style.display = 'none';
        };
    }
    if (location.hash === '#done') {
        renderingList.onclick = function (item) {
            removeData.push(item.target.innerText);
            item.target.style.display = 'none';
        };
    }
    if (location.hash === '#remove') {
        renderingList.onclick = function (item) {
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
            clearListsInPages();
            href[0].className = 'active';
            location.hash = '#active';
            break;
        case '#done':
            clearActiveButton();
            clearListsInPages();
            href[1].className = 'active';
            location.hash = '#done';
            break;
        case '#remove':
            clearActiveButton();
            clearListsInPages();
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

function clearListsInPages() {
    var ul = document.getElementsByTagName('ul')[0],
        deleteWork = ul.getElementsByTagName('li');

    console.log('deleteWork', deleteWork);
    console.log('ul', ul);

    for (var letter = 0; letter < deleteWork.length; letter++) {
        deleteWork[letter].style.display = 'none';
    }
}
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
        location.hash = 'active';
        ul.appendChild(li);
        input.value = '';
        statusTarget(li);
    }
}

// рендерим данные по статусу
function statusTarget(targetLi) {
    switch (targetLi) {
        case 'active':
            console.log('active');
            clearActiveButton();
            href[0].className = 'active';
            targetLi.onclick = function (item) {
                doneData.push(item.target.innerText);
                item.target.style.display = 'none';
            };
            break;
        case 'done':
            console.log('done');
            clearActiveButton();
            href[1].className = 'active';
            targetLi.onclick = function (item) {
                removeData.push(item.target.innerText);
                item.target.style.display = 'none';
            };
            break;
        case 'remove':
            console.log('remove');
            clearActiveButton();
            href[2].className = 'active';
            targetLi.onclick = function (item) {
                activeData.push(item.target.innerText);
                item.target.style.display = 'none';
            };
            break;
    }
}

function clearActiveButton() {
    for (var letter = 0; letter < href.length; letter++) {
        href[letter].classList.remove('active');
    }
}
document.querySelector('.dropdown').addEventListener('click', e => {
  e.currentTarget.classList.toggle('dropdown-open');
});

function compareLikes(a, b) { return 1; };
function compareTitles(a, b) { return 1; };
function compareDates(a, b) { return 1; };

function sort() {
  const item = document.querySelector('.dropdown-item.active');

  let sortingFunction;

  if (item.textContent === 'Item 1') {
    sortingFunction = compareLikes;
  } else if(item.textContent === 'Item 2') {
    sortingFunction = compareTitles;
  } else {
    sortingFunction = compareDates;
  }

  medias.sort(sortingFunction).forEach(() => {});
}

document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.dropdown-item.active').classList.remove('active');
    item.classList.add('active');
    document.querySelector('.dropdown > span').textContent = item.textContent;
    sort();
  });
});

sort();

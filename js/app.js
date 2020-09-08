fetch('https://api.allorigins.win/raw?url=https://forex.cbm.gov.mm/api/latest')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.rates.MMK = '1';
        let input = document.querySelector('#input')
        let from = document.querySelector('.from');
        let to = document.querySelector('.to');
        let result = document.querySelector('.result');
        let btn = document.querySelector('.cal-btn');
        let form = document.querySelector('.form');
        let hisList = document.querySelector('.his-list');

        function toNum(x) {
            return Number(x.replace(',', ''));
        }

        function createOption(y, v, z) {
            let option = document.createElement('option');
            let text = document.createTextNode(y);
            option.setAttribute('value', toNum(z))
            option.appendChild(text);
            v.appendChild(option);
        }

        for (x in data.rates) {
            createOption(x, from, data.rates[x]);
            createOption(x, to, data.rates[x])
        }

        function createTr(x) {
            let norow = document.querySelector('.norow');
            if (norow) {
                norow.remove();
            }
            let tr = document.createElement('tr');
            x.map((val) => {
                let td = document.createElement('td');
                let text = document.createTextNode(val);
                // let icon = document.createElement('i');
                // icon.setAttribute('class', 'feather-trash');
                td.appendChild(text);
                tr.appendChild(td);
            })
            hisList.appendChild(tr);
        }

        function save() {
            localStorage.setItem('rec', hisList.innerHTML);
        }
        // from.addEventListener('change', function () {
        //     console.log(from.options[from.selectedIndex].text)
        // })

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let inputVal = input.value;
            let fromVal = from.value;
            let toVal = to.value;
            console.log(inputVal, fromVal, toVal)

            let output = ((inputVal * fromVal) / toVal).toFixed(2);
            console.log(output);
            let fromT = inputVal + from.options[from.selectedIndex].text;
            let toT = to.options[to.selectedIndex].text;
            let date = new Date().toLocaleString();
            let hisArr = [date, fromT, toT, output];
            createTr(hisArr);
            save();
            result.innerHTML = output + ' ' + to.options[to.selectedIndex].innerHTML;
            input.value = '';
            input.focus();
            from.value = "";
            to.value = "1";

        });
        (function () {
            if (localStorage.getItem('rec')) {
                hisList.innerHTML = localStorage.getItem('rec');
            } else {
                hisList.innerHTML = '<tr class="norow"><td colspan="4" style="text-align:center; font-size:1.5em">No Record Here!</td><tr>'
            }
        })();

        let darkBtn = document.querySelector('.dark-btn');
        darkBtn.addEventListener('click', () => {
            document.querySelector('body').classList.toggle('dark');
        })

    })
    .catch(err => {
        console.log(err);
        alert('error')
    });
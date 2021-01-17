`use script`
console.clear();

{
    let year=2020;
    let month=4;

    function getCalenderHead () {
        const dates=[];
        const d=new Date(year, month, 0).getDate();
        const n=new Date(year, month, 1).getDay();

        for (let i=0; i<n; i++) {
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });

        }
        return dates;
    }

    function getCalenderBody () {
        const dates=[];
        const lastDate =new Date(year, month + 1, 0).getDate();

        for (let i=1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }
        return dates;
    }

    function getCalenderTail () {
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDay();

        for (let i=1; i<7 - lastDay; i++){
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }

    function createCalender () {
        const tbody =document.querySelector(`tbody`);
        while(tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        const title=`${year}/${String(month + 1).padStart(2, `0`)}`;
        document.getElementById(`title`).textContent=title;

        const dates=[
            ...getCalenderHead(),
            ...getCalenderBody(),
            ...getCalenderTail(),

        ];
        const weeks=[];
        const weekCount =dates.length/7;

        for(let i=0; i<weekCount; i++){
            weeks.push(dates.splice(0, 7));
        }
        weeks.forEach(week => {
            const tr=document.createElement('tr');
            week.forEach(date => {
                const td=document.createElement(`td`);
                td.textContent=date.date;
                

                if(date.isToday) {
                    td.classList.add(`today`);
                }
                if(date.isDisabled) {
                    td.classList.add(`disabled`);
                }
                tr.appendChild(td);
            });
            document.querySelector(`tbody`).appendChild(tr);
        });

        document.getElementById(`prev`).addEventListener(`click`, () => {
            month--;
            if(month < 0) {
                year--;
                month=11;
            }
            createCalender();
        });
        document.getElementById(`next`).addEventListener(`click`, () => {
            month++;
            if(month > 11) {
                year++;
                month=0;
            }
            createCalender();
        });


       
    }
    createCalender();
}

export default class Calendar {

    markup = `
    <div class="display-area">
        <div class="day">Saturday</div>
        <div class="date">06</div>
        <div class="month">Jul</div>
        <div class="year">2020</div>
    </div>
    <div class="input-area">
        <div class="month-navigator">
            <div class="month-previous"></div>
            <div class="month">Julio 2020</div>
            <div class="month-next"></div>
        </div>
        <table class="tbl-calendar">
            <thead class="thead">
                <tr class="row-days">
                    <th class="th-day">Dom</th>
                    <th class="th-day">Lun</th>
                    <th class="th-day">Mar</th>
                    <th class="th-day">Mie</th>
                    <th class="th-day">Jue</th>
                    <th class="th-day">Vie</th>
                    <th class="th-day">Sab</th>
                </tr>
            </thead>
            <tbody class="tbody">
                
            </tbody>
        </table>
        <div class="month-footer">
            <div class="btn-save">Guardar</div>
            <div class="btn-cancel">Cancelar</div>
        </div>
    </div>
    `;

    constructor(options) {
        this.id = options.id;
        this.element = document.getElementById(this.id); // get input field

        this.element.addEventListener("focus", (e) => {
            if (document.getElementsByClassName("ab-calendar")[0]) {
                document.getElementsByClassName("ab-calendar")[0].remove();
            }
            this.init();
        });

    }

    init() {

        if (this.element.value == "") {
            this.savedDate = new Date();
        } else {
            var strDt = this.element.value;
            var strDtArr = strDt.split("/");
            var strDt = strDtArr[2] + "-" + strDtArr[1] + "-" + strDtArr[0];
            this.savedDate = new Date(strDt);
        }

        this.selectedDate = this.savedDate;
        this.currentMonth = this.savedDate.getMonth();
        this.currentYear = this.savedDate.getFullYear();

        this.months = [
            { fullname: "Enero", shortname: "Ene" },
            { fullname: "Febrero", shortname: "Feb" },
            { fullname: "Marzo", shortname: "Mar" },
            { fullname: "Abril", shortname: "Abr" },
            { fullname: "Mayo", shortname: "May" },
            { fullname: "Junio", shortname: "Jun" },
            { fullname: "Julio", shortname: "Jul" },
            { fullname: "Agosto", shortname: "Aug" },
            { fullname: "Septiembre", shortname: "Sep" },
            { fullname: "Octubre", shortname: "Oct" },
            { fullname: "Noviembre", shortname: "Nov" },
            { fullname: "Diciembre", shortname: "Dic" }
        ];

        this.days = [
            { fullname: "Domingo", shortname: "Dom" },
            { fullname: "Lunes", shortname: "Lun" },
            { fullname: "Martes", shortname: "Mar" },
            { fullname: "Miercoles", shortname: "Mie" },
            { fullname: "Jueves", shortname: "Jue" },
            { fullname: "Viernes", shortname: "Vie" },
            { fullname: "Sabado", shortname: "Sab" }
        ];

        this.createDOMs();
        this.addEvents();
        this.updateCalendar(this.currentMonth, this.currentYear);



    }

    createDOMs() {

        // Creating Calendar container
        this.cContainer = document.createElement("div");
        this.cContainer.classList.add("ab-calendar");
        document.body.appendChild(this.cContainer);
        var rect = this.element.getBoundingClientRect();
        this.cContainer.style.left = rect.x + "px";
        this.cContainer.style.top = rect.y + rect.height + "px";

        this.cContainer.innerHTML = this.markup;


        // Get display are elements

        this.cDisplayArea = this.cContainer.getElementsByClassName("display-area")[0];

        this.cDate = this.cDisplayArea.getElementsByClassName("date")[0];
        this.cDay = this.cDisplayArea.getElementsByClassName("day")[0];
        this.cMonth = this.cDisplayArea.getElementsByClassName("month")[0];
        this.cYear = this.cDisplayArea.getElementsByClassName("year")[0];

        // Get input area elements
        this.cInputArea = this.cContainer.getElementsByClassName("input-area")[0];

        // month navigator
        this.cMonthNavigator = this.cInputArea.getElementsByClassName("month-navigator")[0];

        this.cMonthPrevious = this.cMonthNavigator.getElementsByClassName("month-previous")[0];
        this.cMonthNav = this.cMonthNavigator.getElementsByClassName("month")[0];
        this.cMonthNext = this.cMonthNavigator.getElementsByClassName("month-next")[0];


        // Calendar Body
        this.tBody = this.cInputArea.getElementsByClassName("tbody")[0];

        // inpute area save and cancel button        

        this.btnSave = this.cInputArea.getElementsByClassName("btn-save")[0];
        this.btnCancel = this.cInputArea.getElementsByClassName("btn-cancel")[0];
    }

    addEvents() {
        this.cMonthPrevious.addEventListener("click", () => this.previous());
        this.cMonthNext.addEventListener("click", () => this.next());

        this.btnSave.addEventListener("click", () => {
            this.element.value = this.formateTwoDigitNumber(this.cDate.innerHTML) + "/" + this.formateTwoDigitNumber((this.selectedDate.getMonth() + 1)) + "/" + this.selectedDate.getFullYear();
            document.body.removeChild(this.cContainer);
        });

        this.btnCancel.addEventListener("click", () => {
            document.body.removeChild(this.cContainer);
        });
    }

    formateTwoDigitNumber(num) {
        return ("0" + num).slice(-2);
    }

    previous() {
        this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
        this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
        this.updateCalendar(this.currentMonth, this.currentYear);
    }


    next() {
        this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
        this.currentMonth = (this.currentMonth === 11) ? 0 : this.currentMonth + 1;
        this.updateCalendar(this.currentMonth, this.currentYear);
    }

    updateCalendar(month, year) {

        let daysInMonth = new Date(year, month, 0).getDate();

        // Clear table body
        this.tBody.innerHTML = "";

        // Update Month above calendar
        this.cMonthNav.innerHTML = this.months[month].fullname + " " + year;


        // Generate calendar with dates

        let date = new Date(year, month, 1);


        while (date.getDate() < daysInMonth && month == date.getMonth()) {

            let row = document.createElement("tr");

            // Generate dates
            for (let j = 0; j < 7; j++) {

                if (j == date.getDay() && month == date.getMonth()) {
                    let cell = document.createElement("td");
                    cell.classList.add("date-cell");
                    let cellText = document.createTextNode(date.getDate());

                    if (date.getDate() === this.selectedDate.getDate()
                        && year === this.selectedDate.getFullYear()
                        && month === this.selectedDate.getMonth()) {
                        cell.classList.add("dt-active");
                    }

                    date.setDate(date.getDate() + 1);
                    cell.appendChild(cellText);
                    row.appendChild(cell);



                    cell.addEventListener("click", (e) => {
                        this.selectedDate = new Date(year, month, e.target.innerHTML);
                        if (document.getElementsByClassName("dt-active")[0]) {
                            document.getElementsByClassName("dt-active")[0].classList.remove("dt-active");
                        }
                        e.target.classList.add("dt-active");
                        this.updateDisplay();
                    });

                } else {
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

            }

            this.tBody.appendChild(row);

        }

    }

    updateDisplay() {
        this.cDay.innerHTML = this.days[this.selectedDate.getDay()].fullname;
        this.cDate.innerHTML = this.selectedDate.getDate();
        this.cMonth.innerHTML = this.months[this.selectedDate.getMonth()].shortname;
        this.cYear.innerHTML = this.selectedDate.getFullYear();
    }



}
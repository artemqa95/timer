let timeElement = document.getElementsByClassName("thetime")[0];
let textBlock = document.getElementsByClassName("timeBlock")[0];
let arrivalDate = new Date(2020, 10, 22, 12, 0, 0)
let currentTime = new Date();
textBlock.onselectstart = () => false
function useWriteForm(days, hours, minutes, seconds) {
    let daysForm = {
        0: 'дней',
        1: 'день',
        2: 'дня',
        length: 3
    }
    let hoursForm = {
        0: 'часов',
        1: 'час',
        2: 'часа',
        length: 3
    }
    let minutesForm = {
        0: 'минут',
        1: 'минуту',
        2: 'минуты',
        length: 3
    }
    let secondsForm = {
        0: 'секунд',
        1: 'секунду',
        2: 'секунды',
        length: 3
    }
    let daysText = checkNumber(days, daysForm);
    let hoursText = checkNumber(hours, hoursForm);
    let minutesText = checkNumber(minutes, minutesForm);
    let secondsText = checkNumber(seconds, secondsForm);

    function checkNumber(number, form) {
        let lengthOfNumber = number.toString().length;
        if (number.toString()[lengthOfNumber - 1] == 1 && number.toString().slice(lengthOfNumber - 2) != 11) {
            return form[1];
        } else if ((number.toString()[lengthOfNumber - 1] == 2 || (number.toString()[lengthOfNumber - 1] == 3) || (number.toString()[lengthOfNumber - 1] == 4))
            && (number.toString().slice(lengthOfNumber - 2) != 12) && (number.toString().slice(lengthOfNumber - 2) != 13) && (number.toString().slice(lengthOfNumber - 2) != 14)) {
            return form[2];
        } else {
            return form[0];
        }
    }

    return [daysText, hoursText, minutesText, secondsText]
}

function refreshTheTime() {
    let currentTime = new Date();
    let ArrivalTimeInMs = arrivalDate - currentTime;
    if (ArrivalTimeInMs > 0) {
        let howManyDays = Math.floor((ArrivalTimeInMs) / (1000 * 60 * 60 * 24));
        let howManyHours = Math.floor((ArrivalTimeInMs) / (1000 * 60 * 60) - howManyDays * 24);
        let howManyMinutes = Math.floor((ArrivalTimeInMs) / (1000 * 60) - howManyDays * 24 * 60 - howManyHours * 60);
        let howManySeconds = Math.floor((ArrivalTimeInMs) / (1000) - howManyDays * 24 * 60 * 60 - howManyHours * 60 * 60 - howManyMinutes * 60);
        let textArray = useWriteForm(howManyDays, howManyHours, howManyMinutes, howManySeconds);
        let timeToArrive = `${howManyDays + " " + textArray[0]}, ${howManyHours + " " + textArray[1]}, ${howManyMinutes + " " + textArray[2]}, ${howManySeconds + " " + textArray[3]}`
        timeElement.innerHTML = timeToArrive;
    } else {
        let timeToArrive = 'Режим клетки успешно завершен'
        timeElement.innerHTML = timeToArrive;
    }

}

setInterval(refreshTheTime, 1000)
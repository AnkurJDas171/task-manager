export const formateDate = (currentDate: string) => {
    let [date, month, year] = currentDate.split('/');

    if (parseInt(date) < 10) {
        date = '0' + date;
    }
    if (parseInt(month) < 10) {
        month = '0' + month;
    }

    return `${date}:${month}:${year}`;
}

export const formateTime = (currentTime: string) => {
    let [hour, minute, second] = currentTime.replace(/[A-Z]/g, "").split(':');

    if(currentTime.substring(currentTime.length-2, currentTime.length) === "PM") {
        hour = `${parseInt(hour) + 12}`;
    }

    return `${hour}:${minute}:${second}`
}

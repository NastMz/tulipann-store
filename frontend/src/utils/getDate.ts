function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export function getDate(date: string) {
    let days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    let months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'diciembre']
    let d = new Date(date);
    let dayName = days[d.getDay()];
    let fullDate = [padTo2Digits(d.getDate()), months[d.getMonth()], d.getFullYear()].join(' de ');
    return [dayName, fullDate].join(", ");
}
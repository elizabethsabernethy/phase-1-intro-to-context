// Your code here
function createEmployeeRecord(employeeRecord){
    const employee = {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(employeeRecords){
    const employees = [];
    for(let i=0; i<employeeRecords.length; i++){
        employees[i] = createEmployeeRecord(employeeRecords[i])
    }
    return employees;
}

function createTimeInEvent(employee, dateStamp){
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    }
    employee.timeInEvents.push(timeInEvent);
    return employee;
}

function createTimeOutEvent(employee, dateStamp){
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    }
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}
function hoursWorkedOnDate(employee, date){
    let timeInObject;
    let timeOutObject;
    employee.timeInEvents.forEach(element => {
        if(element.date === date){
            timeInObject = element.hour;
        }
    });
    employee.timeOutEvents.forEach(element => {
        if(element.date === date){
            timeOutObject = element.hour;
        }
    })
    const totalHoursWorked = (timeOutObject - timeInObject)/100;
    return totalHoursWorked;
}

function wagesEarnedOnDate(employee, date){
    //if(employee.timeInEvents[0].date && employee.timeOutEvents[0].date === date){
        const hoursWorked = hoursWorkedOnDate(employee, date);
        const hourlyWage = employee.payPerHour;
        return hourlyWage * hoursWorked;
    //}
}

function allWagesFor(employee){
return (employee.timeInEvents.reduce((accumulator , currentValue) => accumulator + wagesEarnedOnDate(employee,currentValue.date), 0))
}

function calculatePayroll(employees){
return employees.reduce((accumulator, currentValue) => accumulator + allWagesFor(currentValue), 0)
}
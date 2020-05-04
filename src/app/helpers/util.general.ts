
export function DateLabelGenerator(date: Date) {
    const months = ['JAN', 'FEB', 'MAR','APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let label = '';
    const month = date.getMonth();
    if(month !== null && month !== undefined ) {
      label = months[date.getMonth()] + ' ' + date.getDate();
    }
    return label;
  }

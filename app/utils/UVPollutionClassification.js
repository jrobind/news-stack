export default (type, value) => {
    if (type === 'UV' && value < 2.9 || type === 'Pollution' && value <= 50) {
        return {
            color: '#3fdb3f',
            text: type === 'UV' ? 'Low' : 'Excellent' 
        }
    } else if (type === 'UV' && value > 2.9 && value <= 5.9 || type === 'Pollution' && value > 50 && value <= 100) {
        return {
            color: '#ffbf00',
            text: type === 'UV' ? 'Moderate' : 'Good' 
        }
    } else if (type === 'UV' && value > 5.9 && value <= 7.9 || type === 'Pollution' && value > 100 && value <= 150) {
        return {
            color: '#e9692c',
            text:  type === 'UV' ? 'High' : 'Lightly polluted' 
        }
    } else if (type === 'UV' && value > 7.9 && value <= 10.9 || type === 'Pollution' && value > 150 && value <= 200) {
        return {
            color: '#E50000',
            text:  type === 'UV' ? 'Very high' : 'Moderately polluted' 
        }
    } else if (type === 'UV' && value > 10.9 || type === 'Pollution' && value > 200) {
        return {
            color: '#990000',
            text:  type === 'UV' ? 'Extreme' : 'Heavily polluted' 
        }
    }
}